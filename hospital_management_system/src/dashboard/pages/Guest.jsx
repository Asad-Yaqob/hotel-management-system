import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGuestAuth } from "../../context/auth/GuestAuthContext";
import AddGuest from "../components/guest/AddGuest";

const Guests = () => {
  const [showAddGuest, setShowAddGuest] = useState(false);

  const { allGuests, fetchGuests, isLoading, accessToken } = useGuestAuth();
  const guestList = allGuests;

  useEffect(() => {
    const loadData = async () => {
      await fetchGuests(accessToken);
    };

    loadData();
  }, [])

  // console.log(allGuests);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
        Guest Management
      </h1>

      <div className="mb-6">
        <button
          onClick={() => setShowAddGuest((prev) => !prev)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {showAddGuest ? "Hide Add Guest" : "Add Guest"}
        </button>
      </div>

      {showAddGuest && <AddGuest />}

      {/* Guests Table */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h2 className="text-xl font-bold mb-4">Guest List</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">First Name</th>
              <th className="border-b px-4 py-2 text-left">Last Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Show a loader when data is being fetched
              <tr>
                <td colSpan="4" className="text-center py-4">
                  <div className="flex justify-center items-center">
                    <div className="loader border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">
                      Loading guest data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : guestList?.length > 0 ? (
              // Render staff data when available
              guestList.map((guest) => (
                <tr key={guest._id} className={"hover:bg-gray-10"}>
                  <td className="border-b px-4 py-2">{guest.firstName}</td>
                  <td className="border-b px-4 py-2">{guest.lastName}</td>
                  <td className="border-b px-4 py-2">{guest.email}</td>
                  <td className="border-b px-4 py-2">
                    {/* Action column replaced with a link */}
                    <Link
                      to={`/admin/guestDetail/${guest._id}`}
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              // Show a message if no staff data is available
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No staff data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guests;
