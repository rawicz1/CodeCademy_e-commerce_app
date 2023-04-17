CREATE DATABASE AI_paintings_test;

CREATE TABLE cart (
  id VARCHAR(100) PRIMARY KEY NOT NULL,
  date_created DATE NOT NULL,
  customer_id INTEGER NOT NULL 
);

CREATE TABLE paintings (
id INTEGER PRIMARY KEY NOT NULL,
name VARCHAR NOT NULL,
category VARCHAR(30) NOT NULL,
in_stock BOOLEAN DEFAULT true NOT NULL,
price INTEGER NOT NULL,
price_in_pennies INTEGER
);

CREATE TABLE cart_item (
  id VARCHAR PRIMARY KEY NOT NULL,
  created DATE NOT NULL,
  painting_id INTEGER,
  cart_id VARCHAR,
  CONSTRAINT fk_paitning_id FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
);

CREATE TABLE customers (
id INTEGER PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
password VARCHAR(80)
);

CREATE TABLE orders (
id INTEGER PRIMARY KEY NOT NULL,
customer_id INTEGER NOT NULL,
date DATE NOT NULL,
total INTEGER,
status VARCHAR DEFAULT "pending" NOT NULL,
date_placed DATE,
CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_item (
id INTEGER PRIMARY KEY NOT NULL,
created DATE NOT NULL,
quantity INTEGER DEFAULT 1 NOT NULL,
price INTEGER,
painting_id INTEGER,
order_id INTEGER,
CONSTRAINT fk_painting_id FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE,
CONSTRAINT order_item_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id)
);

