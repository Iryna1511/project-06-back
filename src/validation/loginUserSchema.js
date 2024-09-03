import Joi from "joi";

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .message({
      "string.email": "Email must be a valid email",
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .message({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must be at most 64 characters",
    })
    .required(),
});

export default loginUserSchema;
