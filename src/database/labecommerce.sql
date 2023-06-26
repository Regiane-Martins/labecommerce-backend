-- Active: 1687773676465@@127.0.0.1@3306

-- criando tabela users

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

-- inserindo dados na tabela users

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        "a005",
        "Regiane",
        "regiane@email.com",
        "12345",
        "2023-06-19"
    ), (
        "a010",
        "Elvis",
        "elvis@email.com",
        "45678",
        "2023-06-19"
    ), (
        "a015",
        "Miguel",
        "miguel@email.com",
        "56748",
        "2023-06-19"
    );

-- criando tabela de produtos

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

    -- inserino dados na tabela produtcs
    INSERT INTO products (id, name, price, description, image_url)
    VALUES
    ("p003", "Iphone", 2000, "13 Pro", "a pesquisar"),
    ("p006", "Nike", 400, "Air Force", "a pesquisar"),
    ("p010", "Xbox", 1600, "Series S", "a pesquisar"),
    ("p0021", "Lg", 3000, "Tv 50'", "a pesquisar"),
    ("p016", "Nike", 390, "Jordan", "a pesquisar");

    -- retornando todos os usuarios

    SELECT * FROM users;

    -- retornando todos os produtos ADD

    SELECT * FROM products;
 
 -- retornar produtos por termo expeficico

 SELECT * FROM products
 WHERE name LIKE '%nike';

 -- inserindo mais pessoas em users

 INSERT INTO users(id, name, email, password, created_at)
 VALUES 
 ('a017', 'Graça', 'graca@email.com', 'graca234', '2023-06-26');

 INSERT INTO products(id, name, price, description, image_url)
 VALUES 
 ('p030', 'Tv', 3000, 'Lg 55', 'a inserir');

 -- deletando por id

 DELETE FROM users
 WHERE id = "u001";

 DELETE FROM products
 WHERE id = "p010";


 -- editando por id