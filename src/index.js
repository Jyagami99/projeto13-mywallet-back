import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";

async function main() {
  dotenv.config();

  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(authRouter);

  const PORT = process.env.PORT || 3333;

  server.listen(PORT, () => {
    console.log(`O servidor subiu na porta ${PORT}`);
  });
}

main().catch(console.error);
