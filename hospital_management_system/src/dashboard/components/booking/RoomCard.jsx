import React from "react";

export function RoomCard({ room, onSelect }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img
        src={room.image}
        alt={room.roomNo}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{room.roomNo}</h3>
        <p className="text-gray-600 mb-3">{room.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-indigo-600">
            ${room.price}/night
          </p>
          <button
            onClick={() => onSelect(room)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Select Room
          </button>
        </div>
      </div>
    </div>
  );
}
