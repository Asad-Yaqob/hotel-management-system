import React, { useEffect } from "react";
import RoomDetail from "../components/room/RoomDetail";
import { useParams } from "react-router-dom";
import { useRoomContext } from "../../context/RoomContext";

const RoomDetailPage = () => {

    const { roomId } = useParams();
    const { currentRoom, fetchCurrentRoom } = useRoomContext();

    useEffect(() => {
        const loadData = async () => {
            await fetchCurrentRoom(roomId);
        };

        loadData();
    }, [roomId, fetchCurrentRoom]);

    return (
      <div className="mt-[120px] mx-16">
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Room Details</h1>
          <p className="text-gray-600">
            Detailed information about the selected room
          </p>
        </header>
        <main>
          <section className="mb-6">
            <RoomDetail room={currentRoom} />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">
              Here you can add more details about the room, such as amenities,
              policies, and other relevant information.
            </p>
          </section>
        </main>
      </div>
    );
};

export default RoomDetailPage;
