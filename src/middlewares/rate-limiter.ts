import { Context, Next } from "koa";

import {
  ERROR_CODES,
  internalServerError,
  tooManyRequests,
} from "../utils/errors";

import { IJwtClaims } from "../utils/jwt";

import cacheService from "../services/cache-service";
import cacheUtils from "../utils/cache";
import bucketService from "../services/bucket-service";

export const rateLimiter = async (ctx: Context, next: Next) => {
  const user: IJwtClaims = ctx.state.user;

  const key = cacheUtils.mountUserTokenKey(user._id.toString());
  const tokens = await cacheService.getCacheValue<number>(key);

  if (tokens <= 0) {
    throw tooManyRequests(ERROR_CODES.TOO_MANY_REQUESTS, "Insuficient tokens.");
  }

  await bucketService.consumeToken(user._id.toString());

  try {
    await next();
    await cacheService.increaseTokens(key);
  } catch (error) {
    throw internalServerError(ERROR_CODES.INTERNAL_ERROR);
  }
};
