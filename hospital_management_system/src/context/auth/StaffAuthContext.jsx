import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const StaffAuthContext = createContext();

export const useStaffAuthContext = () => {
  return useContext(StaffAuthContext);
};

export const StaffAuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    accessToken: null,
    user: {}
  });


  const baseUrl = "http://localhost:8000/api/v1";

  // Check auth status on mount and after state changes
  useEffect(() => {
    checkAuthStatus();
    console.log(authState.user)
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/staff/auth-status`, {
        withCredentials: true,
      });

      if (response.data?.data) {
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
      console.error("Error checking auth status:", error);
      setAuthState({
        isLoggedIn: false,
        accessToken: null,
      });
    } finally {
      setLoading(false);
    }
  };

  // register staff
  const registerStaff = async (
    staffName,
    email,
    password,
    phoneNo,
    streetAddress,
    country,
    city,
    avatar,
    role
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/staff/register`, {
        staffName,
        email,
        password,
        phoneNo,
        streetAddress,
        country,
        city,
        avatar,
        role,
      });

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

  // login staff
  const loginStaff = async (email, password) => {
    try {
      const response = await axios.post(
        `${baseUrl}/staff/login`,
        { email, password },
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );

      console.log(response.data.data);

      if (response.status === 200 && response.data?.data) {
        setAuthState({
          isLoggedIn: true,
          accessToken: response.data.data.accessToken,
          user: response.data.data.data
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

  //logout staff
  const logoutStaff = async () => {
    try {
      await axios.patch(
        `${baseUrl}/staff/logout`,
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

  const values = {
    baseUrl,
    loading,
    isLoggedIn: authState.isLoggedIn,
    accessToken: authState.accessToken,
    registerStaff,
    loginStaff,
    logoutStaff,
  };

  return (
    <StaffAuthContext.Provider value={values}>
      {children}
    </StaffAuthContext.Provider>
  );
};
