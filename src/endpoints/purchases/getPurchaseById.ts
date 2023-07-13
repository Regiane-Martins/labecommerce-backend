import { db } from "../../database/knex";
import { TPurchase } from "../../types";
import express, { Request, Response } from "express";

export const getPurchaseById = async (req: Request, res: Response) => {
    try {
      const idGet = req.params.id
  
  
      const [resultPurchase] = await db("purchases")
        .select(
          "purchases.id as purchaseId",
          "purchases.buyer as purchaseBuyer",
          "users.name as buyerName",
          "users.email as buyerEmail",
          "purchases.total_price",
          "purchases.created_at",
  
        )
        .innerJoin("users", "purchases.buyer", "=", "users.id").where("purchases.id", "=", idGet)
  
      if (resultPurchase.length === 0) {
        res.statusCode = 404;
        throw new Error("Compra não encontrada.");
      }
  
      const resultPurchaseProduct = await db("purchases_products").select(
        "products.id as productId",
        "products.name",
        "products.price",
        "products.description",
        "products.image_url",
        "purchases_products.quantity"
      ).innerJoin("products", "purchases_products.product_id", "products.id").where("purchases_products.purchase_id", "=", idGet)
  
  
      const result: TPurchase[] = {
        ...resultPurchase,
        products: resultPurchaseProduct
      }
  
  
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Erro desconhecido.");
      }
    }
  }