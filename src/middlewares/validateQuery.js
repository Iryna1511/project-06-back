import createHttpError from "http-errors";

const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.query, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, err.message);
    next(error);
  }
};

export default validateQuery;
