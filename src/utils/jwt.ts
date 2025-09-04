import jwt from "jsonwebtoken";
import { IUser } from "../schemas/user";
import { ENV } from "../configs/env";
import { Types } from "mongoose";

export interface IJwtClaims {
  _id: Types.ObjectId;
  email: string;
  name: string;
}

const genJwt = (claims: IUser) => {
  const { _id, email, name } = claims;

  return jwt.sign(
    {
      _id: String(_id),
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

const verifyJwt = (token: string): IJwtClaims | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET!) as IJwtClaims;
  } catch (error) {
    return null;
  }
};

export default {
  genJwt,
  verifyJwt,
};
