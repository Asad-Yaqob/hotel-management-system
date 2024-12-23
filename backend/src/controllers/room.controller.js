import { Room } from "../models/room.model.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const addRoom = asyncHandler(async (req, res) => {
  // recieve the data
  // validate data, null-check, already exists,
  // check room image
  // upload image to cloudinary
  // create room object in db
  // send response

  const { roomNo, roomType, capacity, price, amenities, description } =
    req.body;

  if (
    [roomNo, roomType, capacity, price, amenities, description].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be provided");
  }

  const existedRoom = await Room.findOne({ roomNo });

  if (existedRoom) {
    throw new ApiError(409, "Room already exists");
  }

  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "image file is missing");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage) {
    throw new ApiError(400, "Error while uploading the image.");
  }

  const room = await Room.create({
    roomNo,
    roomType,
    capacity,
    price,
    amenities,
    description,
    image: uploadedImage.url,
  });

  if (!room) {
    throw new ApiError(500, "Something went wrong while registering the room");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { room: req.body }, "Room Created Successfully.")
    );
});

const getRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find();

    return res
      .status(200)
      .json(new ApiResponse(200, { rooms }, "Rooms fetched successfully."));
  } catch (error) {
    throw new ApiError(400, "Something went wrong.");
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  // get the room id
  // validate data, null-check.
  // check if room exists
  // update room object in db
  // send response

  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "Room ID is required");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  const { roomNo, roomType, capacity, price, amenities, description } =
    req.body;

  if (
    [roomNo, roomType, capacity, price, amenities, description].some(
      (field) =>
        field === undefined ||
        field === null ||
        (typeof field === "string" && field.trim() === "")
    )
  ) {
    throw new ApiError(400, "All fields must be provided");
  }

  room.roomNo = roomNo;
  room.roomType = roomType;
  room.capacity = capacity;
  room.price = price;
  room.amenities = amenities;
  room.description = description;

  const updatedRoom = await room.save();

  if (!updatedRoom) {
    throw new ApiError(500, "Something went wrong while updating the room");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { room: updatedRoom }, "Room updated successfully.")
    );
});

const deleteRoom = asyncHandler(async (req, res) => {
  // get the room id
  // validate data, null-check.
  // check if room exists
  // delete room object in db

  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "Room ID is required");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  await room.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Room deleted successfully."));
});

const getSingleRoom = asyncHandler(async (req, res) => {
  // get the room id
  // validate data, null-check.
  // check if room exists
  // return room object

  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "Room ID is required");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { room }, "Room fetched successfully."));
});

const changeImage = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) {
    throw new ApiError(400, "Room ID is required");
  }

  const room = await Room.findById(roomId);

  if (!room) {
    throw new ApiError(404, "No room found.");
  }

  await deleteFromCloudinary(room.image);

  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is missing");
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);

  if (!uploadedImage.url) {
    throw new ApiError(400, "Error while uploading the image.");
  }

  room.image = uploadedImage.url;
  await room.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { room: room }, "Room image updated successfully.")
    );
});

const updateRoomStatus = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { status } = req.body; 

  // Validate the inputs
  if (!roomId) {
    throw new ApiError(400, "Room ID is required");
  }

  if (
    !status ||
    !["clean", "dirty", "out-of-service", "maintainence"].includes(status)
  ) {
    throw new ApiError(
      400,
      "Valid status is required (clean, dirty, out of service, maintainence)"
    );
  }

  // Update the room status
  const updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    { $set: { status } },
    { new: true } 
  );

  if (!updatedRoom) {
    throw new ApiError(404, "Room not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedRoom, "Room status updated successfully")
    );
});


export {
  addRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  changeImage,
  updateRoomStatus,
};
