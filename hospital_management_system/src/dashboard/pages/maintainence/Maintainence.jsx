// pages/Maintenance.js
import React from "react";

const Maintenance = () => {
  return (
    <div className="maintenance bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Maintenance Management
      </h1>

      {/* Add Maintenance Request Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Maintenance Request
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Room Number"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Issue Description"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Request Date"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Request
          </button>
        </form>
      </div>

      {/* Maintenance Requests Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Maintenance Requests
        </h2>
        <table className="w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Room</th>
              <th className="p-2 text-left">Issue</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">104</td>
              <td className="p-2">Leaky Faucet</td>
              <td className="p-2">2024-12-04</td>
              <td className="p-2 text-yellow-500">Pending</td>
              <td className="p-2 flex space-x-2">
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
                  Mark In Progress
                </button>
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                  Mark Completed
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">305</td>
              <td className="p-2">Broken AC</td>
              <td className="p-2">2024-12-02</td>
              <td className="p-2 text-blue-500">In Progress</td>
              <td className="p-2 flex space-x-2">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                  Mark Completed
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

export default Maintenance;
