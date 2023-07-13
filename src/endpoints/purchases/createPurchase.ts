import { db } from "../../database/knex";
import { TPurchaseProduct, isProductsPurchase } from "../../types";
import express, { Request, Response } from "express";


export const createPurchase = async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body

        if (typeof id !== 'string') {
            res.statusCode = 400
            throw new Error("id precisa ser uma string válida.")
        }

        if (typeof buyer !== 'string') {
            res.statusCode = 400
            throw new Error("buyer precisa ser uma string válida.")
        }

        if (!isProductsPurchase(products)) {
            res.statusCode = 400
            throw new Error("products precisa ser um array de produtos.")
        }

        const newRequest = {
            id: id,
            buyer: buyer,
            total_price: await calculateTotalPrice(products)
        }

        await db("purchases").insert(newRequest)

        for (const product of products) {
            await db("purchases_products").insert({
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            })
        }

        res.status(200).send({message:"Pedido realizado com sucesso."})
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Erro desconhecido.");
        }
    }

    async function calculateTotalPrice(products: TPurchaseProduct[]): Promise<number> {
        return Promise.all(products.map(async (current) => {
            try {
                const price = await getProductPrice(current.id);

                return price * current.quantity
            } catch (error) {
                console.log(`Erro ao obter o preço do produto ${current.id}`);
                return 0;
            }
        })).then((prices) => {
            return prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
        });
    }}

    async function getProductPrice(id: string): Promise<number> {
        const result = await db("products").where({ id });

        if (result.length === 0 || typeof result[0].price !== 'number') {
            throw new Error("Invalid product or product price not found");
        }

        return result[0].price as number;
    }