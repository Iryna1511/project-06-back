import { getUserById } from "../services/users.js";
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

export { getUserByIdController };
