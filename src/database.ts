import { TUser, TProducts } from "./types";

// const fulano: TUser={
//     id: "1",
//     name: "Fulano",
//     email: "rfulano@email.com",
//     password: "fulano123",
//     createdAt: new Date().toISOString()
// }


// const beltrana: TUser = {
//     id: "u002",
//     name: "Beltrana",
//     email: "beltrana@email.com",
//     password: "beltrana00",
//     createdAt: new Date().toISOString()
// }

// const mouseGamer: TProducts ={
//     id: "prod001",
//     name: "Mouse gamer",
//     price: 250,
//     description: "Melhor mouse do mercado!",
//     imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
// }

// const monitor: TProducts = {
//     id: "prod002",
//     name: "Monitor",
//     price: 900,
//     description: "Monitor LED Full HD 24 polegadas",
//     imageUrl: "https://picsum.photos/seed/Monitor/400"
// }

// console.table([fulano, beltrana, mouseGamer, monitor])

const users: TUser[]=[
    {
        id: "1",
        name: "Fulano",
        email: "rfulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString()
    }

]

const products: TProducts[] =[
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },

    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
]


export function createUser (id: string, name: string, email: string, password: string){
    const newUser: TUser ={
        id,
        name,
        email,
        password,
        createdAt:new Date().toISOString()
    }

   users.push(newUser)
}
createUser("4", "Regiane", "regiane@gmail.com", "1235")

console.log("Cadastro realizado com sucesso")

export function getAllUsers(){
    const showUser = users.map((item)=> item)
    console.log(showUser) 
    
}

getAllUsers()

export function createProduct(id: string, name: string, price: number, description: string,imageUrl: string){
    const newProduct: TProducts={
        id,
        name,
        price,
        description,
        imageUrl
    } 

    products.push(newProduct)
}

createProduct("4","iphone", 2500, "13 pro", "sem imagem" )

console.log("Produto criado com sucesso");


export function getAllProducts(){
    const showProducts = products.map((item)=> item)
    console.log(showProducts)
}

getAllProducts()


export function searchProductsByName(name: string){
    const searchProduct = products.filter((product)=> product.name.toLowerCase().includes(name.toLowerCase()))
    console.log(searchProduct)
}

searchProductsByName("gamer")
