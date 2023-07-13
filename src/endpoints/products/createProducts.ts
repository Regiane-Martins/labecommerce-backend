
import express, { Request, Response } from "express";
import { db } from "../../database/knex";


export const createProduct = async (req: Request, res: Response) => {
    try {
      const { id, name, price, description, image_url } = req.body;
      if (
        id === undefined ||
        name === undefined ||
        price === undefined ||
        description === undefined ||
        image_url === undefined
      ) {
        res.status(400);
        throw new Error(
          "Insira todas as informções necessárias: id, name, price, description e imagem!"
        );
      }

      const [product] = await db("products").where({ id: id })
      if (product) {
        res.status(400)
        throw new Error("'Id'já cadastrado");
      }
  
      const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url
      }
  
      await db("products").insert(newProduct)
  
      res.status(201).send({message:"Produto cadastrado com sucesso!"});
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Erro desconhecido.");
      }
    }
  }