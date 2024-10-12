import { Post } from "../../../DB/models/post.js";
import { User } from "../../../DB/models/user.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";

//create Post
export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const checkuser = await User.findById(req.user._id);
  if (!checkuser) {
    return next(new Error("User not found"));
  }
  let id, url;
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.IMAGES_FOLDER}/${title}/`,
      }
    );
    (id = public_id), (url = secure_url);
  }
  const newPost = await Post.create({
    title,
    content,
    user:req.user._id,
    image: { id, url },
  });
  return res.json({
    status: "success",
    msg: "your post added successfully",
    data: newPost,
  });
});

//update post
export const updatePost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return next(new Error("Post not found"));
  if (post.user.toString() !== req.user._id.toString())
    return next(new Error("You are not the owner of this post"));
  let id, url;
  if (req.file) {
    await cloudinary.uploader.destroy(post.image.id);

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.IMAGES_FOLDER}/${title}/`,
      }
    );
    (post.image.id = public_id), (post.image.url = secure_url);
  }
  post.content = content ? content : post.content;
  post.title = title ? title : post.title;
  await post.save();
  return res.json({ success: true, msg: "Post updated successfully" });
});

// delete post
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new Error("Post not found"));
  if (
    post.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  )
    return next(new Error("You are not the owner of this post"));
  await cloudinary.uploader.destroy(post.image.id);
  await post.deleteOne();
  return res.json({ success: true, msg: "Post deleted successfully" });
});

//get user posts
export const getUserPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("interactions");
  if (!posts) return next(new Error("No posts found"));
  return res.json({ success: true, data: posts });
});

// get all posts
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const post = await Post.find().populate("interactions");
  return res.json({ success: true, posts: { post } });
});


//get post using id
export const getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).populate("interactions");
    if (!post) return next(new Error("Post not found"));
    return res.json({ success: true, post });
})