"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = void 0;
const users = [
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
];
const products = [
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
];
function createUser(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
}
exports.createUser = createUser;
createUser("4", "Regiane", "regiane@gmail.com", "1235");
console.log("Cadastro realizado com sucesso");
function getAllUsers() {
    const showUser = users.map((item) => item);
    console.log(showUser);
}
exports.getAllUsers = getAllUsers;
getAllUsers();
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    products.push(newProduct);
}
exports.createProduct = createProduct;
createProduct("4", "iphone", 2500, "13 pro", "sem imagem");
console.log("Produto criado com sucesso");
function getAllProducts() {
    const showProducts = products.map((item) => item);
    console.log(showProducts);
}
exports.getAllProducts = getAllProducts;
getAllProducts();
function searchProductsByName(name) {
    const searchProduct = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
    console.log(searchProduct);
}
exports.searchProductsByName = searchProductsByName;
searchProductsByName("gamer");
//# sourceMappingURL=database.js.map