require('dotenv').config();
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASS,
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  loadProducts();
});

// Function to load the products table from the database and print results to the console
function loadProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    console.table(res);
    promptCustomerForItem(res);
  });
}

// Prompt the customer for a product ID
function promptCustomerForItem(inventory) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'choice',
        message:
          'What is the ID of the item you would you like to purchase? [Quit with Q]',
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === 'q';
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      } else {
        console.log('\nThat item is not in the inventory.');
        loadProducts();
      }
    });
}

// Prompt the customer for a product quantity
function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like? [Quit with Q]',
        validate: function(val) {
          return val > 0 || val.toLowerCase() === 'q';
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log('\nInsufficient quantity!');
        loadProducts();
      } else {
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quantity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
    [quantity, product.item_id],
    function(err, res) {
      console.log(
        '\nSuccessfully purchased ' +
          quantity +
          ' ' +
          product.product_name +
          "'s!"
      );
      loadProducts();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === 'q') {
    console.log('Goodbye!');
    process.exit(0);
  }
}
