import koa from "koa";
import setupRoutes from "./routes/index";
import dotenv from "dotenv";
import { connectDb } from "./configs/db";

dotenv.config();

async function startServer() {
  const app = new koa();

  const port = process.env.PORT || 5000;

  await connectDb();

  app.use(setupRoutes.routes());
  app.use(setupRoutes.allowedMethods());

  app.listen(port, () => console.log(`API Running on port ${port}`));
}

startServer();
