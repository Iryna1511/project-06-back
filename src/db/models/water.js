import { model, Schema } from "mongoose";

const waterSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
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

export const WaterCollection = model("water", waterSchema);
