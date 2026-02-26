import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";

let isConnected = false; 

export const authenticateDB = async () => {
  if (isConnected) {
    console.log("🐧 DB is already connected (Using cached connection)");
    return;
  }

  try {
    const db = await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,
      maxPoolSize: 50, 
    });

    isConnected = db.connections[0].readyState === 1;
    console.log(`🐧 DB connected successfully to: ${db.connection.name}`);

  } catch (error) {
    console.log(`❌ fail to connected on DB ${error}`);
    throw error; 
  }
}