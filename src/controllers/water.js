import {
  getUserWaterConsumtionByMonth,
  addWaterConsumption,
  updateWaterConsumptionById,
  deleteWaterConsumptionById,
  getWaterConsumptionByDay,
} from "../services/water.js";

export const getUserWaterConsumtionByMonthController = async (req, res) => {
  const data = await getUserWaterConsumtionByMonth({
    user: req.user,
    month: req.query.month,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully fetched water consumption for the month!",
    data,
  });
};

export const addWaterConsumptionController = async (req, res) => {
  const { date, waterVolume } = req.body;

  const new_water_consumption = await addWaterConsumption({
    user: req.user,
    date,
    waterVolume,
  });

  res.status(201).json({
    status: 201,
    message: "Successfully added water consumption!",
    data: new_water_consumption,
  });
};

export const updateWaterConsumptionByIdController = async (req, res) => {
  const { id } = req.params;
  const { waterVolume, date } = req.body;

  const updatedEntry = await updateWaterConsumptionById({
    id,
    waterVolume,
    date,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully updated water consumption!",
    data: updatedEntry,
  });
};

export const deleteWaterConsumptionByIdController = async (req, res) => {
  const { id } = req.params;

  await deleteWaterConsumptionById({
    id,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully deleted water consumption entry!",
  });
};

export const getWaterConsumptionByDayController = async (req, res) => {
  const { day } = req.query;

  const data = await getWaterConsumptionByDay(req.user, day);

  res.status(200).json({
    status: 200,
    message: `Successfully fetched water consumption for ${day}!`,
    data,
  });
};
