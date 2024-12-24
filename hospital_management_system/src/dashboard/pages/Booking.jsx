import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURl } from "../../utils/constants";
import { DateSelector } from "../components/booking/DateSelector";
import { RoomList } from "../components/booking/RoomList";
import { SelectedRoom } from "../components/booking/SelectedRoom";
import { validateDates } from "../../utils/validation";

function App() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState();


  useEffect(() => {
    const loadData = async () => {
      await fetchBookings();
    }

    loadData();
  }, []);

  const handleSearch = async () => {
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
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${baseURl}/booking/requests`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data.data);

      if (response.status === 200) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
      setError(null); // Clear any previous error
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

    return response.json();
  }

  const handleBookingSubmit = async (bookingData) => {
    try {
      await submitBooking(bookingData);
      alert("Booking successful!");

      setCheckInDate("");
      setCheckOutDate("");
      setAvailableRooms([]);
      setSelectedRoom(null);
    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Room Reservation
        </h1>

        <div className="rounded-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
          {bookings?.length > 0 ? (
            <table className="w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Guest</th>
                  <th className="p-3 text-left">Total Price</th>
                  <th className="p-3 text-left">Room Number</th>
                  <th className="p-3 text-left">Check In </th>
                  <th className="p-3 text-left">Check Out</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2">{booking.guest}</td>
                    <td className="border-b px-4 py-2">${booking.totalPrice}/night</td>
                    <td className="border-b px-4 py-2">{booking.room}</td>
                    <td className="border-b px-4 py-2">{booking.checkInDate}</td>
                    <td className="border-b px-4 py-2">{booking.checkOutDate}</td>
                    <td className="border-b px-4 py-2">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500">No rooms available</div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <DateSelector
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onCheckInChange={setCheckInDate}
            onCheckOutChange={setCheckOutDate}
            onSearch={handleSearch}
            error={error}
          />

          {availableRooms.length > 0 && !selectedRoom && (
            <RoomList rooms={availableRooms} onRoomSelect={setSelectedRoom} />
          )}

          {selectedRoom && (
            <SelectedRoom
              room={selectedRoom}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSubmitBooking={handleBookingSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
