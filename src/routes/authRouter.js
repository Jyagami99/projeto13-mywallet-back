import { Router } from "express";
import { loginUser, createUser } from "../controllers/authController.js";
import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/validadeAuthUser.js";

const router = Router();

router.post("/signin", validateSignIn, loginUser);
router.post("/signup", validateSignUp, createUser);

export default router;
