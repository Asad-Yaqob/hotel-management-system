import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { validateDates } from "../utils/validation";
import axios from "axios";
import { baseURl } from "../utils/constants";

const BookingContext = createContext();

export const useBookingContext = () => {
  return useContext(BookingContext);
};

export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async (accessToken) => {
    try {
      const response = await axios.get(`${baseURl}/booking/requests`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again.");
    }
  }, []);


  const handleSearch = useCallback(async (checkInDate, checkOutDate) => {
    const validationError = validateDates(checkInDate, checkOutDate);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    try {
      const data = await checkRoomAvailability(checkInDate, checkOutDate);
      setAvailableRooms(data.rooms);
      setSelectedRoom(null);
    } catch (err) {
      setError("Failed to fetch available rooms. Please try again.");
    }
  }, []);

  const checkRoomAvailability = useCallback(
    async (checkInDate, checkOutDate, accessToken) => {
      if (!checkInDate || !checkOutDate) {
        setError("Both check-in and check-out dates are required.");
        return;
      }

      try {
        const response = await axios.post(
          `${baseURl}/booking/check-availability`,
          { checkInDate, checkOutDate },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setError(null);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching available rooms:", error);
        setError("Failed to fetch available rooms. Please try again.");
        throw error;
      }
    },
    []
  );

  const submitBooking = useCallback(
    async (bookingData, userRole, accessToken) => {
      const url = `${baseURl}/booking/${
        userRole === "guest" ? "reserve" : "reserve-by-staff"
      }`;

      try {
        const response = await axios.post(url, bookingData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status > 400) {
          return { success: false, message: "Room reservation failed." };
        }

        setCheckInDate("");
        setCheckOutDate("");
        setAvailableRooms([]);
        setSelectedRoom(null);

        return { success: true, message: "Room reserved successfully." };
      } catch (error) {
        console.error("Error submitting booking:", error);
        return { success: false, message: "Room reservation failed." };
      }
    },
    []
  );

  const values = useMemo(() => ({
    error,
    bookings,
    availableRooms,
    checkInDate,
    checkOutDate,
    selectedRoom,
    setCheckInDate,
    setCheckOutDate,
    setError,
    setSelectedRoom,
    setAvailableRooms,
    fetchBookings,
    handleSearch,
    checkRoomAvailability,
    submitBooking,
  }), [
    error,
    bookings,
    availableRooms,
    checkInDate,
    checkOutDate,
    selectedRoom,
    fetchBookings,
    handleSearch,
    checkRoomAvailability,
    submitBooking,
  ]);

  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
};
