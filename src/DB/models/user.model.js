import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true,
      minLength: 2,
      maxLength: 25,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 2,
      trim: true,
    },
  },
  {
    collection: "Admin",
    timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    autoIndex: true,
    // toJSON:{virtuals:true},
    // toObject:{virtuals:true}
  },
);

export const UserModel =
  mongoose.models.Users || mongoose.model("User", userSchema);
