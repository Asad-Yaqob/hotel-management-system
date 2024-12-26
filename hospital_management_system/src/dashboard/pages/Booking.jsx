import React, { useEffect } from "react";
import { DateSelector } from "../components/booking/DateSelector";
import { RoomList } from "../components/booking/RoomList";
import { SelectedRoom } from "../components/booking/SelectedRoom";
import { useBookingContext } from "../../context/BookingContext";
import { useGuestAuth } from "../../context/auth/GuestAuthContext";
import { useRoomContext } from "../../context/RoomContext";
import BookingList from "../components/booking/BookingList";

function App() {
  
  const {
    bookings,
    availableRooms,
    fetchBookings,
    error,
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    handleSearch,
    selectedRoom,
    setSelectedRoom,
  } = useBookingContext();

  const { allGuests, fetchGuests } = useGuestAuth();
  const { roomData, fetchRooms } = useRoomContext();

  useEffect(() => {
    const loadData = async () => {
      await fetchBookings();
      await fetchGuests(localStorage.getItem("access_token"));
      await fetchRooms(localStorage.getItem("access_token"));
    };

    loadData();
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full mx-auto  py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Room Reservation
        </h1>

        <BookingList
          bookings={bookings}
          allGuests={allGuests}
          roomData={roomData}
        />

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
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
