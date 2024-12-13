import { Schema, model } from "mongoose";

const roomSchema = new Schema(
  {
    roomNo: { type: Number, required: true },
    roomType: { type: String, enum: ["Standard", "Deluxe"] },
    capacity: { type: Number, required: true },
    price: { type: String, required: true },
    amenities: [{ type: String, required: true }],
    availability: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    status: {
      type: String,
      enum: ["clean", "dirty", "out-of-sirvice", "maintainence"],
      default: "clean",
    },
    description: { type: String, required: true },
    image: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);

export const Room = model("Room", roomSchema);
