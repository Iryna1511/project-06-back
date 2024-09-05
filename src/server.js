import express from "express";
import pino from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";
import { TEMP_UPLOAD_DIR } from "./constants/index.js";
import totalRouter from "./routes/index.js";

const PORT = Number(env("PORT", 3000));

export default function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: "pino-pretty",
  //     },
  //   })
  // );

  app.use("/uploads", express.static(TEMP_UPLOAD_DIR));
  app.use("/api-docs", swaggerDocs());

  app.use(totalRouter);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
