import { Router } from "express";

import waterRouter from "./water.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(waterRouter);

export default router;
