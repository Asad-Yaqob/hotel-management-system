import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { baseURl } from "../../utils/constants";

const StaffAuthContext = createContext(null);

export const StaffAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : {};
    } catch (error) {
      console.error("Error parsing user data:", error);
      return {};
    }
  });
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [allStaff, setAllStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURl}/staff/auth-status`, {
        withCredentials: true,
      });

      if (response.data.authenticated) {
        setIsAuthenticated(true);
        setAccessToken(response.data.accessToken);
      } else {
        setIsAuthenticated(false);
        setAccessToken(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setAccessToken(false);
      console.error("Auth status check failed:", error);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseURl}/staff/login`,
        { email, password },
        { withCredentials: true }
      );

      const { data: userData } = response.data.data;

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        setUser({});
        setIsAuthenticated(false);
        localStorage.removeItem("user");

        return { success: false };
      }
    } catch (error) {
      setIsLoading(false);
      setUser({});
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      console.error("Login failed:", error);
      return { success: false, message: error.message || "Unable to login." };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURl}/staff/register`, formData);
      return response.status < 400
        ? { success: true }
        : { success: false, error: "Failed to register" };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.message || "Unable to register staff.",
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(
    async (accessToken) => {
      setUser({});
      setAccessToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      try {
        const response = await axios.patch(
          `${baseURl}/staff/logout`,
          {},
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return response.status === 200
          ? { success: true }
          : { success: false, message: "Logout failed" };
      } catch (error) {
        console.error("Logout failed:", error);
        return { success: false, message: "Logout failed" };
      }
    },
    [accessToken]
  );

  const updateAvatar = useCallback(
    async (image) => {
      if (!image) return;
      const formData = new FormData();
      formData.append("avatar", image);
      setIsLoading(true);
      try {
        const response = await axios.patch(
          `${baseURl}/staff/change-avatar`,
          formData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.status < 400
          ? { success: true }
          : { success: false, error: "Failed to update avatar" };
      } catch (error) {
        console.error("Avatar update failed:", error);
        return {
          success: false,
          error: error.message || "Unable to update avatar.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const updateUserProfile = useCallback(
    async (staffName, email, phoneNo, streetAddress, country, city) => {
      if (
        [staffName, email, phoneNo, streetAddress, country, city].some(
          (field) => !field?.trim()
        )
      )
        return;
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${baseURl}/staff/change-details`,
          { staffName, email, phoneNo, streetAddress, country, city },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.status < 400
          ? { success: true }
          : { success: false, error: "Failed to update profile" };
      } catch (error) {
        console.error("Profile update failed:", error);
        return {
          success: false,
          error: error.message || "Unable to update profile.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const updatePassword = useCallback(
    async (oldPassword, newPassword) => {
      if (!(oldPassword && newPassword)) return;
      setIsLoading(true);
      try {
        const response = await axios.patch(
          `${baseURl}/staff/change-password`,
          { oldPassword, newPassword },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.status < 400
          ? { success: true }
          : { success: false, error: "Failed to update password" };
      } catch (error) {
        console.error("Password update failed:", error);
        return {
          success: false,
          error: error.message || "Unable to update password.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const getStaff = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURl}/staff/all-staffs`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAllStaff(response.data.data);
      return response.status === 200
        ? { success: true }
        : { success: false, message: "Failed to fetch data" };
    } catch (error) {
      console.error("Fetching staff failed:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch data",
      };
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  const fetchStaffDetails = useCallback(
    async (staffId) => {
      if (!accessToken || !staffId) return;
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseURl}/staff/get-staff/${staffId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setCurrentStaff(response.data.data);
        return response.status === 200
          ? { success: true }
          : { success: false, message: "Failed to fetch data" };
      } catch (error) {
        console.error("Fetching staff details failed:", error);
        return {
          success: false,
          message: error.message || "Failed to fetch data",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const toggleStatus = useCallback(
    async (staffId, action) => {
      if (!(staffId && action))
        return { success: false, message: "staffId and action are required." };
      setIsLoading(true);
      try {
        const response = await axios.patch(
          `${baseURl}/staff/toggleStatus`,
          { staffId, action },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return response.status < 400
          ? { success: true }
          : { success: false, message: "Failed to toggle status" };
      } catch (error) {
        console.error("Toggling status failed:", error);
        return { success: false, message: "Unable to toggle status." };
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      allStaff,
      currentStaff,
      setIsLoading,
      checkAuthStatus,
      login,
      logout,
      updateAvatar,
      updateUserProfile,
      updatePassword,
      register,
      getStaff,
      setAllStaff,
      toggleStatus,
      fetchStaffDetails,
      setCurrentStaff,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      allStaff,
      currentStaff,
      checkAuthStatus,
      login,
      logout,
      updateAvatar,
      updateUserProfile,
      updatePassword,
      register,
      getStaff,
      toggleStatus,
      fetchStaffDetails,
    ]
  );

  return (
    <StaffAuthContext.Provider value={value}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
