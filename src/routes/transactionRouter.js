import { Router } from "express";
import {
  getTransactions,
  postTransactions,
} from "../controllers/transactionController.js";
import validateUser from "../middlewares/validateUser.js";

const router = Router();
router.use(validateUser);

router.get("/transactions", getTransactions);
router.post("/transactions", postTransactions);

export default router;
