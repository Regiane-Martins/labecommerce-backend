"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send("pong");
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    const { name } = req.query;
    let productFilter = [];
    if (name) {
        const filterName = name.toString().toLowerCase();
        productFilter = database_1.products.filter((product) => product.name.toLowerCase().includes(filterName));
    }
    else {
        productFilter = database_1.products;
    }
    res.status(200).send(productFilter);
});
app.post('/users', (req, res) => {
    const { id, name, email, password } = req.body;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso!");
    console.log(database_1.users);
});
app.post('/products', (req, res) => {
    const { id, name, price, description, imageUrl } = req.body;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
});
//# sourceMappingURL=index.js.map