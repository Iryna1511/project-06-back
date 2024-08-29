import express from "express";
import { getUserByIdController } from "../controllers/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/users/:userId", isValidId, ctrlWrapper(getUserByIdController));

export default router;
