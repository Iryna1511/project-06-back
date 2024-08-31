import { UserCollection } from "../db/models/users.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export async function getUserById(userId) {
  const user = await UserCollection.findById(userId);
  return user;
}

export async function updateUser(userId, user) {
  const checkedUser = await UserCollection.findOne({ _id: userId });
  if (checkedUser === null) throw createHttpError(404, "User not found");

  const updatedUser = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    waterRate: user.waterRate,
  };

  if (user.password && user.newPassword) {
    const isEqualPassword = await bcrypt.compare(
      user.password,
      checkedUser.password
    );

    if (isEqualPassword === false) throw createHttpError(401, "Wrong password");

    const encryptedPassword = await bcrypt.hash(user.newPassword, 10);

    const updatedUserWithPass = {
      password: encryptedPassword,
      ...updatedUser,
    };

    return UserCollection.findOneAndUpdate(
      { _id: userId },
      updatedUserWithPass,
      {
        new: true,
      }
    );
  }

  return UserCollection.findOneAndUpdate({ _id: userId }, updatedUser, {
    new: true,
  });
}
