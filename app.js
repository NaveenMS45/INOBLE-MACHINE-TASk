// require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

// Middleware
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gokul@2004",
  database: "machinetask",
});

// Check DB connection
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Database connected successfully....`);
  }
});

// Routes
app.get("/", (req, res) => {
  res.send(`<h1> CRUD operation using node and mysql<h1>`);
});

// GET request to retrieve all users
app.get("/api/v1/users", (req, res) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST request to create a new user
app.post("/api/v1/users", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let email = req.body.email;
  let sql = `INSERT INTO users(id,name,email) VALUES ("${id}","${name}","${email}")`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User created successfully");
  });
});

// GET request to retrieve all posts.
app.get("/api/v1/posts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST request to create a new post
app.post("/api/v1/posts", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let user_id = req.body.user_id;
  let sql = `INSERT INTO posts(id,title,user_id) VALUES ("${id}","${title}","${user_id}") `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post created successfully");
  });
});

// UPDATE a user 
app.patch("/api/v1/users/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let sql = `UPDATE users SET id = ${id}, name= ${name}, email = ${email})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User updated successfully");
  });
});

// UPDATE a post
app.patch("/api/v1/posts/:id", (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let user_id = req.body.user_id;
  let sql = `UPDATE users SET id = ${id}, title = ${title}, user_id = ${user_id})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post updated successfully");
  });
});

// DELETE a user
app.delete("/api/v1/users/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM users WHERE id = ${id})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("User deleted successfully");
  });
});

// DELETE a post
app.delete("/api/v1/posts/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM posts WHERE id = ${id})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Post deleted successfully");
  });
});


// port
const port = process.env.PORT || 5000;

// Start
const start = async function () {
  try {
    app.listen(port, () => {
      console.log(`server is listening on the port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
