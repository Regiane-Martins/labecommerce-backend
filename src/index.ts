import {
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
} from "./database.js";
import express, { Request, Response } from "express";
import { users, products } from "./database";
import { TProducts, TUser } from "./types";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// endpoitn test

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

//Get All Users

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

//Get All Products

app.get("/products", (req: Request, res: Response) => {
  const { name } = req.query;
  let productFilter = [];
  if (name) {
    const filterName = name.toString().toLowerCase();
    productFilter = products.filter((product) =>
      product.name.toLowerCase().includes(filterName)
    );
  } else {
    productFilter = products;
  }

  res.status(200).send(productFilter);
});

// create user

app.post("/users", (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;

  const newUser: TUser = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).send("Cadastro realizado com sucesso!");
  console.log(users);
});

// create products

app.post("/products", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
});

//Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const userById = users.findIndex((user) => user.id === id);

  users.splice(userById, 1);

  console.log(users);

  res.status(200).send("User apagado com sucesso!");
});


//Delete Product by id

app.delete("/products/:id", (req: Request, res: Response)=>{
    const {id} = req.params
    const productById = products.findIndex((product) => product.id === id);

  products.splice(productById, 1);

  console.log(products);

  res.status(200).send("Product apagado com sucesso!");
})

//Edit Product by id

app.put("/products/:id", (req: Request, res: Response)=>{
    const {id} = req.params

    const newId = req.body.id as string
    const newName = req.body.name as string
    const newPrice = req.body.price as number
    const newDescription = req.body.description as string
    const newImage = req.body.imageUrl as string

    const productById = products.findIndex((product) => product.id === id);

    products[productById].id = newId
    products[productById].name = newName
    products[productById].price = newPrice
    products[productById].description = newDescription
    products[productById].imageUrl = newImage

    console.log(products)

    res.status(200).send("Produto atualizado com sucesso")


})