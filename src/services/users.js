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

    if (user.email) {
      const emailInUse = await UserCollection.findOne({ email: user.email });

      if (emailInUse)
        throw createHttpError("Attention! This email is already in use");

      const updatedUserWithPassAndEmail = {
        password: encryptedPassword,
        email: user.email,
        ...updatedUser,
      };

      return UserCollection.findOneAndUpdate(
        { _id: userId },
        updatedUserWithPassAndEmail,
        {
          new: true,
        }
      );
    }

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

  if (user.email) {
    const emailInUse = await UserCollection.findOne({ email: user.email });

    if (emailInUse)
      throw createHttpError("Attention! This email is already in use");

    const updatedUserWithEmail = {
      email: user.email,
      ...updatedUser,
    };

    return UserCollection.findOneAndUpdate(
      { _id: userId },
      updatedUserWithEmail,
      {
        new: true,
      }
    );
  }

  return UserCollection.findOneAndUpdate({ _id: userId }, updatedUser, {
    new: true,
  });
}
