import { getUserById, updateUser } from "../services/users.js";
import createHttpError from "http-errors";
import { env } from "../utils/env.js";

async function getUserByIdController(req, res, next) {
  const { userId } = req.params;

  const user = await getUserById(userId);

  if (user === null) {
    return next(createHttpError(404, "User not found"));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
}

async function updateUserController(req, res, next) {
  const { userId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    waterRate: req.body.waterRate,
    photo: photoUrl,
  };

  const updatedUser = await updateUser(userId, user);

  if (!updatedUser) {
    next(createHttpError(404, "User not found"));
    return;
  }

  res.status(200).send({
    status: 200,
    message: "User successfully patched!",
    data: updatedUser,
  });
}

export { getUserByIdController, updateUserController };
