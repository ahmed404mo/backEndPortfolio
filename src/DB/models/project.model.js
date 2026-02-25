import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
      minLength: 2,
      trim: true,
    },
    githubLink: {
      type: String,
      required: false,
    
      trim: true,
    },
    liveLink: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    collection:"project",
        timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    autoIndex: true,
  },
);

export const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
