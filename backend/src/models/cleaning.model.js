import { Schema, model } from "mongoose";

const cleaningSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    service: { type: String },
    description: { type: String },
    reportedBy: { type: Schema.Types.ObjectId, ref: "Staff" },
  },
  { timestamps: true }
);


export const Cleaning = model("Cleaning", cleaningSchema);