import React from "react";
import { GuestInformationForm } from "./GuestInformationForm";

export function SelectedRoom({
  room,
  checkInDate,
  checkOutDate,
  onSubmitBooking,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Selected Room</h2>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <img
          src={room.image}
          alt={room.roomNo}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{room.roomNo}</h3>
          <p className="text-gray-600 mb-3">{room.description}</p>
          <p className="font-semibold text-lg text-indigo-600">
            ${room.price}/night
          </p>

          <GuestInformationForm
            room={room}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onSubmit={onSubmitBooking}
          />
        </div>
      </div>
    </div>
  );
}
