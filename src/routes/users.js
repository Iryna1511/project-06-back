import express from "express";
import {
  getUserByIdController,
  updateUserController,
} from "../controllers/users.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import { updateUserSchema } from "../validation/userSchema.js";

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get("/user", ctrlWrapper(getUserByIdController));

router.patch(
  "/user",
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController)
);

export default router;
