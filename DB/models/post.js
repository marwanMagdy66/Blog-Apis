import { model, Schema } from "mongoose";

const postSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      id: { type: String },
      url: { type: String },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
    
  }
);

postSchema.virtual("interactions", {
  ref: "Interaction",
  localField: "_id",
  foreignField: "postId",
});

export const Post = model("Post", postSchema);
