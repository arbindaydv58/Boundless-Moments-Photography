const express = require("express");
const router = express.Router();



// Database
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  //database: "photog",
  database: "Business",
  password: "Arbinda58",
  port: 2058,
});

pool.connect((err) => {
  if (err) throw err;
  //console.log("Connected to PostgreSQL");
});


// Register Page
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post("/register", (req, res) => {
  pool
    .query(
      `INSERT INTO 
          members (username, email,password) 
          VALUES ($1, $2, $3)`,
      [req.body.username, req.body.email, req.body.password]
    )
    .then(() => res.redirect("login"))
    .catch((err) => console.log(err));
});

module.exports = router;