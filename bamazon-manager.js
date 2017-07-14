var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("\n---------------Welcome back, Manager---------------\n");
    managerDisplay();
});

function managerDisplay() {
	inquirer.prompt({
			name: "cmd",
			type: "list",
			message: "Select an action: ",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(response) {
		logicTree(response);
	});
}

function logicTree(response) {
	switch (response.cmd) {
		case ("View Products for Sale"):
			viewProducts();
			break;
		case ("View Low Inventory"):
			lowInventory();
			break;
		case ("Add to Inventory"):
			addInventory();
			break;
		case ("Add New Product"):
			addProduct();
			break;
	}
}

function viewProducts() {
	connection.query(
		"SELECT item_id, product_name, price, stock_quantity FROM products",
		function(err, res) {
			console.log("---------------Complete Inventory---------------\n");
			for (var i = 0; i < res.length; i++) {
				console.log(
					"Item ID: " + res[i].item_id +
					" || Product Name: " + res[i].product_name +
					" || Price: $" + res[i].price + 
					" || Quantity in Stock: " + res[i].stock_quantity + "\n"
				);
			}
			managerDisplay();
		}
	);
}

function lowInventory() {
	connection.query(
		"SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity BETWEEN 0 AND 4",
		function(err, res) {
			console.log("---------------Low Inventory---------------\n");
			for (var i = 0; i < res.length; i++) {
				console.log(
					"Item ID: " + res[i].item_id +
					" || Product Name: " + res[i].product_name +
					" || Price: $" + res[i].price + 
					" || Quantity in Stock: " + res[i].stock_quantity + "\n"
				);
			}
			managerDisplay();
		}
	);
}

function addInventory() {
	connection.query(
		"SELECT item_id, product_name, stock_quantity FROM products",
		function(err, res) {
			inquirer.prompt([
				{
					name: "id",
					type: "input",
					message: "Enter the ID of the item you would like to restock: "
				},
				{
					name: "quantity",
					type: "input",
					message: "How many units would you like to restock?",
					validate: function(value) {
			        	if (isNaN(value) === false) {
			            	return true;
			          	}
			          	return false;
			        }
				}
			]).then(function(response) {
				var itemIndex = response.id - 1;
				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: res[itemIndex].stock_quantity + response.quantity
						}, 
						{
							item_id: response.id
						}
					], 
					function(error, results) {
						console.log(
							"-------------------------------------------------------------------\n" +
							"You have successfully restocked Product ID " + response.id + " with " + 
							response.quantity + " additional units.\n" + 
							"-------------------------------------------------------------------\n"
						);
						managerDisplay();
					}
				);
			});
		}
	);
}

function addProduct() {
	inquirer.prompt([
		{
			name: "name",
			type: "input",
			message: "What is the name of the product?"
		},
		{
			name: "department",
			type: "input",
			message: "In which department does this product belong?"
		},
		{
			name: "price",
			type: "input",
			message: "What is the price of this product?"
		},
		{
			name: "quantity",
			type: "input",
			message: "How many units of this product do we have in stock?"
		}
	]).then(function(response) {
		connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: response.name,
				department_name: response.department,
				price: response.price,
				stock_quantity: response.quantity
			},
			function(err, res) {
				managerDisplay();
			}
		);
	});
}
