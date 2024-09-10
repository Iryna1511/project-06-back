import Joi from "joi";

export const monthSchema = Joi.object({
  month: Joi.string()
    .pattern(/^\d{4}-\d{2}$/)
    .required()
    .messages({
      "string.base": "Month must be a string",
      "string.pattern.base": "Month should be in the format YYYY-MM",
      "string.empty": "Month cannot be empty",
      "any.required": "Month is required",
    }),
});

export const daySchema = Joi.object({
  day: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.base": "Day must be a string",
      "string.pattern.base": "Day should be in the format YYYY-MM-DD",
      "string.empty": "Day cannot be empty",
      "any.required": "Day is required",
    }),
});
