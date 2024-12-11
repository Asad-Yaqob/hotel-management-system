import asyncHandler from "../utils/asyncHandler.js";

import { Staff } from "../models/staff.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateAccessAndRefreshTokens } from "./guest.controller.js";
import { COOKIE_OPTIONS } from "../constants.js";

const registerStaff = asyncHandler(async (req, res) => {
  // Get data from frontend
  // Validate data, if empty
  // check if staff exists
  // check avatar image, isEmpty
  // upload image to cloudinary
  //  create user object - create entry in db
  // remove password,phone No,refresh token and cnic field from response
  // check for user creation
  // return res

  const {
    staffName,
    email,
    password,
    phoneNo,
    cnic,
    streetAddress,
    country,
    city,
    role,
  } = req.body;

  if (
    [
      staffName,
      email,
      password,
      phoneNo,
      cnic,
      streetAddress,
      country,
      city,
      role,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are mandatory.");
  }

  const existedStaff = await Staff.findOne({
    $or: [{ email }, { phoneNo }, { cnic }],
  });

  if (existedStaff) {
    throw new ApiError(400, "Staff already exists with provided credentials.");
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Error while uploading the avatar.");
  }

  const staff = await Staff.create({
    staffName,
    email,
    password,
    phoneNo,
    cnic,
    streetAddress,
    country,
    city,
    avatar: avatar.url,
    role,
  });

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

export { registerStaff, loginStaff, logoutStaff };
