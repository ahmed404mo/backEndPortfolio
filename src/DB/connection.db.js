import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";

let isConnected = false; 

export const authenticateDB = async () => {
  if (isConnected) return;

  try {
    mongoose.set('bufferCommands', false); 

    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 10000,
    });
    
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Connection Fail:", error.message);
    throw error;
  }
};