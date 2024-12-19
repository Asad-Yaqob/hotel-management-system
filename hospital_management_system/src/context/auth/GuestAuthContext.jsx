import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    accessToken: null,
  });

  const baseUrl = "http://localhost:8000/api/v1";

  // Check auth status on mount and after state changes
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
  
      const response = await axios.get(`${baseUrl}/guest/auth-status`, {
        withCredentials: true,
      });
  
      if (response.data?.data?.accessToken) {
        setAuthState({
          isLoggedIn: true,
          accessToken: response.data.data.accessToken,
        });
      } else {
        setAuthState({
          isLoggedIn: false,
          accessToken: null,
        });
      }
    } catch (error) {
      setAuthState({
        isLoggedIn: false,
        accessToken: null,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/guest/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.data?.data) {
        await checkAuthStatus(); // Refresh auth state after successful signup
        return { success: true };
      }
    } catch (error) {
      console.error("Signup failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const login = async (email, password) => {
   try {
     const response = await axios.post(
       `${baseUrl}/guest/login`,
       { email, password },
       { withCredentials: true, validateStatus: (status) => status < 500 } 
     );

     if (response.status === 200 && response.data?.data) {
       setAuthState({
         isLoggedIn: true,
         accessToken: response.data.data.accessToken,
       });
       return { success: true };
     }

     return { success: false, error: "Unexpected server response" };
   } catch (error) {
     return {
       success: false,
       error: error.response?.data?.message || "Login failed",
     };
   }

  };

  const logout = async () => {
    try {
      await axios.patch(
        `${baseUrl}/guest/logout`,
        {},
        {
          withCredentials: true,
          headers: authState.accessToken
            ? {
                Authorization: `Bearer ${authState.accessToken}`,
              }
            : {},
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear local auth state, even if the server request fails
      setAuthState({
        isLoggedIn: false,
        accessToken: null,
      });
    }
  };

 
  const value = {
    baseUrl,
    loading,
    isLoggedIn: authState.isLoggedIn,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
