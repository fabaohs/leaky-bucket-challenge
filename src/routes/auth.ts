import Router from "@koa/router";
import authHandlers from "../handlers/auth-handlers";
import { authMiddleware } from "../middlewares/auth-middleware";

const authRoutes = new Router();

authRoutes.post("/signin", authHandlers.signinHandler);

authRoutes.get("/me", authMiddleware, (ctx) => {
  ctx.response.body = ctx.state.user;
  return ctx;
});

export default authRoutes;
