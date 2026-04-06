import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";

export const authenticateDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Using existing MongoDB connection");
    return;
  }

  try {
    mongoose.set('bufferCommands', false); 

    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 10000,
    });
    
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Connection Fail:", error.message);
    throw error;
  }
};