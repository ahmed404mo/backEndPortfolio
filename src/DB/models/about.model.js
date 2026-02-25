import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
      default: "Behind the Systems",
    },
    pageSubtitle: {
      type: String,
      default: "Engineering high-performance solutions with modern stacks",
    },
    missionTitle: {
      type: String,
      default: "Technical Vision",
    },
    missionDescription: {
      type: String,
      default: "I am a Full-Stack Developer specializing in the MERN stack...",
    },
    principles: [
      {
        iconName: String, 
        title: String,
        description: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

export const aboutModel = mongoose.models.About || mongoose.model("About", aboutSchema);