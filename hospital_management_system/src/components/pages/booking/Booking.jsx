import React from 'react'

const Booking = () => {
  return (
    <div className="bookings bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Booking Management
      </h1>

      {/* Add Booking Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Booking
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Guest Name"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Room Number"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Check-in Date"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Check-out Date"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Booking
          </button>
        </form>
      </div>

      {/* Bookings Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Booking List
        </h2>
        <table className="w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Guest Name</th>
              <th className="p-2 text-left">Room</th>
              <th className="p-2 text-left">Check-in</th>
              <th className="p-2 text-left">Check-out</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Alice Brown</td>
              <td className="p-2">101</td>
              <td className="p-2">2024-12-01</td>
              <td className="p-2">2024-12-05</td>
              <td className="p-2 flex space-x-2">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking
