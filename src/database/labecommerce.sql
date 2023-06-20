-- Active: 1687227888951@@127.0.0.1@3306

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
