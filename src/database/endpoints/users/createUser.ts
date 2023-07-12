import { users } from "../../../database";
import { db } from "../../knex";
import express, { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
      const { id, name, email, password } = req.body;
  
      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password
      }
  
      await db("users").insert(newUser)
  
      const userById = users.findIndex((user) => user.id === id);
  
      if (userById >= 0) {
        res.statusCode = 400;
        throw new Error("Id já cadastrado, favor criar novo 'Id'!");
      }
  
      const existingEmail = users.find((user) => user.email === email);
  
      if (existingEmail !== undefined) {
        if (existingEmail) {
          res.statusCode = 400;
          throw new Error("E-mail já cadastrado, favor inserir e-mail válido!");
        }
      }
  
      res.status(201).send("Cadastro realizado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Erro desconhecido.");
      }
    }
  }