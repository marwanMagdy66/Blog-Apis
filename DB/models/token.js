import { model, Schema } from "mongoose";

const tokenSchema = Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isValid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Token = model("Token", tokenSchema);
