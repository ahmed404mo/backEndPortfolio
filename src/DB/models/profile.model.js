import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName :{
      type :String,
      required:true,

    },
    jobTitle:{
            type :String,
      required:true,
    },
    cvLink:{
            type :String,
    },
    avatar: { type: String, required: false },
    cvLink: { type: String },
    bio: { type: String },        
    github: { type: String },       
    linkedin: { type: String },
    projectsCount: { type: String, default: "10+" },
    certificatesCount: { type: String, default: "5+" },
    skillsCount: { type: String, default: "15+" },
    pageMainTitle: { type: String },
    pageSubtitle: { type: String },
    missionTitle: { type: String },
    missionDescription: { type: String },
    aboutImage: { type: String },
  },
  {
    timestamps:true
  }
)

export const profileModel = mongoose.models.Profile || mongoose.model("Profile",profileSchema)