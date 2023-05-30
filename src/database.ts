import { TUsers, TProducts } from "./types";

const fulano: TUsers={
    id: "1",
    name: "Fulano",
    email: "rfulano@email.com",
    password: "fulano123",
    createdAt: new Date().toISOString()
}


const beltrana: TUsers = {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@email.com",
    password: "beltrana00",
    createdAt: new Date().toISOString()
}

const mouseGamer: TProducts ={
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
}

const monitor: TProducts = {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400"
}

console.table([fulano, beltrana, mouseGamer, monitor])