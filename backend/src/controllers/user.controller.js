import { Guest } from "../models/guest.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAccessAndRefreshTokens = async (guestId) => {
  const guest = await Guest.findById(guestId);
  const accessToken = guest.generateAccessToken();
  const refreshToken = guest.generateRefreshToken();

  guest.set({
    ValidityState: false,
    refreshToken,
  })

  guest.save()
};

const registerGuest = asyncHandler(async (req, res) => {
  // get data firstname, lastname, email, password
  // validate isEmpty, already exists,
  // create entry in db
  // remove password and refreshToken field  from response.
  // send response

  const { firstName, lastName, email, password } = req.body;

  if (
    // !firstName?.trim() ||
    // !lastName?.trim() ||
    // !email?.trim() ||
    // !password?.trim()
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    return new ApiError(400, "All fields are required.");
  }

  const existedGuest = await Guest.findOne({
    $or: [{ firstName }, { lastName }, { email }],
  });

  if (existedGuest) {
    return new ApiError(
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
    return new ApiError(
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

  if (!(email || password)) {
    return new ApiError(400, "Both fiels are mandatory.");
  }

  const isPasswordCorrect = await guest.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return new ApiError(403, "Invalid Credentials.");
  }

  const guest = await Guest.findOne({ email });

  if (!guest) {
    return new ApiError(404, "Guest not found.");
  }
});

export { registerGuest, loginGuest };
