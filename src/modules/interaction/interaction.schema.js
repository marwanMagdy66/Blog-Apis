import joi from "joi";
import { validateId } from "../../middleware/validation.js";

export const createReact = joi
  .object({
    likes: joi.boolean().default(false),
    comments: joi.string(),
    postId: joi.string().custom(validateId).required(),
  })
  .required();

export const updateReact = joi
  .object({
    comments: joi.string(),
    postId: joi.string().custom(validateId).required(),
    id: joi.string().custom(validateId).required(),
  })
  .required();

export const deleteReact = joi
  .object({
    id: joi.string().custom(validateId).required(),
  })
  .required();
