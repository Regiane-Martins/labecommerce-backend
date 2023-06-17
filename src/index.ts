import {createUser, getAllUsers,createProduct, getAllProducts} from "./database.js"
import express, { Request, Response } from 'express'
import {users, products} from "./database"
import { TProducts, TUser } from "./types"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// endpoitn test

app.get('/ping', (req: Request, res: Response)=>{
    res.send("pong")
})

//Get All Users

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
})

//Get All Products

app.get('/products', (req: Request, res: Response)=>{
    const {name}= req.query
    let productFilter = []
    if (name){
        const filterName = name.toString().toLowerCase()
        productFilter = products.filter((product)=> product.name.toLowerCase().includes(filterName))
    }else{
        productFilter = products
    }

    res.status(200).send(productFilter)
})


// create user

app.post('/users', (req: Request, res: Response)=>{
    const {id, name, email, password} = req.body

    const newUser: TUser = {
        id, 
        name,
        email,
        password, 
        createdAt:new Date().toISOString()
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
    console.log(users)
})

// create products

app.post('/products', (req: Request, res: Response)=>{
    const {id, name, price, description, imageUrl} = req.body

    const newProduct: TProducts ={
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})