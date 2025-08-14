import { createClient } from "redis";
import { ENV } from "../configs/env";

const redisClient = createClient({
  url: ENV.REDIS_URL,
  database: 0,
});

export const connectCache = async () => {
  try {
    console.log("Connecting to Redis...");
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    throw new Error("Failed to connect to Redis");
  }
};

export default redisClient;
