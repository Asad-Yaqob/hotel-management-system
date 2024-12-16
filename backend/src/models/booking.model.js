import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    additionalServices: { type: Schema.Types.ObjectId, ref: "Service" },
  },
  { timestamps: true }
);

export const Booking = model("Booking", bookingSchema);
