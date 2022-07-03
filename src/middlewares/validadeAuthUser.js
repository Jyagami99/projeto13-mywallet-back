import { signInUserSchema, signUpUserSchema } from "../schemas/userSchema.js";

export function validateSignIn(req, res, next) {
  const user = req.body;
  const { error } = signInUserSchema.validate(user);

  if (error) {
    return res.sendStatus(422);
  }

  next();
}

export function validateSignUp(req, res, next) {
  const user = req.body;
  const { error } = signUpUserSchema.validate(user);

  if (error) {
    return res.sendStatus(422);
  }

  next();
}
