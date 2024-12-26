import { Booking } from "../models/booking.model.js";
import { Guest } from "../models/guest.model.js";
import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getBookings = asyncHandler(async (_, res) => {
  try {
    const bookings = await Booking.find();

    return res
      .status(200)
      .json(new ApiResponse(200, bookings, "Bookings fetch successfully"));
  } catch (error) {
    throw new ApiError(400, "Unable to get bookings: ", error);
  }
});

const checkAvailability = asyncHandler(async (req, res) => {
  const { checkInDate, checkOutDate } = req.body;

  if (!(checkInDate && checkOutDate)) {
    throw new ApiError(400, "CheckInDate and CheckOutDate must be specified.");
  }

  try {
    // Step 1: Find all conflicting bookings
    const conflictingBookings = await Booking.find({
      checkInDate: { $lt: checkOutDate }, // Booking starts before the check-out date
      checkOutDate: { $gt: checkInDate }, // Booking ends after the check-in date
    }).select("room");

    // Extract room IDs from conflicting bookings
    const bookedRoomIds = conflictingBookings.map((booking) => booking.room);

    // Step 2: Find available rooms that are not in the bookedRoomIds and are not occupied
    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds }, // Exclude booked rooms
      availability: { $ne: "occupied" }, // Exclude rooms marked as 'occupied'
    });

    // Step 3: Return the response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { rooms: availableRooms, checkInDate, checkOutDate },
          "Available rooms"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      `Could not fetch available rooms. Error: ${error.message}`
    );
  }
});


const reserveRoomByGuest = asyncHandler(async (req, res) => {
  const {
    roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    // additionalServices,
    phone,
    country,
    city,
    address,
    cardNo,
    cvv,
    cashPayment, // Indicates payment method
  } = req.body;

  // Step 1: Mandatory fields check
  if (
    [
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
      // additionalServices,
      phone,
      country,
      city,
      address,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are mandatory.");
  }

  // Step 2: Validate payment details based on payment method
  if (!cashPayment) {
    // If cashPayment is false or not set
    if (!cardNo?.trim() || !cvv?.trim()) {
      throw new ApiError(
        400,
        "Card number and CVV are required for online payment."
      );
    }
  }

  const userId = req.user._id;

  const existedBooking = await Booking.findOne({
    room: roomId,
    guest: userId,
    $or: [
      { checkInDate: { $lt: checkOutDate, $gte: checkInDate } }, // Overlaps with new booking dates
      { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } },
      {
        checkInDate: { $lte: checkInDate },
        checkOutDate: { $gte: checkOutDate },
      }, // Completely encompasses the new booking
    ],
  });

  if (existedBooking) {
    console.log(existedBooking);
    throw new ApiError(400, "Room is already booked for this guest.");
  }

  // Step 3: Update user information
  const updateUser = await Guest.findByIdAndUpdate(
    userId,
    {
      $set: {
        phone,
        country,
        city,
        address,
        ...(cashPayment ? {} : { cardNo, cvv }), // Only update card details if not paying with cash
      },
    },
    {
      new: true,
      select: "-password -refreshToken -cardNo -cvv",
    }
  );

  if (!updateUser) {
    throw new ApiError(403, "Unable to update user information");
  }

  // Step 4: Create the booking
  const booking = await Booking.create({
    guest: userId,
    room: roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    // additionalServices,
  });

  // Update the room status to "occupied"
  await Room.findByIdAndUpdate(roomId, { availability: "occupied" });

  // Step 5: Return response
  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking added successfully."));
});

const  reserveRoomByStaff = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    country,
    city,
    address,
    roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    // additionalServices,
    cardNo,
    cvv,
    cashPayment,
  } = req.body;

  // Step 1: Validate mandatory fields
  if (
    [
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      city,
      address,
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
    ].some((field) => !field || (typeof field === "string" && !field.trim()))
  ) {
    throw new ApiError(400, "All fields are mandatory.");
  }

  const roles = ["admin", "manager", "receptionist"];
  // Step 2: Check staff role
  if (!roles.includes(req.user.role)) {
    throw new ApiError(
      403,
      "Unauthorized action. Only staff can perform this operation."
    );
  }

  // Step 3: Check if guest already exists
  let guest = await Guest.findOne({ email });

  if (!guest) {
    // Create a new guest
    guest = await Guest.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      city,
      address,
      ...(cashPayment ? {} : { cardNo, cvv }), // Add card details only if payment is online
    });
  }

  const guestId = guest._id;

  const existedBooking = await Booking.findOne({
    room: roomId,
    guest: guestId,
    $or: [
      { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },
      { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } },
      {
        checkInDate: { $lte: checkInDate },
        checkOutDate: { $gte: checkOutDate },
      }, // Completely encompasses the new booking
    ],
  });

  if (existedBooking) {
    console.log(existedBooking);
    throw new ApiError(400, "Room is already booked for this guest.");
  }

  // Step 4: Create the booking
  const booking = await Booking.create({
    guest: guestId,
    room: roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    // additionalServices,
  });

  // Update the room status to "occupied"
  await Room.findByIdAndUpdate(roomId, { availability: "occupied" });

  // Step 5: Return response
  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Room reserved successfully."));
});

export {
  getBookings,
  reserveRoomByGuest,
  checkAvailability,
  reserveRoomByStaff,
};
