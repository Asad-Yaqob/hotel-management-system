import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GuestAuthContext = createContext(null);

export const GuestAuthProvider = ({ children }) => {
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
      const response = await axios.get(`${baseURl}/guest/auth-status`, {
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURl}/guest/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response?.data?.data) {
        setUser(response.data.data);
        setIsAuthenticated(true);
        localStorage.setItem("access_token", response.data.data.accessToken);
        setIsLoading(false);

        return { success: true };
      }

      setIsLoading(false);
      return { success: false };
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: error.message || "Unable to login." };
    }
  };

  const register = async (firstName, lastName, email, password) => {
    if (
      [firstName, lastName, email, password].includes(
        (field) => field.trim() === ""
      )
    ) {
      return { success: false, error: "All fields are mandatory" };
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${baseURl}/guest/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status < 400) {
        setIsLoading(false);
        return { success: true };
      }

      return { success: false, error: "Failed to register" };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        error: error.message || "Unable to register guest.",
      };
    }
  };

  const logout = async () => {
    try {
      const response = await axios.patch(
        `${baseURl}/guest/logout`,
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

  const value = {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <GuestAuthContext.Provider value={value}>
      {children}
    </GuestAuthContext.Provider>
  );
};

export const useGuestAuth = () => {
  const context = useContext(GuestAuthContext);
  if (!context) {
    throw new Error("useGuestAuth must be used within an AuthProvider");
  }
  return context;
};
