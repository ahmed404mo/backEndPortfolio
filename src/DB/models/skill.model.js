import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name :{
      type :String,
      required:true,

    },
    icon:{
            type :String,
      required:true,
    },
    level:{
            type :Number,
            min:0,
            max:100,
    },
  
    category: { 
    type: String, 
    required: true, 
    enum: ["technical", "educational"], // عشان نضمن إنك تختار واحد من الاتنين بس
    default: "technical" 
  },
  },
  {
    timestamps:true
  }
)

export const skillModel = mongoose.models.Skill || mongoose.model("Skill",skillSchema)