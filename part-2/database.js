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
    },
  // allItems: () => {
  //   return db.many(`
  //     SELECT order_id, shoppers.fname, shoppers.lname, cart.item_id, grocery_items.name, grocery_items.price, grocery_items.section  FROM orders
  //     JOIN cart
  //     ON orders.order_id = cart.cart_id
  //     JOIN shoppers
  //     ON orders.shopper_id = shoppers.shopper_id
  //     JOIN grocery_items
  //     ON cart.item_id = grocery_items.item_id`,[])
  // },



  // deleteBook: id => {
  //   return db.none(`DELETE FROM bookstore WHERE id=$1`,[id])
  // },

  // createBook: ( { title, author, preview, genre, image_url }) => {
  //   return db.any(
  //     `INSERT INTO bookstore
  //       ( title, author, preview, genre, image_url )
  //     VALUES
  //       ( $1, $2, $3, $4, $5)`,
  //     [ title, author, preview, genre, image_url ]
  //   )
  // },

  // editBook: ( id, book ) => {
  //   return db.oneOrNone(
  //      `UPDATE bookstore
  //      SET title=$2, author=$3, preview=$4, genre=$5, image_url=$6
  //      WHERE id=$1`,
  //      [id, book.title, book.author, book.preview, book.genre, book.image_url] )
  // }
}



// Groceries.allItems()
//   .then( groceries => {
//     console.log("groceries ========>", groceries)
// })

// Groceries.itemsInSection("bulk")
//   .then( groceries => {
//     console.log("groceries ========>", (groceries))
// })

// Groceries.countItemsInSection("packaged")
//   .then( groceries => {
//     console.log("groceries ========>", groceries )
// })

// Groceries.mostRecentOrders()
//   .then( groceries => {
//     console.log("groceries ========>", groceries )
// })

// Groceries.orderTotal(4)
//   .then( groceries => {
//     console.log("groceries ========>", groceries )
// })

module.exports = Groceries
