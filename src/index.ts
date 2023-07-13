import express, { Request, Response } from "express";
import { getAllUsers } from "./endpoints/users/getAllUsers";
import cors from "cors";
import { getAllProducts } from "./endpoints/products/getAllProducts";
import { createUser } from "./endpoints/users/createUser";
import { createProduct } from "./endpoints/products/createProducts";
import { createPurchase } from "./endpoints/purchases/createPurchase";
import { deletePurchaseById } from "./endpoints/purchases/deletePurchaseById";
import { editProductsById } from "./endpoints/products/editProductsById";
import { getPurchaseById } from "./endpoints/purchases/getPurchaseById";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get('/users', getAllUsers)
app.post('/users', createUser)
app.get('/products', getAllProducts)
app.post('/products', createProduct)
app.post('/purchases', createPurchase)
app.delete('/purchases/:id', deletePurchaseById)
app.put('/products/:id', editProductsById)
app.get('/purchases/:id', getPurchaseById)



