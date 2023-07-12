import { db } from "../../knex";
import express, { Request, Response } from "express";

export const editProductsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const newId = req.body.id as string;
      const newName = req.body.name as string;
      const newPrice = req.body.price as number;
      const newDescription = req.body.description as string;
      const newImage = req.body.imageUrl as string;
  
      const [product] = await db("products").where({ id: id })
      if (product) {
        const updateProduct = {
          id: newId || product.id,
          name: newName || product.name,
          price: newPrice || product.price,
          description: newDescription || product.description,
          image_url: newImage || product.image_url
        }
  
        await db("products").update(updateProduct).where({ id: id })
      } else {
        res.status(404)
        throw new Error("'id' não encontrada")
      }
  
      res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.status(500).send("Erro desconhecido.")
      }
    }
    ;
  }