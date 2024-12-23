import { Maintenance } from "../models/maintainence.model.js";
import { Room } from "../models/room.model.js"

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const allMaintainenRequests = asyncHandler(async (_, res) => {
  try {

    const requests = await Maintenance.find();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { requests },
          "All maintenance requests fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(400, "Something went wrong while fetching the requests");
  }
});

const requestForMaintainence = asyncHandler(async (req, res) => {
  const { roomId, description } = req.body;

  if (!(roomId && description)) {
    throw new ApiError(400, "Fields can't be empty");
  }

 const staffRoles = [
    "admin",
    "manager",
    "housekeeping",
    "maintainence",
    "receptionist",
  ];

  const userRole = req.user.role;

  const isStaff = staffRoles.includes(userRole);

  const isRequestExists = await Maintenance.findOne({ room: roomId });

  if (isRequestExists) {
    throw new ApiError(400, "request already exists");
  }

  const request = await Maintenance.create({
    room: roomId,
    description,
    reported_By_Role: isStaff ? "Staff" : "Guest",
    reportedBy: req.user._id
  });

  if (!request) {
    throw new ApiError(400, "Unable to create request.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { request },
        "Request for maintainence created successfully."
      )
    );
});

const updateStatus = asyncHandler( async (req, res) => {

  const { maintainenceId } = req.params;
  const { status } = req.body;

  if (!(maintainenceId && status)) {
    throw new ApiError(400, "Maintainence request ID and status is required");
  }

  const maintainanceRequest = await Maintenance.findById(maintainenceId);

  if (!maintainanceRequest) {
    throw new ApiError(404, "Maintainence request not found");
  }

  const room = await Room.findById(maintainanceRequest.room)

  if (status === "resolved") {
    maintainanceRequest.resolutionDate = Date.now();
    room.status = "clean";
  } else if (status === "in-progress") {
    room.status = "maintainence";
  }
  
  maintainanceRequest.status = status;
  await maintainanceRequest.save();
  await room.save();

  return res
   .status(200)
   .json(
      new ApiResponse(
        200,
        { maintainanceRequest },
        "Maintainence request status updated successfully."
      )
    );
})

export { allMaintainenRequests, requestForMaintainence, updateStatus };
