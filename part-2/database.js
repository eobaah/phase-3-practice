SELECT order_id, shoppers.fname, shoppers.lname, cart.item_id, grocery_items.name, grocery_items.price, grocery_items.section  FROM orders
JOIN cart
ON orders.order_id = cart.cart_id
JOIN shoppers
ON orders.shopper_id = shoppers.shopper_id
JOIN grocery_items
ON cart.item_id = grocery_items.item_id
