import { Router } from "express";
import { loginUser, createUser } from "../controllers/authController";

const router = Router();

router.post("/signin", loginUser);
router.post("/signup", createUser);

export default router;
