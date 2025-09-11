import mongoose, { Types } from "mongoose";
import { createClient } from "redis";
import { ENV } from "../configs/env";

import cacheUtils from "../utils/cache";

export interface IUser {
  name: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
}

const schema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

schema.post("save", async (doc) => {
  const redisClient = createClient({
    url: ENV.REDIS_URL,
    database: 0,
  });

  await redisClient.connect();
  const _id = doc._id;
  const cacheKey = cacheUtils.mountUserTokenKey(_id.toString());
  await redisClient.set(cacheKey, 10);
});

const userModel = mongoose.model("user", schema);

export { userModel };
