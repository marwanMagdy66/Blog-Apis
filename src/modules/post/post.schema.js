import joi from "joi";
import { validateId } from "../../middleware/validation.js";

export const createPost = joi
  .object({
    title: joi.string().required().min(5),
    content: joi.string().required().min(10),
  })
  .required();

export const updatePost = joi
  .object({
    title: joi.string().min(5),
    content: joi.string().min(10),
    id: joi.string().required().custom(validateId),
  })
  .required();

export const deletePost = joi
  .object({
    id: joi.string().required().custom(validateId),
  })
  .required();

export const getPost = joi
  .object({
    id: joi.string().required().custom(validateId),
  })
  .required();
