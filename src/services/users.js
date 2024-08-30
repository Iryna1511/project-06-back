import { UserCollection } from "../db/models/users.js";

export async function getUserById(userId) {
  const user = await UserCollection.findById(userId);
  return user;
}

export async function updateUser(userId, user) {
  return UserCollection.findOneAndUpdate({ _id: userId }, user, {
    new: true,
  });
}
