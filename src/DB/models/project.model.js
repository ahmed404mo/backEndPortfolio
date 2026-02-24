import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    techStack: {
      type: [String],
      required: true,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    githubLink: {
      type: String,
      required: false,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    liveLink: {
      type: String,
      required: false,
      minLength: 2,
      maxLength: 25,
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
