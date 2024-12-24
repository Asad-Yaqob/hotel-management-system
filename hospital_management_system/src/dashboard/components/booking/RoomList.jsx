import React from "react";
import { RoomCard } from "./RoomCard";

export function RoomList({ rooms, onRoomSelect }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} onSelect={onRoomSelect} />
        ))}
      </div>
    </div>
  );
}
