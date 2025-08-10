import jwt from "jsonwebtoken";
import { IUser } from "../schemas/user";

const genJwt = (claims: IUser) => {
  const { _id, email, name } = claims;

  return jwt.sign(
    {
      id: String(_id),
      email,
      name,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
      subject: String(_id),
    }
  );
};

const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export default {
  genJwt,
  verifyJwt,
};
