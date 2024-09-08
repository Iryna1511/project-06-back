import { Router } from "express";

import {
  getUserWaterConsumptionByMonthController,
  addWaterConsumptionController,
  updateWaterConsumptionByIdController,
  deleteWaterConsumptionByIdController,
  getWaterConsumptionByDayController,
} from "../controllers/water.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../middlewares/validateBody.js";

import { addWaterSchema, updateWaterSchema } from "../validation/water.js";

const router = Router();

router.use(authenticate);

router.get(
  "/water/month",
  ctrlWrapper(getUserWaterConsumptionByMonthController)
);

router.get("/water/day", ctrlWrapper(getWaterConsumptionByDayController));

router.post(
  "/water",
  validateBody(addWaterSchema),
  ctrlWrapper(addWaterConsumptionController)
);

router.patch(
  "/water/:id",
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterConsumptionByIdController)
);

router.delete("/water/:id", ctrlWrapper(deleteWaterConsumptionByIdController));

export default router;
