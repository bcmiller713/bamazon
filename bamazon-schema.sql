DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INT auto_increment NOT NULL,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television", "Electronics", 600.00, 5),
	   ("Laptop", "Electronics", 1300.00, 8),
	   ("Mouse", "Electronics", 25.00, 10),
	   ("Dining Chair", "Furniture", 120.00, 6),
	   ("Sofa", "Furniture", 1000.00, 2),
	   ("Soccer Ball", "Sporting Goods", 18.00, 25),
	   ("Hockey Stick", "Sporting Goods", 65.00, 12),
	   ("Tennis Balls (3)", "Sporting Goods", 4.00, 32),
	   ("Tennis Racket", "Sporting Goods", 45.00, 15),
	   ("Wrist Watch", "Fashion", 200.00, 7),
	   ("Shaving Cream", "Beauty", 5.00, 9),
       ("Set of Coasters (4)", "Home Goods", 10.00, 0);

SELECT * FROM products;
