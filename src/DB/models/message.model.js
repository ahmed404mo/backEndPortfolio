import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
            minLength: 2,
      maxLength: 25,
      trim: true,
    },
    email:{
      type:String,
      required:true,
            minLength: 2,
      maxLength: 25,
      trim: true,
    },
    message:{
      type:String,
      required:true,
            minLength: 2,
      trim: true,
      // default:Date.now
    },

  },
  {
    collection:"message",
        timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    autoIndex: true,
  }
)

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
