import { db } from "../../knex";
import express, { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
  
      if (name === undefined || name === "") {
        const result = await db("products")
  
        res.status(200).send(result)
      } else {
        const result = await db("products").where("name", "LIKE", `%${name}%`)
        res.status(200).send(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Erro desconhecido.");
      }
    }
  }