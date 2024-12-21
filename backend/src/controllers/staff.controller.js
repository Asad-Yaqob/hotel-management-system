import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { Staff } from "../models/staff.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { generateAccessAndRefreshTokens } from "./guest.controller.js";
import { COOKIE_OPTIONS } from "../constants.js";
import { Guest } from "../models/guest.model.js";

const registerStaff = asyncHandler(async (req, res) => {
  const {
    staffName,
    email,
    password,
    phoneNo,
    streetAddress,
    country,
    city,
    role,
  } = req.body;

  // Validate fields to make sure they are non-empty strings
  if (
    [
      staffName,
      email,
      password,
      phoneNo,
      streetAddress,
      country,
      city,
      role,
    ].some((field) => !field || String(field).trim() === "")
  ) {
    throw new ApiError(400, "All fields are mandatory.");
  }

  // Check if the staff already exists
  const existedStaff = await Staff.findOne({
    $or: [{ email }, { phoneNo }],
  });

  if (existedStaff) {
    throw new ApiError(400, "Staff already exists with provided credentials.");
  }

  // Handle avatar file upload
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Error while uploading the avatar.");
  }

  // Create the new staff record
  const staff = await Staff.create({
    staffName,
    email,
    password,
    phoneNo,
    streetAddress,
    country,
    city,
    avatar: avatar.url,
    role,
  });

  // Fetch the created staff without sensitive data
  const createdStaff = await Staff.findById(staff._id).select(
    "-password -refresToken -phoneNo -cnic"
  );

  if (!createdStaff) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdStaff, "Staff registered successfully"));
});


const loginStaff = asyncHandler(async (req, res) => {
  // Get data from frontend
  // Validate data, if empty
  // check if staff exists
  // check password
  // generate access token, refresh token
  // remove password,phone No, refresh token and cnic field from
  // return res

  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "Both fields are mandatory.");
  }

  const staff = await Staff.findOne({ email: email });

  if (!staff) {
    throw new ApiError(404, "No account found.");
  }

  const isPasswordCorrect = await staff.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(403, "Invalid credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    staff._id
  );

  const loggedInStaff = await Staff.findById(staff._id).select(
    "-password -refreshToken -cnic -phoneNo"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        { data: loggedInStaff, accessToken, refreshToken },
        "Staff Loggen In Successfully"
      )
    );
});

const logoutStaff = asyncHandler(async (req, res) => {
  await Staff.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("access_token", COOKIE_OPTIONS)
    .clearCookie("refresh_token", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const storedRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!storedRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      storedRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    let user = await Guest.findById(decodedToken._id);

    if (!user) {
      user = await Staff.findById(decodedToken._id);
    }

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (storedRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword && newPassword)) {
    throw new ApiError(400, "Fields canot be empty");
  }

  const user = await Staff.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const changeAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  await deleteFromCloudinary(req.user?.avatar);

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar.");
  }

  const user = await Staff.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken -cnic -phoneNo");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar changes successfully."));
});

const changeDetails = asyncHandler(async (req, res) => {
  const {
    staffName,
    email,
    phoneNo,
    streetAddress,
    country,
    city,
  } = req.body;

  // Validate input
  if (!(staffName && email && phoneNo  && streetAddress && country && city)) {
    throw new ApiError(400, "All fields are mandatory.");
  }


  // Update user details
  const user = await Staff.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        staffName,
        email,
        phoneNo,
        streetAddress,
        country,
        city,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken -cnic -phoneNo");


  if (!user) {
    throw new ApiError(400, "Something went wrong.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully."));
});

export {
  registerStaff,
  loginStaff,
  logoutStaff,
  refreshAccessToken,
  changeCurrentPassword,
  changeAvatar,
  changeDetails,
};
