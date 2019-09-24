DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE products;

CREATE TABLE products (
item_id INTEGER NOT NULL,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10, 2),
stock_quantity INTEGER,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4 Pro", "Electronics", 399.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dualshock 4", "Electronics", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Louisville Slugger", "Sports", 33.47, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Franklin Batting Gloves", "Sports", 24.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batting Tee", "Sports", 18.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eloquent JavaScript", "Books", 39.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Road", "Books", 12.80, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Maker", "Home", 24.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon Toaster", "Home", 22.99, 9);