import { db } from "../../knex";
import express, { Request, Response } from "express";

export const deletePurchaseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const found = await db("purchases").where({ id: id })
  
      if (found.length === 0) {
        res.statusCode = 404
        throw new Error("Compra não encontrada.")
      }
  
      await db("purchases_products").del().where({ purchase_id: id })
      await db("purchases").del().where({ id: id })
  
      res.status(200).send("Pedido cancelado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.status(500).send("Erro desconhecido.")
      }
    }
  
  }