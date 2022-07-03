import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../db/database.js";
import { signInUserSchema, signUpUserSchema } from "../schemas/userSchema.js";

export async function createUser(req, res) {
  try {
    const user = req.body;
    const { error } = signInUserSchema.validate(user);

    if (error) {
      return res.sendStatus(422);
    }

    const encryptedPassword = bcrypt.hashSync(user.password, 10);

    await db
      .collection("users")
      .insertOne({ ...user, password: encryptedPassword });
    res.status(201).send("Usuário criado com sucesso");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function loginUser(req, res) {
  try {
    const user = req.body;
    const { error } = signUpUserSchema.validate(user);

    if (error) {
      return res.sendStatus(422);
    }

    const userToken = await db
      .collection("users")
      .findOne({ email: user.email });

    if (user && bcrypt.compareSync(user.password, userToken.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        token,
        userId: user._id,
      });
      return res.status(201).send({ token });
    } else {
      return res.status(401).send("Senha ou email incorretos!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
