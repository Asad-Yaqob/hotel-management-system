import React from "react";
import { Link } from "react-router-dom";

const RoomDetail = ({ room }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white flex">
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">{room.roomType}</h1>
        <p className="text-gray-700 mb-2">Room No: {room.roomNo}</p>
        <p className="text-gray-700 mb-2">Capacity: {room.capacity}</p>
        <p className="text-gray-700 mb-2">Price: {room.price}</p>
        <p className="text-gray-700 mb-4">Description: {room.description}</p>
        <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
        <p className="text-gray-700 mb-4">{room.amenities}</p>
        <div className="flex gap-4">
          <Link
            to={"/Gallery"}
            className="text-sm font-semibold py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-blue-600 transition"
          >
            Discover More
          </Link>
          <Link
            to={"/CheckoutRoom"}
            className="text-sm font-semibold py-2 px-6 bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Reserve Now
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <img
          src={room.image}
          alt={room.roomType}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RoomDetail;
