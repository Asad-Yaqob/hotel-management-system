import { Guest } from "../models/guest.model.js";
import { Staff } from "../models/staff.model.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check for a Guest user
    let user = await Guest.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If not found in Guest, check for a Staff user
    if (!user) {
      user = await Staff.findById(decodedToken?._id).select(
        "-password -refreshToken -phoneNo -cnic"
      );
    }

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user; 
    next();             
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const roleAuthorization = (allowedRoles) => {
  return async (req, _, next) => {
  
    const user = req.user; 

    // Check if the user's role is allowed
    if (!user || !allowedRoles.includes(user.role)) {
     throw new ApiError(
       403,
       "You don't have permission to perform this action"
     );
    }

    // Continue to the next middleware or route handler if authorized
    next();
  };
};

export { verifyJwt, roleAuthorization };