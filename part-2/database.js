const promise = require('bluebird');
const options = {
    promiseLib: promise
};
const pgp = require('pg-promise')(options);
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/grocery_store`
const db = pgp( CONNECTION_STRING )

const Groceries = {

  allItems: () => {
    return db.many(`
      SELECT * FROM grocery_items`)
  },

  itemsInSection: (input) => {
    input = `%${input}%`
    return db.any(`
      SELECT item_id, name FROM grocery_items
      WHERE UPPER(section) like UPPER($1)`,
      [input])
  },

  cheapItems: () => {
    return db.many(`
      SELECT item_id, name, price FROM grocery_items
      WHERE price < '10.00'
      ORDER BY price ASC`,[])
  },

  countItemsInSection: (input) => {
    input = `%${input}%`
    return db.any(`
      SELECT COUNT (DISTINCT item_id) FROM grocery_items
      WHERE UPPER(section) like UPPER($1)`,
      [input])
  },


  mostRecentOrders: () => {
    return db.many(`
      SELECT order_id, order_date FROM orders
      ORDER BY order_date ASC LIMIT 10`,[])
    },

  lastShopperName: () => {
    return db.oneOrNone(`
      SELECT shoppers.fname, shoppers.lname, orders.order_id, orders.order_date FROM orders
      JOIN shoppers
      ON orders.shopper_id = shoppers.shopper_id
      ORDER BY order_date DESC LIMIT 1`,[])
    },

  orderTotal: (order_id) => {
    return db.oneOrNone(`
      SELECT shoppers.fname, shoppers.lname, orders.order_id, orders.order_date FROM orders
      JOIN shoppers
      ON orders.shopper_id = shoppers.shopper_id
      WHERE (orders.order_id) = ($1)
      `,[order_id])
    }
}

module.exports = Groceries
