"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fulano = {
    id: "1",
    name: "Fulano",
    email: "rfulano@email.com",
    password: "fulano123",
    createdAt: new Date().toISOString()
};
const beltrana = {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@email.com",
    password: "beltrana00",
    createdAt: new Date().toISOString()
};
const mouseGamer = {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
};
const monitor = {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400"
};
console.table([fulano, beltrana, mouseGamer, monitor]);
//# sourceMappingURL=database.js.map