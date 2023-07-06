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
import { db } from "./database/knex"

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

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users`)
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Usuário não localizado!");
  }
});

//Get All Products

app.get("/products", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    console.log(name)

    if (name === undefined || name === "") {
      const result = await db.raw(`SELECT * FROM products`)

      res.status(200).send(result)
    } else {
      const result = await db.raw(`
        SELECT * FROM products
        WHERE name LIKE '%${name}%'
      `)

      res.status(200).send(result);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
});


// Get Product By Id

app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("Íd' deve ser em formato de texto!")
      }
      if (id.length < 1) {
        res.statusCode = 400;
        throw new Error("'Id' deve conter mais de um carater!")
      }
      const [product] = await db.raw(`
       SELECT * FROM products
       WHERE id = "${id}"
      `
      )
      if (!product) {
        res.statusCode = 404
        throw new Error("'id' não encontrada")
      }
    }

  } catch (error) {

  }
})

// create user

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password} = req.body;

    const newUser = await db.raw(`
    INSERT INTO users (id, name, email, password)
    VALUES
    ("${id}", "${name}", "${email}", "${password}")
    `)

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

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, image_url } = req.body;

    const newProduct = await db.raw(`
      INSERT INTO products (id, name, price, description, image_url)
      VALUES
      ("${id}","${name}", "${price}", "${description}", "${image_url}")
    `)

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

// Create Purchase

app.post('/purchases', async (req: Request, res: Response)=>{
  try {
    const {id, buyer, total_price} = req.body

    const newCompra = await db.raw(`
    INSERT INTO purchases
    VALUES
    ("${id}","${buyer}", "${total_price}")
    
    `)
    const productById = products.findIndex((product) => product.id === id);
    if (productById >= 0) {
      res.statusCode = 400;
      throw new Error("Id já cadastrado, favor enserir um novo 'id'!");
    }
    products.push(newCompra);
    res.status(200).send("Pedido realizado com sucesso.")

  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
})

//Delete User by id

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userById = users.findIndex((user) => user.id === id);
    if (userById !== undefined) {
      if (userById < 0) {
        res.statusCode = 400
        throw new Error("Usuário não encontrado!")
      }
    }

    users.splice(userById, 1);

    console.log(users);

    res.status(200).send("User apagado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.status(500).send("Erro desconhecido.")
    }
  }

});

//Delete Product by id

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productById = products.findIndex((product) => product.id === id);
    if (productById !== undefined) {
      if (productById < 0) {
        res.statusCode = 400
        throw new Error("Produto não encontrado!")
      }
    }

    products.splice(productById, 1);

    console.log(products);

    res.status(200).send("Produto exluido com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
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
    if (productById !== undefined) {
      if (productById < 0) {
        res.statusCode = 400
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
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.status(500).send("Erro desconhecido.")
    }
  }
  ;
});
