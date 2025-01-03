import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { baseURl } from "../utils/constants";
import axios from "axios";

const RoomContext = createContext();

export const useRoomContext = () => {
  return useContext(RoomContext);
};

export const RoomContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});

  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURl}/room/get-rooms`);
      if (response.status === 200) {
        setRoomData(response.data.data.rooms);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCurrentRoom = useCallback(async (roomId) => {
    if (!roomId) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURl}/room/get-room/${roomId}`);
      if (response.status === 200) {
        setCurrentRoom(response.data.data.room);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching room:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRoom = useCallback(async (roomId, accessToken, roomNo, roomType, capacity, price, amenities, description) => {
    if (!accessToken || !roomId) return { success: false, message: "RoomId or accessToken is missing" };

    const fields = [roomNo, roomType, capacity, price, amenities, description];
    if (fields.some(field => field === undefined || field === null || (typeof field === "string" && field.trim() === ""))) {
      return { success: false, message: "All fields are mandatory" };
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${baseURl}/room/update/${roomId}`,
        { roomNo, roomType, capacity, price, amenities, description },
        { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 200) {
        return { success: true, message: "Room updated successfully" };
      } else {
        console.error("Unexpected response status:", response.status);
        return { success: false, message: "Failed to update room" };
      }
    } catch (error) {
      return { success: false, message: error.message || "An error occurred while updating the room" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeImage = useCallback(async (image, roomId, accessToken) => {
    if (!image || !roomId || !accessToken) {
      return { success: false, message: "Missing required fields." };
    }

    const formData = new FormData();
    formData.append("image", image);

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${baseURl}/room/change-image/${roomId}`,
        formData,
        { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" } }
      );
      if (response.status < 400) {
        return { success: true, message: "Image updated successfully." };
      } else {
        return { success: false, message: response.data?.message || "Failed to update image." };
      }
    } catch (error) {
      console.error("Error updating image:", error);
      return { success: false, message: error.response?.data?.message || error.message || "Unable to update image." };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRoomStatus = useCallback(async (roomId, accessToken, status) => {
    if (!accessToken || !roomId) return { success: false, message: "RoomId or accessToken is missing" };
    if (!status) return { success: false, message: "Status is mandatory" };

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${baseURl}/room/change-status/${roomId}`,
        { status },
        { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.status === 200) {
        return { success: true, message: "Status changed successfully" };
      } else {
        console.error("Unexpected response status:", response.status);
        return { success: false, message: "Failed to change status" };
      }
    } catch (error) {
      return { success: false, message: "Unable to change status" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteRoom = useCallback(async (roomId, accessToken) => {
    if (!accessToken || !roomId) return { success: false, message: "RoomId or accessToken is missing" };

    setIsLoading(true);
    try {
      const response = await axios.delete(`${baseURl}/room/delete/${roomId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.status === 200) {
        return { success: true, message: "Room deleted successfully" };
      } else {
        console.error("Unexpected response status:", response.status);
        return { success: false, message: "Failed to delete room" };
      }
    } catch (error) {
      return { success: false, message: error.message || "Unable to delete room" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const values = useMemo(() => ({
    isLoading,
    roomData,
    currentRoom,
    changeImage,
    updateRoomStatus,
    updateRoom,
    fetchRooms,
    setCurrentRoom,
    fetchCurrentRoom,
    deleteRoom,
  }), [isLoading, roomData, currentRoom, changeImage, updateRoomStatus, updateRoom, fetchRooms, fetchCurrentRoom, deleteRoom]);

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

RoomContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
