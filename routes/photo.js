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
  console.log("Connected to PostgreSQL");
});

// Display Images on Gallery Page
router.get("/photo", (req, res) => {
  pool
    .query("SELECT * FROM images ORDER BY uploaded_at DESC")
    .then((result) => {
      res.render("includes/photo", { images: result.rows });
    })
    .catch((err) => {
      console.error("Error fetching images:", err);
      res.status(500).send("Error fetching images");
    });
});

module.exports = router;