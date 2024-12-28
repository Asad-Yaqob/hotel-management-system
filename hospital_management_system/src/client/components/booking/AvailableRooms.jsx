import React from "react";
import { SelectedRoom } from "../../../dashboard/components/booking/SelectedRoom";
export const AvailableRooms = ({
  availableRooms,
  openModal,
  selectedRoom,
  setSelectedRoom,
  checkInDate,
  checkOutDate,
}) => {
  return (
    <section className="py-10 bg-gray-100 px-4">
      {availableRooms?.length > 0 &&
        availableRooms?.map((room) => (
          <div
            key={room._id}
            className="container mx-auto border rounded-lg shadow-lg overflow-hidden mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="sm:col-span-2 relative">
                <img
                  src={room.image}
                  alt="Room"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => openModal(room)}
                  className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full"
                >
                  📷
                </button>
              </div>

              <div className="sm:col-span-3 bg-white p-4 sm:p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Best Available Rate
                  </h2>
                  <p className="text-gray-500">USD {room.price}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium">
                      Guest ({room.capacity})
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-lg">👤</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Booking Policy</p>
                    <a href="#" className="text-blue-600 mt-2 block">
                      View Details
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">475.00 Avg/night</p>
                    <p className="text-sm text-gray-500">
                      + 123.50 taxes and charges
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="mt-6 border bg-black hover:bg-slate-300 hover:text-black text-white py-2 px-10 rounded w-full sm:w-auto"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold">{room.name}</h3>
            </div>
          </div>
        ))}

      {selectedRoom && (
        <SelectedRoom
          room={selectedRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      )}
    </section>
  );
};
