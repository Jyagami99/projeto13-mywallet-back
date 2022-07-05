import { db } from "../db/database.js";

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).send("Token não encontrado");
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send("Sessão não encontrada");
    }

    const user = await db.collection("users").findOne({ _idd: session.userId });
    if (!user) {
      return res.status(401).send("Usuário não encontrado!");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

export default validateUser;
