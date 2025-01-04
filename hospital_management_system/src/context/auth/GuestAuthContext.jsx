import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { baseURl } from "../../utils/constants";
import axios from "axios";

const GuestAuthContext = createContext(null);

export const GuestAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState(() => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken || null; // Default to null if no token is stored
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allGuests, setAllGuests] = useState([]);
  const [currentGuest, setCurrentGuest] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURl}/guest/auth-status`, {
        withCredentials: true,
      });

      if (response.data.authenticated) {
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      localStorage.removeItem("user");
      console.error("Auth status check failed:", error);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseURl}/guest/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      // console.log(response.data.data);

      if (response.data && response.data.data) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("accessToken", response.data.data.accessToken);
        setIsLoading(false);

        return { success: true };
      }

      setIsLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      return { success: false };
    } catch (error) {
      setIsLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      return { success: false, message: error.message || "Unable to login." };
    }
  }, []);

  const register = useCallback(async (firstName, lastName, email, password) => {
    if (
      [firstName, lastName, email, password].some(
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
  }, []);

  const logout = useCallback(async () => {
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
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      console.error("Logout failed:", error);
    }
  }, [accessToken]);

  const registerGuestByStaff = useCallback(
    async (
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      country,
      city,
      cardNo = null,
      cvv = null,
      cashPayment = false
    ) => {
      if (
        [
          firstName,
          lastName,
          email,
          password,
          phone,
          country,
          city,
          address,
        ].some(
          (field) => !field || (typeof field === "string" && !field.trim())
        )
      ) {
        return {
          success: false,
          message: "All fields except payment details are required.",
        };
      }

      if (!cashPayment && (!cardNo || !cvv)) {
        return {
          success: false,
          message: "Card number and CVV are required for non-cash payments.",
        };
      }

      try {
        setIsLoading(true);

        const response = await axios.post(
          `${baseURl}/guest/register-by-staff`,
          {
            firstName,
            lastName,
            email,
            password,
            phone,
            country,
            city,
            address,
            cardNo: cashPayment ? null : cardNo,
            cvv: cashPayment ? null : cvv,
            cashPayment,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status < 400) {
          setIsLoading(false);
          return { success: true };
        }

        return { success: false, message: "Failed to register guest." };
      } catch (error) {
        setIsLoading(false);
        return {
          success: false,
          message: error.message || "Unable to register guest.",
        };
      }
    },
    [accessToken]
  );

  const fetchGuests = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`${baseURl}/guest/all-guests`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setIsLoading(false);
        setAllGuests(response.data.data);

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
  }, [accessToken]);

  const fetchGuestDetails = useCallback(
    async (guestId) => {
      if (!accessToken || !guestId) return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `${baseURl}/guest/get-guest/${guestId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          setCurrentGuest(response.data.data);

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
    },
    [accessToken]
  );

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      allGuests,
      currentGuest,
      login,
      logout,
      register,
      registerGuestByStaff,
      fetchGuests,
      fetchGuestDetails,
      setCurrentGuest,
      checkAuthStatus,
    }),
    [
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      allGuests,
      currentGuest,
      login,
      logout,
      register,
      registerGuestByStaff,
      fetchGuests,
      fetchGuestDetails,
      checkAuthStatus,
    ]
  );

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
