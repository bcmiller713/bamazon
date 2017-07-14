# Bamazon

Bamazon is a Node CLI application consisting of an e-commerce marketplace where customers can make purchases and managers can add products and replenish inventory. These two views are separated into two different files, **bamazon-customer.js** and **bamazon-manager.js**. In these files, the customer or manager is prompted with choices of actions to take to view what items are being sold and interact with the marketplace. The inventory of items for sale is managed and updated via queries to a MySQL database. 

## Screenshots

#### Customer View - Successful Purchase

![Node Screenshot 1](http://i.imgur.com/a5W4iK5.png)

*A customer makes a purchase of a product that is in stock. The customer is charged according to the quantity of the item they purchase.*


#### Customer View - Low Stock Purchase Cancellation

![Node Screenshot 2](http://i.imgur.com/miiHGk4.png)

*A customer tries to purchase a quantity of an item greater than the quantity in stock. The transaction is cancelled and the customer is told how many units remain in stock.*


#### Customer View - Out-of-Stock Purchase Cancellation

![Node Screenshot 3](http://i.imgur.com/3PEeK8A.png)

*A customer tries to purchase an item that is not in stock. The transaction is cancelled and the customer is told that the item is not in stock.*


#### Manager View - View Products for Sale

![Node Screenshot 4](http://i.imgur.com/zSxPjZ7.png)

*A manager views all items for sale on the marketplace. Managers are able to see how many units remain in stock for each item.*


#### Manager View - View Low Inventory Products

![Node Screenshot 5](http://i.imgur.com/xMJEEyd.png)

*A manager views low inventory products. This displays on the items that have less than 5 units remaining in stock.*


#### Manager View - Add Inventory

![Node Screenshot 6](http://i.imgur.com/fHRXBfy.png)

*A manager increases the inventory of an out-of-stock item. When the manager views the inventory again, you can see the increase in the inventory for that item.*


#### Manager View - Add a New Product

![Node Screenshot 7](http://i.imgur.com/tFd6cbJ.png)

*A manager adds a new product to the marketplace. When the manager views the inventory again, you can see the increase in the inventory for that item.*

## Future Updates

In the future, I would like to track revenue by product department. In order to do this, I would create another MySQL database for product sales. I would need to modify the code in bamazon-customer.js in order to update this additional database. The final step would be to make a third javascript file, **bamazon-supervisor.js**. When this file is run, a supervisor is given the option to view sales by department, which would display a table showing each department and their revenues. Supervisors would also have the option to create a new product department.
