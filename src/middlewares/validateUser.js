import { db } from "../db/database.js";

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token não encontrado");
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send("Sessão não encontrada");
    }

    res.locals.session = session;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

export default validateUser;
