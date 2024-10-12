import { model, Schema } from "mongoose";

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    isActive: {type:Boolean,default:false},
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
