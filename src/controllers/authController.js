import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../db/database.js";
import { signInUserSchema, signUpUserSchema } from "../schemas/userSchema.js";

export async function createUser(req, res) {
  try {
    const user = req.body;
    const { error } = signUpUserSchema.validate(user);

    if (error) {
      return res.status(422).send("Todos os dados são obrigatorios!");
    }

    const encryptedPassword = bcrypt.hashSync(user.password, 10);

    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });
    
    res.status(201).send("Usuário criado com sucesso!");
  } catch (error) {
    console.log("Houve um problema ao cadastrar um usuário");
    res.status(500).send(error);
  }
}

export async function loginUser(req, res) {
  try {
    const user = req.body;
    const { error } = signInUserSchema.validate(user);

    if (error) {
      return res.status(422).send("Todos os dados são obrigatorios!");
    }

    const userToken = await db
      .collection("users")
      .findOne({ email: user.email });

    if (!userToken) {
      return res.status(422).send("Senha ou email incorretos!");
    }

    const decryptedPassword = bcrypt.compareSync(
      user.password,
      userToken.password
    );

    if (decryptedPassword) {
      const token = uuid();

      await db.collection("sessions").insertOne({
        token,
        userId: userToken._id,
      });
      return res.status(201).send({ token, name: userToken.name });
    }

    res.status(201).send("Logado com sucesso!");
  } catch (error) {
    console.error("Houve um problema ao logar o usuário!");
    res.status(500).send(error);
  }
}

export async function logoutUser(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.reaplace("Bearer", "");

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}
