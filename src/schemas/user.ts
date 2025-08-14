import mongoose, { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  tokens: number;
  _id: Types.ObjectId;
}

const schema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("user", schema);

export { userModel };
