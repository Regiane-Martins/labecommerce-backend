
import express, { Request, Response } from "express";
import { db } from "../../database/knex";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (
      id === undefined ||
      name === undefined ||
      email === undefined ||
      password === undefined
    ) {
      res.status(400);
      throw new Error(
        "Insira todas as informções necessárias: id, name, email and password!"
      );
    }


    const [user] = await db("users").where({ id: id })
    if (user) {
      res.status(400)
      throw new Error("'Id'já cadastrado");
    }
    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password
    }

    await db("users").insert(newUser)

    res.status(201).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
}