import { updateUser, addAvatar } from "../services/user.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";
import createHttpError from "http-errors";

async function getUserController(req, res, next) {
  res.status(200).send({
    status: 200,
    message: `Successfully found user with id ${req.user._id}!`,
    data: req.user,
  });
}

async function updateUserController(req, res, next) {
  if (JSON.stringify(req.body) === JSON.stringify({}))
    throw createHttpError(400, "Data was not received");

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    newPassword: req.body.newPassword,
    gender: req.body.gender,
    waterRate: req.body.waterRate,
  };

  const updatedUser = await updateUser(req.user._id, user);

  res.status(200).send({
    status: 200,
    message: "User successfully patched!",
    data: updatedUser,
  });
}

async function addAvatarController(req, res, next) {
  const photo = req.file;

  if (photo === undefined)
    throw createHttpError(400, "Avatar was not received");

  let avatarUrl;

  if (photo) {
    avatarUrl = await saveFileToCloudinary(photo);
  }

  const avatar = {
    avatar: avatarUrl,
  };

  const userWithAvatar = await addAvatar(req.user._id, avatar);

  res.status(201).send({
    status: 201,
    message: "Avatar added successfully",
    data: userWithAvatar,
  });
}

export { getUserController, updateUserController, addAvatarController };
