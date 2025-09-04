import koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import setupRoutes from "./routes/index";
import { connectDb } from "./configs/db";
import { errorMiddleware } from "./middlewares/error-middleware";
import { ENV } from "./configs/env";
import { connectCache } from "./configs/cache";

async function startServer() {
  const port = ENV.PORT;
  const app = new koa();
  await Promise.all([connectDb(), connectCache()]);

  app.use(
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(errorMiddleware);
  app.use(bodyParser());

  app.use(setupRoutes.routes());

  app.listen(port, () => console.log(`API Running on port ${port}`));
}

startServer();
