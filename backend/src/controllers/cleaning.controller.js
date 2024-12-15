import { response } from "express";
import { Cleaning } from "../models/cleaning.model.js";
import { Room } from "../models/room.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getRoomsStatus = asyncHandler(async (_, res) => {
  try {
    const rooms = await Room.find().select(
      "-createdAt -updatedAt -availability -amenities -price -capacity -description -image"
    );

    if (!rooms) {
      throw new ApiError(400, "Unable to fetch rooms.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { rooms }, "Room fetched succesfully."));
  } catch (error) {
    throw new ApiError(400, "Unable to get rooms: ", error);
  }
});

const cleaningTasks = asyncHandler(async (_, res) => {
  try {
    const requests = await Cleaning.find();

    return res
      .status(200)
      .json(new ApiResponse(200, requests, " Request Fetched"));
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while fetching the cleaning requests."
    );
  }
});

const scheduleCleaning = asyncHandler(async (req, res) => {
  // get the room no, description, scheduledDate

  const { roomId, description, scheduledDate } = req.body;

  if (
    [roomId, description, scheduledDate].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are mandatory.");
  }

  const cleaningTask = await Cleaning.create({
    room: roomId,
    description,
    reportedBy: req.user._id,
    scheduledDate,
  });

  if (!cleaningTask) {
    throw new ApiError(400, "Unable to add request.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cleaningTask, "Task scheduled successfuly."));
});

const updateStatus = asyncHandler(async (req, res) => {
  const { cleaningId } = req.params;
  const { status } = req.body;

  if (!(cleaningId && status)) {
    throw new ApiError(400, "Cleaning request ID and status is required");
  }

  const cleaningRequest = await Cleaning.findById(cleaningId);

  if (!cleaningRequest) {
    throw new ApiError(404, "Cleaning request not found");
  }

  const room = await Room.findById(cleaningRequest.room);

  if (status === "completed") {
    room.status = "clean";
    await room.save()
  }

  cleaningRequest.status = status;
  await cleaningRequest.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cleaningRequest },
        "Cleaning request status updated successfully."
      )
    );
});

export { getRoomsStatus, scheduleCleaning, cleaningTasks, updateStatus };
