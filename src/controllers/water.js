import {
  getUserWaterConsumptionByDay,
  createWater,
  updateWater,
  deleteWater,
} from "../services/water.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import createHttpError from "http-errors";
import { calculateWaterConsumptionTotal } from "../utils/calculateWaterConsumptionTotal.js";

// Отримання інформації про споживання води користувачем за певний день
export const getUserWaterConsumptionByDayController = async (
  req,
  res,
  next
) => {
  const userId = req.user_id;

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const { date } = req.query;

  if (!date) {
    return next(createHttpError(400, "Date query parameter is required"));
  }

  const water = await getUserWaterConsumptionByDay({
    userId,
    date,
    sortBy,
    sortOrder,
  });

  // Перевірка наявності даних про споживання води
  if (water.data.length === 0) {
    res.status(200).json({
      status: 200,
      message: `There are no water entries for ${date}.`,
      water,
    });

    next(createHttpError(404, "Water entries not found."));
    return;
  }

  const waterConsumptionTotal = calculateWaterConsumptionTotal(water.data);

  res.status(200).json({
    status: 200,
    message: `Successfully fetched water consumption for the day ${date}`,
    waterConsumptionTotal,
    water,
  });
};

export const createWaterController = async (req, res) => {
  const userId = req.user._id;

  const water = await createWater({ ...req.body }, userId);

  res
    .status(201)
    .json({
      status: 201,
      message: "Successfully created water entry.",
      data: water,
    });
};

export const patchWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await updateWater(id, userId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, "Entry of water not found"));
    return;
  }

  res
    .status(200)
    .json({
      status: 200,
      message: "Successfully patched an entry of Water!",
      data: result.water,
    });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const water = await deleteWater(id, userId);

  if (!water) {
    next(createHttpError(404, "Water entry not found."));
    return;
  }

  res.status(204).send();
};

export const getUserWaterConsumptionByMonthController = async (
  req,
  res,
  next
) => {};
