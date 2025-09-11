import mongoose from "mongoose";
import { populateUsers } from "./seed";
import { ENV } from "./env";

export async function connectDb() {
  const db_url = ENV.DB_URL!;
  try {
    console.log("Connecting to mongo!");
    await mongoose.connect(db_url);
    console.log("Mongo connected!");
    await populateUsers();
  } catch (e) {
    throw new Error("Something went wrong\n" + e);
  }
}
