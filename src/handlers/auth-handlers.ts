import { Context } from "koa";
import { badRequest, ERROR_CODES } from "../middlewares/error-middleware";
import { userModel } from "../schemas/user";

interface ILogin {
  email: string;
  password: string;
}

const signinHandler = async (ctx: Context) => {
  const body = ctx.request.body as ILogin;
  const { email, password } = body;

  if (!email || !password) {
    throw badRequest(ERROR_CODES.BAD_INPUT);
  }

  const user = await userModel.findOne({ email, password });

  if (!user) {
    throw badRequest(ERROR_CODES.BAD_REQUEST, "Email ou senha incorretos.");
  }

  return ctx;
};

export default {
  signinHandler,
};
