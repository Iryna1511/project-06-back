import { UsersCollection } from "../db/models/user.js";

export async function getUserById(userId) {
  const user = await UsersCollection.findById(userId);
  return user;
}
