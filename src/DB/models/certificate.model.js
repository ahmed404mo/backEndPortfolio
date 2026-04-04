import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true }, 
  issueDate: { type: String },
  certImage: { type: String }, 
  certLink: { type: String },  
}, { timestamps: true });

export const certificateModel = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);