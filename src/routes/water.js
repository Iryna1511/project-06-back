import { Router } from "express";

import {
  getUserWaterConsumtionByMonthController,
  addWaterConsumptionController,
  updateWaterConsumptionByIdController,
  deleteWaterConsumptionByIdController,
  getWaterConsumptionByDayController,
} from "../controllers/water.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get(
  "/water/month",
  ctrlWrapper(getUserWaterConsumtionByMonthController)
);

router.get("/water/day", ctrlWrapper(getWaterConsumptionByDayController));

router.post("/water", ctrlWrapper(addWaterConsumptionController));

router.patch("/water/:id", ctrlWrapper(updateWaterConsumptionByIdController));

router.delete("/water/:id", ctrlWrapper(deleteWaterConsumptionByIdController));

export default router;
