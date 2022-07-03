import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";

const router = Router();
router.use(validateUser);

router.get("/transactions");
router.post("/transactions");

export default router;
