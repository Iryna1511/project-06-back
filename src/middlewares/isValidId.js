import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw createHttpError(404, "ID is not valid");
  }

  next();
};

export default isValidId;
