import { STATUS_OPTIONS, STATUS_COLORS } from "../../../utils/constants";

export default function RoomStatusControls({ currentStatus, onStatusChange }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="font-semibold">Status:</span>
      <div className="flex gap-2">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onStatusChange(option)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentStatus === option ? STATUS_COLORS[option] : "bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
