import { Schema, model } from "mongoose";

const maintainenceSchema = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    status: {
      type: String,
      enum: ["reported", "in-progress", "resolved"],
      default: "reported",
    },
    description: { type: String, required: true },
    reportedBy: {
      type: Schema.Types.ObjectId,
      refPath: "reportedByRole", 
    },
    reportedByRole: {
      type: String,
      enum: ["Staff", "Guest"],
      required: true,
    },
    reportedDate: { type: Date, default: Date.now },
    resolutionDate: { type: Date },
  },
  { timestamps: true }
);



export const Maintenance = model("Maintenance", maintainenceSchema);

