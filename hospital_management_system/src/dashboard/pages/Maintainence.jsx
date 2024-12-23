// pages/Maintenance.js
import React, { useEffect, useState } from "react";
import AddMaintainence from "../components/maintainence/AddMaintainence";
import { useMaintainenceContext } from "../../context/MaintainenceContext";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { useRoomContext } from "../../context/RoomContext";
import { toast } from "react-toastify";

const Maintenance = () => {
  const [showAddMaintainence, setShowAddMaintainence] = useState(false);

  const {
    fetchMaintainenceRequests,
    mainRequests,
    statuses,
    handleStatusChange,
    handleUpdateStatus,
    reportMaintainece,
  } = useMaintainenceContext();
  const { accessToken } = useStaffAuth();
  const { roomData, fetchRooms } = useRoomContext();

  useEffect(() => {
    const loadData = async () => {
      await fetchMaintainenceRequests(accessToken);
      await fetchRooms(accessToken);
    };

    loadData();
  }, []);

  const updateStatus = async (id) => {
    const response = await handleUpdateStatus(id, accessToken);

    if (response.success) {
      toast.dismiss();
      toast.success("Status updated successfully.");
      return;
    }

    toast.dismiss();
    toast.error("Status update failed.");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl text-center font-bold  mb-6">
        Maintenance Management
      </h1>

      <div className="mb-6">
        <button
          onClick={() => setShowAddMaintainence((prev) => !prev)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {showAddMaintainence
            ? "Hide Report Maintainence"
            : "Report Maintainence"}
        </button>
      </div>

      {showAddMaintainence && (
        <AddMaintainence
          rooms={roomData}
          accessToken={accessToken}
          report={reportMaintainece}
          fetch={fetchMaintainenceRequests}
        />
      )}

      {/* Maintenance Requests Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Maintainence Requests</h2>
          {mainRequests?.length === 0 ? (
            <p className="text-center text-gray-600">
              You have no Maintainence requests yet.
            </p>
          ) : (
            <div className="space-y-4">
              {mainRequests?.map((request) => {
                const matchedRoom =
                  roomData?.find((room) => room._id === request.room) || {};

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
                        ReportedBy:{" "}
                        {request.reported_By_Role || "Room Cleaning"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        ReportedDate: {request.reportedDate|| "Room Cleaning"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        Issue: {request.description || "None"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        Resoulution Date: {request.resolutionDate|| "None"}
                      </p>
                      <p
                        className={`mt-4 font-semibold ${
                          request.status === "reported"
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
                        value={statuses[request._id] || request.status}
                        onChange={(e) =>
                          handleStatusChange(request._id, e.target.value)
                        }
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="in-progress">in-progress</option>
                        <option value="resolved"> resolved</option>
                      </select>
                      <button
                        onClick={() => updateStatus(request._id)}
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

export default Maintenance;
