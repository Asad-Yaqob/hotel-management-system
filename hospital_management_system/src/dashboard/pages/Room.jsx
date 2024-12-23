import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components/reusable/Loader";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { useRoomContext } from "../../context/RoomContext";
import { Link } from "react-router-dom";
import { AddRoom } from "../components/room/AddRoom";

const Room = () => {

  const { user, accessToken } = useStaffAuth();
  const { isLoading, fetchRooms, roomData, deleteRoom } = useRoomContext();

  const [showAddRoom, setShowAddRoom] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (accessToken) {
        await fetchRooms(accessToken);
      } else {
        console.error("Access token not found");
      }
    };
    loadData();
  }, []);

const handleDelete = async (roomId) => {

  const response = await deleteRoom(roomId, accessToken);

   if (response.success) {
        toast.dismiss()
        toast.success("Room deleted successfully.");
        return;
      }
  
       toast.dismiss();
       toast.success("Failed to delete room.");
}

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="rooms bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Room Management</h1>

      {(user?.role === "admin" || user?.role === "manager") && (
        <div className="mb-6">
          <button
            onClick={() => setShowAddRoom((prev) => !prev)}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            {showAddRoom ? "Hide Add Room" : "Add Room"}
          </button>
        </div>
      )}

      {showAddRoom && <AddRoom />}

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room List</h2>
        {roomData.length > 0 ? (
          <table className="w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Room Number</th>
                <th className="p-3 text-left">Rate</th>
                <th className="p-3 text-left">Availablity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{room.roomNo}</td>
                  <td className="border-b px-4 py-2">${room.price}/night</td>
                  <td className="border-b px-4 py-2">{room.availability}</td>
                  <td className="border-b px-4 py-2">{room.status}</td>
                  <td className="border-b px-4 py-2">
                    <Link
                      to={`/admin/roomDetail/${room._id}`}
                      className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Manage
                    </Link>
                    {(user?.role === "admin" || user?.role === "manager") && (
                      <button onClick={() => handleDelete(room._id)} className="px-4 py-2 ms-5 text-white bg-red-500 hover:bg-blue-600 rounded">
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">No rooms available</div>
        )}
      </div>
    </div>
  );
};

export default Room;
