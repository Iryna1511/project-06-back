import { updateUser } from "../services/user.js";

async function getUserController(req, res, next) {
  res.status(200).send({
    status: 200,
    message: `Successfully found user with id ${req.user._id}!`,
    data: req.user,
  });
}

async function updateUserController(req, res, next) {
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

export { getUserController, updateUserController };
