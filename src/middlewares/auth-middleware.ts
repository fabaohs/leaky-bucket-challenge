import { Context, Next } from "koa";
import { ERROR_CODES, unauthorized } from "../utils/errors";

import jwtUtils from "../utils/jwt";

export const authMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers?.authorization;
  if (!token) {
    throw unauthorized(ERROR_CODES.UNAUTHORIZED);
  }

  const tokenPayload = jwtUtils.verifyJwt(token.split(" ")[1]);

  if (!tokenPayload) {
    throw unauthorized(ERROR_CODES.UNAUTHORIZED);
  }

  ctx.state.user = tokenPayload;

  await next();
};
