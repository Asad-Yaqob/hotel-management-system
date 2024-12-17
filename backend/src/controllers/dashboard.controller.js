import { Booking } from "../models/booking.model.js";
import { Room } from "../models/room.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  // Default: Last 30 days if no range provided
  const start = startDate
    ? new Date(startDate)
    : new Date(new Date().setDate(new Date().getDate() - 30));
  const end = endDate ? new Date(endDate) : new Date();

  // Validate date range
  if (start > end) {
    throw new ApiError(400, "Start date cannot be later than end date.");
  }

  // Fetch bookings within the date range
  const bookings = await Booking.find({
    checkInDate: { $gte: start },
    checkOutDate: { $lte: end },
  });

  // Calculate total revenue
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0
  );

  const rooms = await Room.find();

  // Calculate occupancy rate (percentage of occupied rooms)
  const occupiedRooms = new Set(
    bookings.map((booking) => booking.room.toString())
  ).size;
  const totalRooms = rooms.length;
  const occupancyRate =
    totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(2) : 0;

  // Prepare report
  const report = {
    totalBookings: bookings.length,
    totalRevenue,
    occupancyRate: `${occupancyRate}%`,
    bookings,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report generated successfully."));
});

export { getReport };
