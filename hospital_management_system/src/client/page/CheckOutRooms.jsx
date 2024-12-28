import React, { useState, useEffect } from "react";
import { useBookingContext } from "../../context/BookingContext";
import { toast } from "react-toastify";
import { DateSelector } from "../../dashboard/components/booking/DateSelector";
import { AvailableRooms } from "../components/booking/AvailableRooms";
import { HeroImage } from "../components/booking/HeroImage";
import RoomModelContent from "../components/booking/RoomModelContent";

const CheckOutRooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [errors, setErrors] = useState({ checkIn: "", checkOut: "" });

  const { availableRooms, handleSearch, selectedRoom, setSelectedRoom } =
    useBookingContext();

  const handleBookNow = async (checkInDate, checkOutDate) => {

    if (!checkInDate) {
      setErrors((prev) => ({ ...prev, checkIn: "Check-in date is required" }));
      return;
    }

    if (!checkOutDate) {
      setErrors((prev) => ({
        ...prev,
        checkOut: "Check-out date is required",
      }));
      return;
    }

    setErrors({ checkIn: "", checkOut: "" });

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.dismiss();
      toast.info("Please login to preceed further.");
      return;
    }

    await handleSearch(checkInDate, checkOutDate);
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <HeroImage />

      <div className="mt-10 mb-10 px-4">
        <DateSelector
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          error={errors}
          onCheckInChange={setCheckInDate}
          onCheckOutChange={setCheckOutDate}
          onSearch={handleBookNow}
        />
      </div>

      <AvailableRooms
        availableRooms={availableRooms}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        openModal={openModal}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />

      {/* Modal to display selected room details */}
      {isModalOpen && selectedRoom && (
        <RoomModelContent closeModal={closeModal}  selectedRoom={selectedRoom} />
      )}
    </div>
  );
};
export default CheckOutRooms;
