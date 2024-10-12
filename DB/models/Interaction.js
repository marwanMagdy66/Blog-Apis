import { model, Schema ,Types} from "mongoose";

const InteractionSchema = new Schema(
  {
    likes: { type: Boolean,default:false},
    comments: { type: String },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    postId: { type: Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);
export const Interaction=model("Interaction",InteractionSchema)