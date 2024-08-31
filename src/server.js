import express from "express";
import pino from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

const PORT = Number(env("PORT", 3000));

export default function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.use("/api-docs", swaggerDocs());

  app.use(authRouter);
  app.use(usersRouter);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
