import express from "express";
import {
  getUserController,
  updateUserController,
  addAvatarController,
} from "../controllers/user.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { updateUserSchema } from "../validation/userSchema.js";
import upload from "../middlewares/multer.js";

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

router.patch(
  "/user/avatar",
  upload.single("avatar"),
  ctrlWrapper(addAvatarController)
);

export default router;
