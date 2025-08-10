import koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import setupRoutes from "./routes/index";
import dotenv from "dotenv";
import { connectDb } from "./configs/db";
import { errorMiddleware } from "./middlewares/error-middleware";

dotenv.config();

async function startServer() {
  const port = process.env.PORT || 5000;
  const app = new koa();
  await connectDb();

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
