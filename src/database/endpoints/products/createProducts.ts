import { products } from "../../../database";
import { db } from "../../knex";
import express, { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
    try {
      const { id, name, price, description, image_url } = req.body;
  
      const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: image_url
      }
  
      await db("products").insert(newProduct)
  
      const productById = products.findIndex((product) => product.id === id);
  
      if (productById >= 0) {
        res.statusCode = 400;
        throw new Error("Id já cadastrado, favor enserir um novo 'id'!");
      }
  
      res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Erro desconhecido.");
      }
    }
  }