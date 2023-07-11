import express, { Request, Response } from "express";
import { users, products } from "./database";
import cors from "cors";
import { db } from "./database/knex"
import { TPurchaseProduct, isProductsPurchase } from "./types";

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


// Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users")
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Usuário não localizado!");
  }
});

//Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name === undefined || name === "") {
      const result = await db("products")

      res.status(200).send(result)
    } else {
      const result = await db("products").where("name", "LIKE", `%${name}%`)
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


// Create User
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password
    }

    await db("users").insert(newUser)

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

    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
});

// Create Products
app.post("/products", async (req: Request, res: Response) => {
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
});

// Create Purchase

app.post('/purchases', async (req: Request, res: Response) => {
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

    res.status(200).send("Pedido realizado com sucesso.")
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Erro desconhecido.");
    }
  }
})

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
}

async function getProductPrice(id: string): Promise<number> {
  const result = await db("products").where({ id });

  if (result.length === 0 || typeof result[0].price !== 'number') {
    throw new Error("Invalid product or product price not found");
  }

  return result[0].price as number;
}

// Delete Purchases By id
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const found = await db("purchases").where({ id: id })

    if (found.length === 0) {
      res.statusCode = 404
      throw new Error("Compra não encontrada.")
    }

    await db("purchases_products").del().where({ purchase_id: id })
    await db("purchases").del().where({ id: id })

    res.status(200).send("Pedido cancelado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.status(500).send("Erro desconhecido.")
    }
  }

});

// Edit Product By id
app.put("/products/:id", async (req: Request, res: Response) => {
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
});

// Get Purchase By Id
app.get('/purchases/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const found = await db("purchases").where({ id: id })

    if (found.length === 0) {
      res.statusCode = 404
      throw new Error("Compra não encontrada.")
    }

    res.status(200).send(found[0])
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.status(500).send("Erro desconhecido.")
    }
  }
})
