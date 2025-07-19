import authRoutes from "./auth";
import Router from "@koa/router";

function setupRoutes() {
  const router = new Router();
  router.get("/", (ctx) => (ctx.body = { message: "API is running" }));
  router.use("/auth", authRoutes.routes());

  return router;
}

export default setupRoutes();
