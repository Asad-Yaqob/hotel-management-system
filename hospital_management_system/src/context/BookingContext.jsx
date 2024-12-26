import { createContext, useContext, useState } from "react";
import { validateDates } from "../utils/validation";
import axios from "axios";
import { baseURl } from "../utils/constants";
const BookingContext = createContext();

export const useBookingContext = () => {
  return useContext(BookingContext);
};

export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${baseURl}/booking/requests`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      //   console.log(response.data.data);

      if (response.status === 200) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleSearch = async () => {
    const validationError = validateDates(checkInDate, checkOutDate);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    try {
      await checkRoomAvailability(checkInDate, checkOutDate);
      setAvailableRooms(data.rooms);
      setSelectedRoom(null);
    } catch (err) {
      setError("Failed to fetch available rooms. Please try again.");
    }
  };

  const checkRoomAvailability = async (checkInDate, checkOutDate) => {
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
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setAvailableRooms(response.data.data.rooms);
      setError(null);
    } catch (error) {
      console.error("Error fetching available rooms:", error);
      setError("Failed to fetch available rooms. Please try again.");
    }
  };

  async function submitBooking(bookingData) {
    const response = await axios.post(
      `${baseURl}/booking/reserve-by-staff`,
      bookingData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit booking");
    }

    setCheckInDate("");
    setCheckOutDate("");
    setAvailableRooms([]);
    setSelectedRoom(null);
    return response.json();
  }

  const values = {
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
  };

  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
};
