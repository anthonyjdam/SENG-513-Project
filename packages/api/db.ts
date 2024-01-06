import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  return await mongoose.connect(
    process.env.MONGO_URI || "https://localhost:8000"
  );
}
