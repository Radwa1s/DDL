const mysql = require("mysql");
const express = require("express");

const app = express();
const port = 4000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Radwaradwa",
  database: "orders",
});

//connect to db
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

app.get("/customertable", (req, res) => {
  let sql =
    "CREATE TABLE customers(customer_id int  AUTO_INCREMENT,customer_name varchar(30),tel_number int ,PRIMARY KEY(customer_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("category table created ..");
  res.end();
});
app.get("/products", (req, res) => {
  let sql =
    "CREATE TABLE products(product_id int AUTO_INCREMENT,product_name varchar(40),price int ,primary key(product_id))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("created products");
  res.end();
});

app.get("/order", (req, res) => {
  let sql =
    "CREATE TABLE orders(order_id int AUTO_INCREMENT, product_id int NOT NULL, customer_id int NOT NULL, PRIMARY KEY(order_id), FOREIGN KEY (product_id) REFERENCES products(product_id), FOREIGN KEY (customer_id) REFERENCES customers(customer_id) )";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("created");
  res.end();
});

app.get("/o", (req, res) => {
  let sql = "ALTER TABLE orders ADD( quantity INT, total_amount INT)";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("ADDED");
  res.end();
});

app.get("/add", (req, res) => {
  let sql = "ALTER TABLE products ADD( Category varchar(20))";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("ADDED");
  res.end();
});
app.get("/addDate", (req, res) => {
  let sql = "ALTER TABLE orders ADD( OrderDate TIMESTAMP DEFAULT NOW())";
  db.query(sql, (error) => {
    if (error) {
      console.log(error.message);
      throw error;
    }
  });
  console.log("ADDED");
  res.end();
});

app.listen(port, () => {
  console.log("server running " + port);
});
