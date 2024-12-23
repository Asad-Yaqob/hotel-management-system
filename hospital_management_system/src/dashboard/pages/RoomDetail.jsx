import React, { useEffect, useState } from "react";
import RoomImage from "../components/room/RoomImage";
import RoomStatusControls from "../components/room/RoomStatusControls";
import RoomAvailabilityControls from "../components/room/RoomAvailabilityControls";
import RoomEditForm from "../components/room/RoomEditForm";
import { Link, useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";
import { useStaffAuth } from "../../context/auth/StaffAuthContext";
import { Loader } from "../components/reusable/Loader";
import { toast } from "react-toastify";

const RoomDetails = () => {
  const { roomId } = useParams();
  const {
    isLoading,
    fetchCurrentRoom,
    currentRoom,
    updateRoomStatus,
    changeImage,
  } = useRoomContext();

  const { accessToken } = useStaffAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentRoom.status);

  useEffect(() => {
    const loadRoomData = async () => {
      await fetchCurrentRoom(accessToken, roomId);
    };

    loadRoomData();
  }, []);

  // console.log(currentRoom._id);

  const handleStatusChange = async () => {

    console.log("Updating status to:", selectedStatus);

    const response = await updateRoomStatus(
      roomId,
      accessToken,
      selectedStatus
    );

    if (response.success) {

      // Fetch updated room data
      await fetchCurrentRoom(accessToken, roomId);

      toast.dismiss()
      toast.success("Room status updated successfully.");
      return;
    }

     toast.dismiss();
     toast.success("Failed to update  status.");
  };

  const handleAvailabilityChange = (availability) => {
    console.log("Availability changed to:", availability);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RoomImage
              image={currentRoom.image}
              roomNo={currentRoom._id}
              onImageUpdate={changeImage}
              accessToken={accessToken}
            />

            <div>
              {isEditing ? (
                <RoomEditForm
                  room={currentRoom}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <>
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">
                      Room {currentRoom.roomNo}
                    </h1>

                    <p className="text-lg text-gray-600 mb-3">
                      <span className="font-bold">Room Type:</span>{" "}
                      {currentRoom.roomType}
                    </p>
                    <p className="text-lg text-gray-600 mb-3">
                      <span className="font-bold">Capacity:</span>{" "}
                      {currentRoom.capacity}
                    </p>
                    <p className="text-lg text-gray-600 mb-3">
                      <span className="font-bold">Price:</span>{" "}
                      {currentRoom.price}
                    </p>
                    <p className="text-lg text-gray-600 mb-3">
                      <span className="font-bold">Amenities:</span>{" "}
                      {currentRoom.amenities}
                    </p>
                    <p className="text-lg text-gray-600 mb-3">
                      <span className="font-bold">Description:</span>{" "}
                      {currentRoom.description}
                    </p>
                  </div>
                  <RoomStatusControls
                    currentStatus={currentRoom.status}
                    onStatusChange={(newStatus) =>
                      console.log("Status changed to", newStatus)
                    }
                  />
                  <RoomAvailabilityControls
                    currentAvailability={currentRoom.availability}
                    onAvailabilityChange={handleAvailabilityChange}
                  />
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded mt-4 hover:bg-indigo-600"
                  >
                    Edit Details
                  </button>
                  <Link
                    to={"/admin/room"}
                    className="px-4 py-2 ms-5 bg-indigo-500 text-white rounded mt-4 hover:bg-indigo-600"
                  >
                    Go Back
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Section for Status Change */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Update Room Status</h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-[50%] px-4 py-2 rounded-lg focus:outline-none focus:ring-0"
        >
          <option value="clean">Clean</option>
          <option value="dirty">Dirty</option>
          <option value="out-of-service">Out of Service</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button
          onClick={handleStatusChange}
          className="px-4 py-2 ms-5 bg-indigo-500 text-white rounded mt-4 hover:bg-indigo-600"
        >
          Change Status
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
