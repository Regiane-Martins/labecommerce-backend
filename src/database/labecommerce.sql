-- Active: 1687978565703@@127.0.0.1@1433

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
 UPDATE products
 SET description = 'Se'
 WHERE id = 'p003';

 --- criando tabela purchases

 CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
 );

 -- inserindo pedidos

 INSERT INTO purchases(id, buyer, total_price, created_at)
VALUES
('001', 'a005', 500, '2023-06-26'),
('002', 'a005', 700, '2023-06-26'),
('003', 'a010', 100, '2023-06-26'),
('004', 'a015', 50, '2023-06-26');

-- alterando preço total do pedido

UPDATE purchases
 SET total_price = 3000
 WHERE id = '003';

 -- exebindo resultados da compra

 SELECT 
 users.id AS usersId,
 name,
 email,
 purchases.id AS purchasesId,
 total_price,
 purchases.created_at
 FROM users
 INNER JOIN purchases
 ON purchases.buyer = users.id;


-- criando tabela de relações de produtos e usuarios

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- simulando compras

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('001', 'p003', 2),
('002', 'p010', 1),
('003', 'p016', 2);

-- consultando com as tabelas do purchases_products

SELECT
purchases.id AS purchasesID,
purchases.buyer AS purchasesBuyer,
purchases.total_price AS purchasesTotalPrice,
purchases.created_at,
products.id AS productsId,
products.name,
products.price AS productsPrice,
products.description AS productsDescription,
purchases_products.product_id AS purchasesProductsId,
purchases_products.purchase_id AS purchasesProductsPurchaseId,
purchases_products.quantity
FROM purchases_products
INNER JOIN products
ON products.id = purchases_products.product_id
INNER JOIN purchases
ON purchases.id = purchases_products.purchase_id;



