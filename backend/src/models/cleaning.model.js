import { Schema, model } from "mongoose";

const cleaningSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
    description: { type: String, required: true },
    reportedBy: { type: Schema.Types.ObjectId, ref: "Staff" },
    scheduledDate: { type: Date, required: true },
  },
  { timestamps: true }
);


export const Cleaning = model("Cleaning", cleaningSchema);