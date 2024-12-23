import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { baseURl, services } from "../../utils/constants";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";

const Cleaning = () => {
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [statuses, setStatuses] = useState({}); // State to store status for each request
  const { accessToken } = useStaffAuth();

  useEffect(() => {
    const loadData = async () => {
      await fetchRoomsStatus(accessToken);
      await fetchCleaningRequests();
    };

    loadData();
  }, []);

const fetchRoomsStatus = async (accessToken) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURl}/cleaning/rooms-status`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setRoomData(response.data.data.rooms);
      }
    } catch (error) {
      console.error("Error fetching room status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCleaningRequests = async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURl}/cleaning/tasks`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        setRequests(response.data.data);
        // Initialize statuses for each request
        const initialStatuses = response.data.data.reduce((acc, request) => {
          acc[request.room] = request.status;
          return acc;
        }, {});
        setStatuses(initialStatuses);
      }
    } catch (error) {
      console.error("Error fetching cleaning requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (roomId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [roomId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (roomId, cleaningId) => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const newStatus = statuses[roomId];
      // console.log(`Updating status for room ${roomId} to ${newStatus}`);

      const response = await axios.patch(
        `${baseURl}/cleaning/update/${cleaningId}`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );


      if (response.status === 200) {
        toast.dismiss();
        toast.success("Status updated successfully!");
        return;
      }

      toast.dismiss();
      toast.error("Error updating status");

    } catch (error) {
       toast.dismiss();
       toast.error(error || "Error updating status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold">House Keeping Management</h1>
      </header>

      <div>
        <h1 className="text-2xl font-bold">Offered Services</h1>
        <p className="mt-2 text-lg">
          Request a cleaning service to make your stay even more comfortable.
        </p>
      </div>

      <section className="py-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mt-4">{service.name}</h2>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 mb-8">
        <h2 className="text-2xl font-bold mb-4">Rooms Status</h2>
        <div className="rounded-lg">
          {roomData.length > 0 ? (
            <table className="w-full bg-white border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Room Number</th>
                  <th className="p-3 text-left">Room Type</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomData.map((room) => (
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2">{room.roomNo}</td>
                    <td className="border-b px-4 py-2">{room.roomType}</td>
                    <td className="border-b px-4 py-2">{room.status}</td>
                    <td className="border-b px-4 py-2">
                      <Link
                        to={`/admin/schedualCleaning/${room._id}`}
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                      >
                        Schedual Cleaning
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500">No rooms available</div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
          Cleaning Requests
          </h2>
          {requests?.length === 0 ? (
            <p className="text-center text-gray-600">
              You have no cleaning requests yet.
            </p>
          ) : (
            <div className="space-y-4">
              {requests?.map((request) => {
                const matchedRoom = roomData.find(
                  (room) => room._id === request.room
                );
                return (
                  <div
                    key={request.room}
                    className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        Room {matchedRoom?.roomNo || "Unknown"}
                      </h3>
                      <p className="text-gray-600 mt-2">
                        Service: {request.service || "Room Cleaning"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        Special Instructions: {request.description || "None"}
                      </p>
                      <p
                        className={`mt-4 font-semibold ${
                          request.status === "pending"
                            ? "text-yellow-500"
                            : request.status === "in-progress"
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        Status: {request.status}
                      </p>
                    </div>
                    <div className="flex items-end  space-x-4">
                      <select
                        value={statuses[request.room] || request.status}
                        onChange={(e) =>
                          handleStatusChange(request.room, e.target.value)
                        }
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => handleUpdateStatus(request.room, request._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cleaning;
