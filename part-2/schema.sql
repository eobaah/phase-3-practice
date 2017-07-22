DROP DATABASE IF EXISTS grocery_store;
CREATE DATABASE grocery_store;

\c grocery_store

CREATE TABLE IF NOT EXISTS grocery_items(
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(140),
  price VARCHAR (140),
  section VARCHAR(140));

CREATE TABLE IF NOT EXISTS shoppers(
  shopper_id SERIAL PRIMARY KEY,
  fname VARCHAR(140),
  lname VARCHAR(140),
  email VARCHAR(140));

CREATE TABLE IF NOT EXISTS orders(
  order_id SERIAL PRIMARY KEY,
  shopper_id INTEGER REFERENCES shoppers(shopper_id));

CREATE TABLE IF NOT EXISTS cart(
  cart_id INTEGER REFERENCES orders(order_id),
  item_id INTEGER REFERENCES grocery_items(item_id));
