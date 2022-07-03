import joi from "joi";

export const signInUserSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password')
});

export const signUpUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
