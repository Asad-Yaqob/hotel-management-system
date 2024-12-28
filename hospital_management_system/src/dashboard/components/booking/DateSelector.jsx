import React from "react";

export function DateSelector({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  onSearch,
  error,
}) {

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="checkInDate"
            className="block font-medium text-gray-700"
          >
            Check-In Date
          </label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => onCheckInChange(e.target.value)}
            min={today}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="checkOutDate"
            className="block font-medium text-gray-700"
          >
            Check-Out Date
          </label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => onCheckOutChange(e.target.value)}
            min={checkInDate || today}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      {error && !error.checkIn && !error.checkOut && (
        <div className="text-red-500 text-sm">{error.message}</div>
      )}
      {error?.checkIn && (
        <div className="text-red-500 text-sm">{error.checkIn}</div>
      )}
      {error?.checkOut && (
        <div className="text-red-500 text-sm">{error.checkOut}</div>
      )}
      <button
        onClick={() => onSearch(checkInDate, checkOutDate)}
        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Check Available Rooms
      </button>
    </div>
  );
}
