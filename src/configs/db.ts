import mongoose from "mongoose";

export async function connectDb() {
  const db_url = process.env.DB_URL!;
  try {
    console.log("Connecting to mongo!");
    await mongoose.connect(db_url);
    console.log("Mongo connected!");
  } catch (e) {
    throw new Error("Something went wrong\n" + e);
  }
}
