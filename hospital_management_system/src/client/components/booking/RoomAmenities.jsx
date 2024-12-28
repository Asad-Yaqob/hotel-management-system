import React from "react";

const RoomAmenities = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <p className="text-gray-600 flex items-center gap-2">✔ King Bed</p>
        <p className="text-gray-600 flex items-center gap-2">✔ Minibar</p>
        <p className="text-gray-600 flex items-center gap-2">
          ✔ Free Breakfast
        </p>
        <p className="text-gray-600 flex items-center gap-2">✔ Safe in Room</p>
        <p className="text-gray-600 flex items-center gap-2">✔ Free Wifi</p>
        <p className="text-gray-600 flex items-center gap-2">✔ Telephone</p>
        <p className="text-gray-600 flex items-center gap-2">
          ✔ Air Conditioning
        </p>
        <p className="text-gray-600 flex items-center gap-2">✔ Desk</p>
        <p className="text-gray-600 flex items-center gap-2">✔ LCD/Plasma TV</p>
        <p className="text-gray-600 flex items-center gap-2">
          ✔ Electronic Key Card
        </p>
        <p className="text-gray-600 flex items-center gap-2">
          ✔ Safety Deposit Box
        </p>
      </div>
    </div>
  );
};

export default RoomAmenities;
