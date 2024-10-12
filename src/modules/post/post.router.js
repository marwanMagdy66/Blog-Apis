import { Router } from "express";
import * as postController from "./post.controller.js";
import * as postSchema from "./post.schema.js";
import { validation } from "../../middleware/validation.js";
import { isAuth } from "../../middleware/authentication.js";
import { fileUpload } from "../../utils/fileUploader.js";
const router = Router();

router.post(
  "/create",
  isAuth,
  fileUpload().single("image"),
  validation(postSchema.createPost),
  postController.createPost
);

//update post
router.patch(
  "/update/:id",
  isAuth,
  fileUpload().single("image"),
  validation(postSchema.updatePost),
  postController.updatePost
);

//delete post
router.delete(
  "/delete/:id",
  isAuth,
  validation(postSchema.deletePost),
  postController.deletePost
);

//get user posts
router.get("/userPosts", isAuth, postController.getUserPosts);

//get all posts
router.get("/allPosts", postController.getAllPosts);

//get  post
validation(postSchema.deletePost),
  router.get("/:id", validation(postSchema.getPost), postController.getPost);

export default router;
