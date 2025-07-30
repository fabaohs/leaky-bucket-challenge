import { Context } from "koa";
import { badRequest, ERROR_CODES } from "../middlewares/error-middleware";
import { userModel } from "../schemas/user";
import hashUtils from "../utils/hash";

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

  const user = await userModel.findOne({ email });

  if (!user) {
    throw badRequest(ERROR_CODES.BAD_REQUEST, "Email incorreto.");
  }

  const isSamePwd = hashUtils.compareString(password, user.password);

  if (!isSamePwd) {
    throw badRequest(ERROR_CODES.BAD_REQUEST, "Senha incorreta.");
  }

  return ctx;
};

export default {
  signinHandler,
};
