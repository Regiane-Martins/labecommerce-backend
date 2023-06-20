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
  try {
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Usuário não localizado!");
  }
});

//Get All Products

app.get("/products", (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let productFilter = [];

    if (name !== undefined) {
      if (name !== "string") {
        res.statusCode = 400;
        throw new Error("Nome deve ser uma string!");
      }
      if (name.length < 1) {
        res.statusCode = 400;
        throw new Error("Nome deve ter mais de um caracter.");
      }
    }
    if (name) {
      const filterName = name.toString().toLowerCase();
      productFilter = products.filter((product) =>
        product.name.toLowerCase().includes(filterName)
      );
    } else {
      productFilter = products;
    }

    res.status(200).send(productFilter);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
});

// create user

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const userById = users.findIndex((user) => user.id === id);

    if (userById >= 0) {
      res.statusCode = 400;
      throw new Error("Id já cadastrado, favor criar novo 'Id'!");
    }

    const existingEmail = users.find((user) => user.email === email);

    if (existingEmail !== undefined) {
      if (existingEmail) {
        res.statusCode = 400;
        throw new Error("E-mail já cadastrado, favor inserir e-mail válido!");
      }
    }

    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
});

// create products

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    const productById = products.findIndex((product) => product.id === id);
    if (productById >= 0) {
      res.statusCode = 400;
      throw new Error("Id já cadastrado, favor enserir um novo 'id'!");
    }

    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
});

//Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  const userById = users.findIndex((user) => user.id === id);
  if(userById !== undefined){
    if(userById < 0){
      res.statusCode=400
      throw new Error("Usuário não encontrado!")
    }
  }

  users.splice(userById, 1);

  console.log(users);

  res.status(200).send("User apagado com sucesso!");
  } catch (error) {
    if(error instanceof Error){
      res.send(error.message)
  }else{
      res.status(500).send("Erro desconhecido.")
  }
  }
  
});

//Delete Product by id

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  const productById = products.findIndex((product) => product.id === id);
  if(productById !== undefined){
    if(productById < 0){
      res.statusCode=400
      throw new Error("Produto não encontrado!")
    }
  }

  products.splice(productById, 1);

  console.log(products);

  res.status(200).send("Produto exluido com sucesso!");
  } catch (error) {
    if(error instanceof Error){
      res.send(error.message)
  }else{
      res.status(500).send("Erro desconhecido.")
  }
  }
  
});

//Edit Product by id

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

  const newId = req.body.id as string;
  const newName = req.body.name as string;
  const newPrice = req.body.price as number;
  const newDescription = req.body.description as string;
  const newImage = req.body.imageUrl as string;

  const productById = products.findIndex((product) => product.id === id);
  if(productById !== undefined){
    if(productById < 0){
      res.statusCode=400
      throw new Error("Produto não encontrado, favor verificar dados!")
    }
  }

  products[productById].id = newId;
  products[productById].name = newName;
  products[productById].price = newPrice;
  products[productById].description = newDescription;
  products[productById].imageUrl = newImage;

  console.log(products);

  res.status(200).send("Produto atualizado com sucesso")
  } catch (error) {
    if(error instanceof Error){
      res.send(error.message)
  }else{
      res.status(500).send("Erro desconhecido.")
  }
  }
  ;
});
