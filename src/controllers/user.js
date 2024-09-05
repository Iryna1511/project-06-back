import { updateUser, addAvatar } from "../services/user.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";

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

async function addAvatarController(req, res, next) {
  const photo = req.file;
  console.log(photo);

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const avatar = {
    avatar: photoUrl,
  };

  const newAvatar = await addAvatar(req.user._id, avatar);

  res.status(201).send({
    status: 201,
    message: "Avatar added successfully",
    data: newAvatar,
  });
}

export { getUserController, updateUserController, addAvatarController };
