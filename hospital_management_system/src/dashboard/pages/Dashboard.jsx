import React from "react";
import { roles } from "../../utils/constants";
import { Error } from "../components/reusable/Error";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const { user } = useStaffAuth();

  // Case 2: If the user's role is invalid, show an error page
  if (!roles.includes(user?.role)) {
    return (
      <Error
        message="Only Staff can access this dashboard. Sorry"
        onRetry={() => useNavigate("/")}
      />
    );
  }

  // Case 3: If the user is deactivated, show a deactivation message
  if (user?.isActive === false) {
    return (
      <Error
        message="Your account is deactivated. Please contact the administrator."
        onRetry={() => useNavigate("/")}
      />
    );
  }

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
