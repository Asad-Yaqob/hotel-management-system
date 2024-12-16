import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getServices = asyncHandler(async (_, res) => {
  try {
    const services = await Service.find();

    return res
      .status(200)
      .json(new ApiResponse(200, services, "Services fetched successfully."));
  } catch (error) {
    throw new ApiError(500, "Something went wrong.");
  }
});

const addService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  if ([name, description, price].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedService = await Service.findOne({
    name,
    description,
    price,
  })

  if (existedService) {
    throw new ApiError(302,"Service already exists.")
  }

  const service = await Service.create({
    name,
    description,
    price,
  })

  return res
   .status(201)
   .json(new ApiResponse(201, service, "Service added successfully."));
});

export { getServices, addService };
