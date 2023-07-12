import express, { Request, Response } from "express";
import { getAllUsers } from "./database/endpoints/users/getAllUsers";
import cors from "cors";
import { getAllProducts } from "./database/endpoints/products/getAllProducts";
import { createUser } from "./database/endpoints/users/createUser";
import { createProduct } from "./database/endpoints/products/createProducts";
import { createPurchase } from "./database/endpoints/purchases/createPurchase";
import { deletePurchaseById } from "./database/endpoints/purchases/deletePurchaseById";
import { editProductsById } from "./database/endpoints/products/editProductsById";
import { getPurchaseById } from "./database/endpoints/purchases/getPurchaseById";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// Ping
app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});


app.get('/users', getAllUsers)
app.post('/users', createUser)
app.get('/products', getAllProducts)
app.post('/products', createProduct)
app.post('/purchases', createPurchase)
app.delete('/purchases/:id', deletePurchaseById)
app.put('/products/:id', editProductsById)
app.get('/purchases/:id', getPurchaseById)



