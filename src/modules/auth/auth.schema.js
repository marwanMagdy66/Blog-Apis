import joi from "joi";

export const register = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    role: joi.string().required().valid("user", "admin"),
  })
  .required();

export const activate = joi
  .object({
    token: joi.string().required(),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
