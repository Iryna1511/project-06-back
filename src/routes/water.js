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
import validateQuery from "../middlewares/validateQuery.js";

import { addWaterSchema, updateWaterSchema } from "../validation/water.js";
import { monthSchema, daySchema } from "../validation/query.js";

const router = Router();

router.use(authenticate);

router.get(
  "/water/month",
  validateQuery(monthSchema),
  ctrlWrapper(getUserWaterConsumptionByMonthController)
);

router.get(
  "/water/day",
  validateQuery(daySchema),
  ctrlWrapper(getWaterConsumptionByDayController)
);

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
