import { Cleaning } from "../models/cleaning.model.js";
import { Room }  from "../models/room.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getRoomsStatus = asyncHandler( async (req, res) => {
    try {
        const rooms = await Room.find().select("-createdAt -updatedAt -availability -amenities -price -capacity -description -image")

        if (!rooms) {
            throw new ApiError(400, "Unable to fetch rooms.")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, {rooms}, "Room fetched succesfully.")
        )
    } catch (error) {
        throw new ApiError(400,"Unable to get rooms: ", error);
    }
})


const scheduleCleaning = asyncHandler( async (req, res) => {
    // get the room no, description, scheduledDate

    const { roomNo, description, scheduledDate } = req.body;

    if ([roomNo, description, scheduledDate].some((field) => field?.trim() === "" )) {
        throw new ApiError(400,"All fields are mandatory.");
    }

    const cleaningTask = await Cleaning.create(
        {
            room: roomNo,
            description,
            reportedBy: req.user._id,
            scheduledDate
        }
    )

    if (!cleaningTask) {
        throw new ApiError(400, "Unable to add request.")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {cleaningTask}, "Task scheduled successfuly.")
    )
})

const markAsCompleted = asyncHandler( async (req, res) => {

    const {roomId, cleaningId } = req.body;

    if (!(roomId && cleaningId)) {
        throw new ApiError(400,"All fields are mandatory");
    }

  const request =  await Cleaning.findByIdAndDelete(cleaningId)

   if (!request) {
    throw new ApiError(400,"Unable to delete request");
   }

   const updateStatus = await Room.findByIdAndUpdate(roomId,
    {
        $set: {
            status: "clean"
        }
    },
    {
        new: true,
    }
   )

   if (!updateStatus) {
     throw new ApiError(400,"Something went wronge while updating room tuesday");
   }

   return res
   .status(200)
   .json(
    new ApiResponse(200, {}, "Task marked as completed")
   )
})

export { getRoomsStatus, scheduleCleaning, markAsCompleted }