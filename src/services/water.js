import { WaterCalendarCollection } from "../db/models/water_calendar.js";
import { SORT_ORDER } from "../constants/index.js";

// Отримання данних про споживання води користувачем за конкретний день
export const getUserWaterConsumptionByDay = async ({
  userId,
  date,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "time",
}) => {
  const startDate = new Date(date);
  const endDate = new Date(date);
  // Наступний день для визначення кінця діапазону
  endDate.setUTCDate(endDate.getUTCDate() + 1);

  const queryWaterConsumption = WaterCalendarCollection.find({
    userId,
    time: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  });

  // Виконання паралельних запитів
  const [waterCount, water] = await Promise.all([
    WaterCalendarCollection.find()
      .merge(queryWaterConsumption)
      .countDocuments(),
    queryWaterConsumption.sort({ [sortBy]: sortOrder }).exec(),
  ]);

  return {
    data: water,
    waterCount,
  };
};

// Отримання данних про споживання води користувачем за конкретний місяць
export const getUserWaterConsumptionByMonth = async ({ userId, month }) => {
  const startDate = new Date(`${month}-01T00:00:00Z`);
  const endDate = new Date(startDate);
  endDate.setUTCMonth(startDate.getUTCMonth() + 1);

  const queryWaterConsumption = WaterCalendarCollection.find({
    userId,
    time: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  });

  const [waterCount, water] = await Promise.all([
    WaterCalendarCollection.find()
      .merge(queryWaterConsumption)
      .countDocuments(),
    queryWaterConsumption.exec(),
  ]);

  return {
    data: water,
    waterCount,
  };
};

export const createWater = async (payload, userId) => {
  const water = await WaterCalendarCollection.create({ ...payload, userId });
  return water;
};

export const updateWater = async (id, userId, payload, options = {}) => {
  const rawResult = await WaterCalendarCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (id, userId) => {
  const water = await WaterCalendarCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return water;
};
