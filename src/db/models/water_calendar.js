import { model, Schema } from "mongoose";

const waterCalendarSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    waterAmount: {
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
