import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: { type: Number, default: 10 },
});

const userModel = mongoose.model("user", schema);

export { userModel };
