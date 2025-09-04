import { Context, Next } from "koa";

import { ERROR_CODES, tooManyRequests } from "../utils/errors";

import { IJwtClaims } from "../utils/jwt";

import cacheService from "../services/cache-service";
import cacheUtils from "../utils/cache";

export const checkUserTokens = async (ctx: Context) => {
  const user: IJwtClaims = ctx.state.user;

  const key = cacheUtils.mountUserTokenKey(user._id.toString());
  const tokens = await cacheService.getCacheValue<number>(key);

  if (tokens <= 0) {
    throw tooManyRequests(ERROR_CODES.TOO_MANY_REQUESTS, "Insuficient tokens.");
  }
};
