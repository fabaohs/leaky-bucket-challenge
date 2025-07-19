import Router from "@koa/router";
import authHandlers from "../handlers/auth-handlers";

const authRoutes = new Router();

authRoutes.post("/signin", authHandlers.signinHandler);

export default authRoutes;
