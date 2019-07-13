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

