import { Interaction } from "../../../DB/models/Interaction.js";
import { Post } from "../../../DB/models/post.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { DeleteLikesAndComments, UpdateLikesAndComments } from "./interaction.service.js";

//create react
export const createReact = asyncHandler(async (req, res, next) => {
  let { likes, comments, postId } = req.body; // change 'const' to 'let'

  const post = await Post.findById(postId);
  if (!post) return next(new Error("Post not found"));

  // Check if the user has already reacted to this post
  const existingReact = await Interaction.findOne({
    postId: post._id,
    createdBy: req.user._id,
  });

  // If the user has already liked the post, set 'likes' to false
  if (existingReact && likes && existingReact.likes === true) {
    likes = false; // now it will correctly set 'likes' to false
  }

  console.log(likes); // This will now show the updated value of 'likes'

  const React = await Interaction.create({
    likes,
    comments,
    postId: post._id,
    createdBy: req.user._id,
  });

  await UpdateLikesAndComments(post, likes, comments);
  return res.status(201).json({ message: "React created successfully" });
});

// update react
export const updateReact = asyncHandler(async (req, res, next) => {
  const { comments, postId } = req.body;
  const { id } = req.params;
  const post = await Post.findById(postId);
  if (!post) return next(new Error("Post not found"));

  const React = await Interaction.findById(id);
  if (!React) return next(new Error("React not found"));

  if (React.createdBy.toString() !== req.user._id.toString())
    return next(new Error("You are not the owner of this react"));

  const updatedReact = await Interaction.findByIdAndUpdate(
    id,
    {
      comments,
    },
    { new: true }
  );
  return res.json({ success: true, message: "React updated successfully" });
});

// delete react

export const deleteReact = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const React = await Interaction.findById(id);
  if (!React) return next(new Error("React not found"));
  const post = await Post.findById(React.postId);
  if (!post) return next(new Error("Post not found"));

  if (
    req.user._id.toString() !== React.createdBy.toString() &&
    req.user._id.toString() !== post.user.toString()
  ) {
    console.log(React.createdBy.toString());
    console.log(req.user._id.toString());

    return next(new Error("You are not the owner of this react"));
  }
  await React.deleteOne();
  await DeleteLikesAndComments(post, React);

  return res.json({ success: true, message: "React deleted successfully" });
});
