import { Router } from "express";
import {
  loginUser,
  createUser,
  logoutUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/signin", loginUser);
router.post("/signup", createUser);
router.get("/signout", logoutUser);

export default router;
