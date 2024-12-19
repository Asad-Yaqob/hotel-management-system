import { Guest } from "../models/guest.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { COOKIE_OPTIONS } from "../constants.js";
import { Staff } from "../models/staff.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    // check if it is a guest
    let user = await Guest.findById(userId);

    if (!user) {
      // if guest does not exist it means it is a staff member.
      user = await Staff.findById(userId);
    }

    if (!user) {
      throw new ApiError(
        404,
        "user not found. unable to generate accessToken and refreshToken."
      );
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const getGuests = asyncHandler(async (_, res) => {
  try {
    const guests = await Guest.find();

    return res
      .status(200)
      .json(new ApiResponse(200, guests, "Guests fetched successfully."));
  } catch (error) {
    throw new ApiError(500, "Unable to retrieve guests: " + error);
  }
});

const registerGuest = asyncHandler(async (req, res) => {
  // get data firstname, lastname, email, password
  // validate isEmpty, already exists,
  // create entry in db
  // remove password and refreshToken field  from response.
  // send response

  // console.log(req.body);

  const { firstName, lastName, email, password } = req.body;

  if (
    // !firstName?.trim() ||
    // !lastName?.trim() ||
    // !email?.trim() ||
    // !password?.trim()
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedGuest = await Guest.findOne({
    email,
  });

  if (existedGuest) {
    throw new ApiError(
      409,
      "Guest already exists with the same name and email"
    );
  }

  const guest = await Guest.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdGuest = await Guest.findById(guest._id).select(
    "-password -refreshToken"
  );

  if (!createdGuest) {
    throw new ApiError(
      500,
      "Something went wronge while creating a new guest."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdGuest, "Guets created successfully."));
});

const loginGuest = asyncHandler(async (req, res) => {
  // get data from frontend - email, password
  // validate isEmpty, isRegistered, isPasswordCorrect,
  // generate refresh and accessToken
  // return res

  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ApiError(400, "Both fiels are mandatory");
  }

  const guest = await Guest.findOne({ email });

  if (!guest) {
    throw new ApiError(404, "Guest not found.");
  }

  const isPasswordCorrect = await guest.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(403, "Invalid Credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    guest._id
  );

  const loggedInGuest = await Guest.findById(guest._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        { user: loggedInGuest, accessToken, refreshToken },
        "Guest Logged In Successfully"
      )
    );
});

const logoutGuest = asyncHandler(async (req, res) => {
  await Guest.findByIdAndUpdate(
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
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "Loged out"));
});

const loginStatus = (req, res) => {
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];

  if (accessToken || refreshToken) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { accessToken, refreshToken }, "user is present")
      );
  }

  return res.status(200).json(new ApiResponse(200, {}, "user is not present"));
};

export {
  registerGuest,
  getGuests,
  loginGuest,
  logoutGuest,
  generateAccessAndRefreshTokens,
  loginStatus,
};
