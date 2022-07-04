import joi from "joi";

export const signUpUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password"),
});

export const signInUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
