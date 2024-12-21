import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StaffAuthContext = createContext(null);

export const StaffAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const baseURl = "http://localhost:8000/api/v1";

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      checkAuthStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${baseURl}/staff/auth-status`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      if (response?.data?.accessToken) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${baseURl}/staff/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response?.data?.data) {
        setUser(response.data.data);
        setIsAuthenticated(true);
        localStorage.setItem("access_token", response.data.data.accessToken);
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const register = async (formData) => {
    
    // Check if any field is empty, null, or undefined
    // if (
    //  formData
    // ) {
    //   return { success: false, error: "All fields are mandatory." };
    // }

    try {
      setIsLoading(true);

      const response = await axios.post(`${baseURl}/staff/register`, formData);

      if (response.status < 400) {
        setIsLoading(false);
        return { success: true };
      }

      return { success: false, error: "Failed to register" };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.message || "Unable to register staff.",
      };
    }
  };


  const logout = async () => {
    try {
      const response = await axios.patch(
        `${baseURl}/staff/logout`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("access_token");
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateAvatar = async (image) => {
    if (!image) return;

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      setIsLoading(true);

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

      if (response.status < 400) {
        console.log("Avatar changed successfully:", response.data);
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      return {
        success: false,
        error: error.message || "Unable to update avatar.",
      };
    }
  };

  const updateUserProfile = async (
    staffName,
    email,
    phoneNo,
    streetAddress,
    country,
    city
  ) => {
    if (
      [staffName, email, phoneNo, streetAddress, country, city].includes(
        (field) => field?.trim() === ""
      )
    )
      return;

    try {
      setIsLoading(true);

      const response = await axios.put(
        `${baseURl}/staff/change-details`,
        {
          staffName,
          email,
          phoneNo,
          streetAddress,
          country,
          city,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status < 400) {
        setIsLoading(false);

        return { success: true };
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.message || "Unable to update use information",
      };
    }
  };

  const updatePassword = async (oldPassword, newPassword) => {
    if (!(oldPassword && newPassword)) return;

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${baseURl}/staff/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status < 400) {
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.message || "Unable to update use information",
      };
    }
  };

  const value = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateAvatar,
    updateUserProfile,
    updatePassword,
    register,
  };

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
