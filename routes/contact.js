const express = require("express");
const router = express.Router();
 


// // Database
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

// Contact Page
router.get("/contact", (req, res) => {
  res.render("includes/contact", { success: req.query.success });
});

// Handle Contact Form
router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  pool.query(
    "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message],
    (err) => {
      if (err) {
        console.error("Error saving message", err);
        return res.redirect("/contact?success=false");
      }
      res.redirect("/contact?success=true");
    }
  );
});

module.exports = router;
