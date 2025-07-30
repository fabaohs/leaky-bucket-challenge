import { Context, Next } from "koa";

export const ERROR_CODES = {
  BAD_INPUT: "BAD_INPUT",
  BAD_REQUEST: "BAD_REQUEST",
  TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

const normalizedDefaultMsgs = {
  [ERROR_CODES.BAD_INPUT]: "Os dados fornecidos são inválidos.",
  [ERROR_CODES.BAD_REQUEST]: "A requisição enviada é inválida.",
  [ERROR_CODES.TOO_MANY_REQUESTS]:
    "Muitas tentativas realizadas. Tente novamente mais tarde",
  [ERROR_CODES.INTERNAL_ERROR]:
    "Ocorreu um erro interno no servidor. Tente novamente mais tarde",
};

export interface AppError {
  type: "AppError";
  code: string;
  message: string;
  status: number;
}

export const createError = (
  code: keyof typeof ERROR_CODES,
  status: number,
  message?: string
): AppError => ({
  type: "AppError",
  code,
  status,
  message: message ?? normalizedDefaultMsgs[code],
});

export const badRequest = (code: keyof typeof ERROR_CODES, message?: string) =>
  createError(code, 400, message);

export const internalServerError = (
  code: keyof typeof ERROR_CODES,
  message?: string
) => createError(code, 500, message);

export const tooManyRequests = (
  code: keyof typeof ERROR_CODES,
  message?: string
) => createError(code, 429, message);

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
