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
 // console.log("Connected to PostgreSQL");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

router.post("/login", (req, res) => {
  pool
    .query(
      `SELECT * from members 
          where username =  $1 
          and password = $2`,
      [req.body.username, req.body.password]
    )
    .then((data) => {
      if (data.rows.length == 0) {
        res.render("auth/login", { error: "invalid username or password" });
      } else {
        res.redirect("/admin");
      }
    });
});

module.exports = router;