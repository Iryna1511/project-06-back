import { Router } from "express";

import {
  getUserWaterConsumptionByDayController,
  getUserWaterConsumptionByMonthController,
  createWaterController,
  patchWaterController,
  deleteWaterController,
} from "../controllers/water.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { createWaterSchema, updateWaterSchema } from "../validation/water.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/water/daily", ctrlWrapper(getUserWaterConsumptionByDayController));
router.get(
  "/water/monthly",
  ctrlWrapper(getUserWaterConsumptionByMonthController)
);
router.post(
  "/water",
  validateBody(createWaterSchema),
  ctrlWrapper(createWaterController)
);
router.patch(
  "/water/:id",
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(patchWaterController)
);
router.delete("/water/:id", isValidId, ctrlWrapper(deleteWaterController));

export default router;
