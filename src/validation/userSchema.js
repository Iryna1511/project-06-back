import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least {#limit} characters",
    "string.max": "Name must be at most {#limit} characters",
    "string.empty": "Name cannot be empty",
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
  oldPassword: Joi.string().min(8).max(64).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least {#limit} characters",
    "string.max": "Password must be at most {#limit} characters",
    "string.empty": "Password cannot be empty",
  }),
  sex: Joi.string().valid("male", "female").messages({
    "string.base": "sex must be a string",
    "any.only": 'sex must be one of ["male", "female"]',
    "string.empty": "sex cannot be empty",
  }),
  dayWaterGoal: Joi.number().min(1).max(15000).messages({
    "number.min": "dayWaterGoal must be at least {#limit} ml",
    "number.max": "dayWaterGoal must be at most {#limit} ml",
    "number.base": "dayWaterGoal must be a number",
    "number.empty": "dayWaterGoal cannot be empty",
  }),
});
