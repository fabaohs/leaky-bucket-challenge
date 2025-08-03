import { Context, Next } from "koa";
import { AppError, ERROR_CODES, normalizedDefaultMsgs } from "../utils/errors";

export const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e) {
    // Handled error
    if (e.type && e.type === "AppError") {
      const error: AppError = e;

      const { code, message, status } = error;

      ctx.status = status;
      ctx.response.body = {
        code,
        message,
      };
      // Unexpected error
    } else {
      ctx.status = 500;
      ctx.response.body = {
        code: ERROR_CODES.INTERNAL_ERROR,
        message: normalizedDefaultMsgs[ERROR_CODES.INTERNAL_ERROR],
      };
    }
  }
};
