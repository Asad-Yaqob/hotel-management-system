import React from 'react'
import { FaBed } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import RoomAmenities from './RoomAmenities';

const RoomModelContent = ({closeModal, selectedRoom, }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black text-3xl hover:text-red-500"
        >
          <IoClose />
        </button>

        <div className="max-h-[80vh] overflow-y-auto scroll-hidden">
          <div className="w-full">
            <img
              src={selectedRoom.image}
              alt="Room"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedRoom.roomType}
            </h1>
            <p className="text-gray-600 text-sm mb-8">
              Experience the ultimate luxury and comfort in our Deluxe Suite
              King.
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Description
              </h2>
              <p className="text-gray-600">{selectedRoom.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Bed Type
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FaBed className="text-lg text-gray-800" /> King Size
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Prices are per room. ${selectedRoom.price}
              </p>
            </div>

            <RoomAmenities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomModelContent
