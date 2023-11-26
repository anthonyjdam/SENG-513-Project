import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  console.log(process.env.MONGO_URI || "https://localhost:8000");
  return await mongoose.connect(
    process.env.MONGO_URI || "https://localhost:8000"
  );
}
