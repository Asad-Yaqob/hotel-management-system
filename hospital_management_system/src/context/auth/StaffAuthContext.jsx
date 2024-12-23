import React, { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import { baseURl } from "../../utils/constants";

const StaffAuthContext = createContext(null);

export const StaffAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [allStaff, setAllStaff] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      checkAuthStatus();
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

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

  const getStaff = async () => {
    if (!accessToken) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`${baseURl}/staff/all-staffs`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        //  console.log(response.data.data);
        setIsLoading(false);
        setAllStaff(response.data.data);

        return { success: true };
      }

      setIsLoading(false);
      return {
        success: true,
        message: response.data || "Failed to fetch data",
      };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: error.message || "Failed to fetch data",
      };
    }
  };

  const fetchStaffDetails = async (staffId) => {

    if (!accessToken || !staffId) return;

    setIsLoading(true);

    try {
      // Fetch specific staff details using staffId
      const response = await axios.get(`${baseURl}/staff/get-staff/${staffId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log(response.data);

      if (response.status === 200) {
        setIsLoading(false);
        setCurrentStaff(response.data.data); 

        return { success: true };
      }

      setIsLoading(false);

      return {
        success: false,
        message: response.data || "Failed to fetch data",
      };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: error.message || "Failed to fetch data",
      };
    }
  };


  const toggleStatus = async (staffId, action) => {
    if (!(staffId && action)) {
      return { success: false, message: "staffId and action are required." };
    }

    try {
      setIsLoading(true);

      const response = await axios.patch(
        `${baseURl}/staff/toggleStatus`,
        { staffId, action },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log(response.data);

      if (response.status < 400) {
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: "Unable to toggle status." };
    }
  };

  const value = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    allStaff,
    currentStaff,
    setIsLoading,
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
