import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Total Bookings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Bookings
          </h2>
          <p className="text-2xl font-bold text-blue-500 mt-4">124</p>
        </div>

        {/* Card: Available Rooms */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Available Rooms
          </h2>
          <p className="text-2xl font-bold text-green-500 mt-4">35</p>
        </div>

        {/* Card: Upcoming Check-ins */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Upcoming Check-ins
          </h2>
          <p className="text-2xl font-bold text-orange-500 mt-4">18</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Jane Doe</span>
              <span className="text-gray-500">Room 101</span>
              <span className="text-green-500">Confirmed</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">John Smith</span>
              <span className="text-gray-500">Room 202</span>
              <span className="text-yellow-500">Pending</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-gray-700">Alice Brown</span>
              <span className="text-gray-500">Room 303</span>
              <span className="text-red-500">Cancelled</span>
            </li>
          </ul>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Occupancy Trends
          </h2>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Booking
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Room
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
            View Staff
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
