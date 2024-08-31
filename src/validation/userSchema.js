import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().allow("").max(32).messages({
    "string.base": "Name must be a string",
    "string.max": "Name must be at most {#limit} characters",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string().min(8).max(64).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least {#limit} characters",
    "string.max": "Password must be at most {#limit} characters",
    "string.empty": "Password cannot be empty",
  }),
  newPassword: Joi.string().min(8).max(64).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least {#limit} characters",
    "string.max": "Password must be at most {#limit} characters",
    "string.empty": "Password cannot be empty",
  }),
  gender: Joi.string().valid("male", "female").messages({
    "string.base": "Gender must be a string",
    "any.only": "Gender must be one of [male, female]",
    "string.empty": "Gender cannot be empty",
  }),
  waterRate: Joi.number().min(1).max(15000).messages({
    "number.min": "WaterRate must be at least {#limit} ml",
    "number.max": "WaterRate must be at most {#limit} ml",
    "number.base": "WaterRate must be a number",
    "number.empty": "WaterRate cannot be empty",
  }),
});
