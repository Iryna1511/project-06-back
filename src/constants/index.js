import path from "node:path";

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

export const ONE_HOUR = 60 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const CLOUDINARY = {
  CLOUD_NAME: "CLOUD_NAME",
  API_KEY: "API_KEY",
  API_SECRET: "API_SECRET",
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), "tmp");

export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");

export const MAX_WATER_CONSUMPTION = 5000;
