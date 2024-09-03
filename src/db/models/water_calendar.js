import { model, Schema } from "mongoose";

const waterCalendarSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    waterVolume: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const WaterCalendarCollection = model(
  "water_calendar",
  waterCalendarSchema
);
