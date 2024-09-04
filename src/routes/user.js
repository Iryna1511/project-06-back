import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/user.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { updateUserSchema } from "../validation/userSchema.js";

const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);

router.get("/user", ctrlWrapper(getUserController));

router.patch(
  "/user",
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController)
);

export default router;
