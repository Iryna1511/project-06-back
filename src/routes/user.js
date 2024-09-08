import express from "express";
import {
  getUserController,
  updateUserController,
  addAvatarController,
  updateWaterRateController,
} from "../controllers/user.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import {
  updateUserSchema,
  updateWaterRateSchema,
} from "../validation/userSchema.js";
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

router.patch(
  "/user/waterRate",
  validateBody(updateWaterRateSchema),
  ctrlWrapper(updateWaterRateController)
);

export default router;
