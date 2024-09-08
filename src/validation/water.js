import Joi from "joi";

export const addWaterSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.base": "Date must be a string",
      "string.pattern.base": "Date should be in the format YYYY-MM-DDTHH:MM:SS",
      "string.empty": "Date cannot be empty",
      "any.required": "Date is required",
    }),
  waterVolume: Joi.number().integer().min(50).max(5000).required().messages({
    "number.base": "waterVolume should be a number",
    "number.integer": "waterVolume should be an integer",
    "number.min": "waterVolume should be at least {#limit}",
    "number.max": "waterVolume should be at most {#limit}",
    "any.required": "waterVolume is required",
  }),
});

export const updateWaterSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)
    .messages({
      "string.base": "Date must be a string",
      "string.pattern.base": "Date should be in the format YYYY-MM-DDTHH:MM:SS",
      "string.empty": "Date cannot be empty",
    }),
  waterVolume: Joi.number().integer().min(50).max(5000).messages({
    "number.base": "waterVolume should be a number",
    "number.integer": "waterVolume should be an integer",
    "number.min": "waterVolume should be at least {#limit}",
    "number.max": "waterVolume should be at most {#limit}",
  }),
});
