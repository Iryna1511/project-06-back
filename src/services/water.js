import { WaterCollection } from "../db/models/water.js";
import createHttpError from "http-errors";

export const getUserWaterConsumptionByMonth = async ({ user, month }) => {
  const { startDate, endDate } = getMonthDateRange(month);

  const waterCalendarRows = await WaterCollection.find({
    user_id: user._id,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  if (!waterCalendarRows.length) {
    return {};
  }

  const groupedByDay = waterCalendarRows.reduce((acc, row) => {
    const date = formatDate(row.date);

    if (acc[date]) {
      acc[date].waterConsumption += row.waterVolume ?? 0;
      acc[date].waterConsumptionCount += 1;
    } else {
      acc[date] = {
        date,
        waterConsumption: row.waterVolume ?? 0,
        waterConsumptionCount: 1,
      };
    }

    return acc;
  }, {});

  return Object.keys(groupedByDay).reduce((result, key) => {
    result[key] = {
      date: key,
      dateNorm: millilitersToLiters(user.waterRate),
      waterConsumptionPercentage: Math.round(
        (groupedByDay[key].waterConsumption / user.waterRate) * 100
      ),
      waterConsumptionCount: groupedByDay[key].waterConsumptionCount,
    };
    return result;
  }, {});
};

export const addWaterConsumption = async ({ user, date, waterVolume }) => {
  const newWaterEntry = {
    user_id: user._id,
    date: new Date(date).toISOString(),
    waterVolume: waterVolume,
  };

  return await WaterCollection.create(newWaterEntry);
};

export const updateWaterConsumptionById = async ({ id, waterVolume, date }) => {
  const existingEntry = await WaterCollection.findOne({
    _id: id,
  });

  if (!existingEntry) {
    throw createHttpError(404, "Water consumption entry not found!");
  }

  const updatedEntry = await WaterCollection.findOneAndUpdate(
    { _id: id },
    {
      $set: { waterVolume, date: new Date(date).toISOString() },
    },
    { returnDocument: "after" }
  );

  return updatedEntry;
};

export const deleteWaterConsumptionById = async ({ id }) => {
  const existingEntry = await WaterCollection.findOne({
    _id: id,
  });

  if (!existingEntry) {
    throw createHttpError(404, "Water consumption not found.");
  }

  const deleteResult = await WaterCollection.deleteOne({ _id: id });
  if (deleteResult.deletedCount === 0) {
    throw createHttpError(500, "Failed to delete the water consumption.");
  }
};

export const getWaterConsumptionByDay = async (user, date) => {
  const requestedDate = new Date(date);

  const startOfDay = requestedDate.toISOString().split("T")[0];
  const endOfDay = new Date(requestedDate.setDate(requestedDate.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const waterEntries = await WaterCollection.find({
    user_id: user._id,
    date: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  if (!waterEntries.length) {
    return {
      waterConsumptionPercentage: 0,
      waterEntries: [],
    };
  }

  const totalWaterConsumption = waterEntries.reduce((total, entry) => {
    return total + (entry.waterVolume || 0);
  }, 0);

  const waterConsumptionPercentage = Math.round(
    (totalWaterConsumption / user.waterRate) * 100
  );

  return {
    waterConsumptionPercentage,
    waterEntries,
  };
};

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  return `${day}, ${month}`;
}

function millilitersToLiters(ml) {
  return ml / 1000;
}

function getMonthDateRange(monthString) {
  const [year, month] = monthString.split("-").map(Number);

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const startDateFormatted = startDate.toISOString().split("T")[0];
  const endDateFormatted = endDate.toISOString().split("T")[0];

  return { startDate: startDateFormatted, endDate: endDateFormatted };
}
