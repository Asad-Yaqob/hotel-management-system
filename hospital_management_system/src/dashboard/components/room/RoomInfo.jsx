import { Edit2 } from "lucide-react";

export default function RoomInfo({ room, onEdit }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Room {room.roomNo}</h1>
          <p className="text-xl text-gray-600">{room.roomType}</p>
        </div>
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>

      <div>
        <span className="font-semibold">Capacity:</span>
        <p>{room.capacity} persons</p>
      </div>

      <div>
        <span className="font-semibold">Price:</span>
        <p>${room.price}/night</p>
      </div>
      <div>
        <span className="font-semibold">Amenities:</span>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {room.amenities}
          </span>
        </div>
      </div>

      <div>
        <span className="font-semibold">Description:</span>
        <p className="text-gray-600 mt-1">{room.description}</p>
      </div>
    </div>
  );
}
