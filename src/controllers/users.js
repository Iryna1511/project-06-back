import { getUserById, updateUser } from "../services/users.js";
import createHttpError from "http-errors";

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

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    newPassword: req.body.newPassword,
    gender: req.body.gender,
    waterRate: req.body.waterRate,
  };

  const updatedUser = await updateUser(userId, user);

  res.status(200).send({
    status: 200,
    message: "User successfully patched!",
    data: updatedUser,
  });
}

export { getUserByIdController, updateUserController };
