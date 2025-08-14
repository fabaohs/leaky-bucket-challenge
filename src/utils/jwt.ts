import jwt from "jsonwebtoken";
import { IUser } from "../schemas/user";
import { ENV } from "../configs/env";

const genJwt = (claims: IUser) => {
  const { _id, email, name } = claims;

  return jwt.sign(
    {
      id: String(_id),
      email,
      name,
    },
    ENV.JWT_SECRET!,
    {
      expiresIn: "1h",
      subject: String(_id),
    }
  );
};

const verifyJwt = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET!);
};

export default {
  genJwt,
  verifyJwt,
};
