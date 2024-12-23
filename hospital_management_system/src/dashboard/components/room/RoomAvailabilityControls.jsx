import { AVAILABILITY_OPTIONS } from "../../../utils/constants";

export default function RoomAvailabilityControls({
  currentAvailability,
  onAvailabilityChange,
}) {
  const getAvailabilityColor = (availability) => {
    return availability === "available"
      ? "bg-emerald-100 text-emerald-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">Availability:</span>
      <div className="flex gap-2">
        {AVAILABILITY_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onAvailabilityChange(option)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentAvailability === option
                ? getAvailabilityColor(option)
                : "bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
