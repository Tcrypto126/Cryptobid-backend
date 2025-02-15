import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Connected to database.");
  } catch (error: any) {
    console.error(error.message);
  }
})();