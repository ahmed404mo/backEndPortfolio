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
    avatar:{
            type :String,
      required:true,
    },
    cvLink:{
            type :String,
    }
  },
  {
    timestamps:true
  }
)

export const profileModel = mongoose.models.Profile || mongoose.model("Profile",profileSchema)