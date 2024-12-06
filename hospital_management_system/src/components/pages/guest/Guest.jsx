// pages/Guests.js
import React from "react";

const Guests = () => {
  return (
    <div className="guests bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Guest Management
      </h1>

      {/* Add Guest Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Guest
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Booking ID"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Guest
          </button>
        </form>
      </div>

      {/* Guests Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Guest List</h2>
        <table className="w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Booking ID</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Alice Brown</td>
              <td className="p-2">alicebrown@example.com</td>
              <td className="p-2">+123456789</td>
              <td className="p-2">#G001</td>
              <td className="p-2 flex space-x-2">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Bob Johnson</td>
              <td className="p-2">bobjohnson@example.com</td>
              <td className="p-2">+987654321</td>
              <td className="p-2">#G002</td>
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
};

export default Guests;
