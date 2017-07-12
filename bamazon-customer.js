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
    displayForSale();
});


function displayForSale() {
	connection.query(
		"SELECT item_id, product_name, price FROM products",
		function(err, res) {
			console.log("----------Welcome to the Bamazon Marketplace----------\n")
			for (var i = 0; i < res.length; i++) {
				console.log(
					"Item ID: " + res[i].item_id +
					" || Product Name: " + res[i].product_name +
					" || Price: $" + res[i].price + "\n"
				);
			}
			customerPrompt();
		}
	);
}

function customerPrompt() {
	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "Enter the ID of the item you would like to purchase"
		},
		{
			name: "quantity",
			type: "input",
			message: "Enter the quantity you would like to purchase of this item"
		}
	]).then(function(response) {
		connection.query(
			"SELECT item_id, product_name, price, stock_quantity FROM products",
			function(err, res) {
				var itemIndex = response.id - 1;
				if (res[itemIndex].stock_quantity <= 0) {
					console.log(
						"\n----------------------------------------------------------\n" + 
						"I'm sorry, the product you have selected is out of stock." + 
						"\n----------------------------------------------------------\n");
					displayForSale();
				}
				else if (res[itemIndex].stock_quantity < response.quantity) {
					console.log(
						"\n----------------------------------------------------------------------------------------------------\n" +  
						"I'm sorry, the product you have selected is almost out of stock." + 
						"There are only " + res[itemIndex].stock_quantity + " unit(s) remaining." + 
						"\n----------------------------------------------------------------------------------------------------\n");
					displayForSale();
				}
				else {
					var invoice = res[itemIndex].price * response.quantity;
					console.log(
						"\n--------------------------------------------------------------------\n" +  
						"Thank you for your purchase. Your account has been billed for $" + invoice + 
						"\n--------------------------------------------------------------------\n");
					connection.query(
						"UPDATE products SET ? WHERE ?",
						[
							{
								stock_quantity: res[itemIndex].stock_quantity - response.quantity
							},
							{
								item_id: response.id
							}
						],
						function(error, results) {
							displayForSale();
						}
					);
				}
			}
		);
	});
}
