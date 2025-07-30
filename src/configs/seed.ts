import { userModel } from "../schemas/user";
import hashUtils from "../utils/hash";

export const populateUsers = async () => {
  try {
    const isPopulated = (await userModel.countDocuments()) > 0;

    if (!isPopulated) {
      const users = [
        new userModel({
          email: "email1@email.com",
          name: "User 1",
          password: hashUtils.hashString("pwd1"),
        }),
        new userModel({
          email: "email2@email.com",
          name: "User 2",
          password: hashUtils.hashString("pwd2"),
        }),
        new userModel({
          email: "email3@email.com",
          name: "User 3",
          password: hashUtils.hashString("pwd3"),
        }),
        new userModel({
          email: "email4@email.com",
          name: "User 4",
          password: hashUtils.hashString("pwd4"),
        }),
      ];

      await userModel.create(users);
    }
  } catch (e) {
    throw new Error("Error trying to populate w users");
  }
};
