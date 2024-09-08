import { model, Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      default: "female",
    },
    waterRate: {
      type: Number,
      required: true,
      default: 1500,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

usersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

export const UserCollection = model("users", usersSchema);
