import { db } from "../../knex";
import express, { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await db("users")
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Usuário não localizado!");
    }
  }