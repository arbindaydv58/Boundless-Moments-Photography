const express = require("express");
const router = express.Router();
const multer = require("multer");

// Database
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // database: "photog",
  database: "Business",
  password: "Arbinda58",
  port: 2058,
});

pool.connect((err) => {
  if (err) throw err;
  //console.log("Connected to PostgreSQL");
});

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Admin Panel Route
router.get("/admin", async (req, res) => {
  try {
    const memberResult = await pool.query(`SELECT * FROM members`);
    const messageResult = await pool.query(`SELECT * FROM messages`);
    const imageResult = await pool.query(`SELECT * FROM images`);

    res.render("auth/admin", {
      members: memberResult.rows,
      messages: messageResult.rows,
      images: imageResult.rows,
    });
  } catch (err) {
    console.error("Error fetching admin data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a message
router.post("/admin/messages/delete/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM messages WHERE id = $1", [id])
    .then(() => res.redirect("/admin"))
    .catch((err) => {
      console.error("Error deleting message:", err);
      res.redirect("/admin");
    });
});

// Admin Image Upload
router.post("/admin/upload", upload.single("image"), (req, res) => {
  const { title } = req.body;
  const imageBuffer = req.file.buffer;

  const query = {
    text: "INSERT INTO images(title, image) VALUES($1, $2) RETURNING id",
    values: [title, imageBuffer],
  };

  pool
    .query(query)
    .then((result) => {
      console.log("Image uploaded with ID:", result.rows[0].id);
      res.redirect("/admin");
    })
    .catch((err) => {
      console.error("Error uploading image:", err);
      res.status(500).send("Error uploading image");
    });
});

// Admin Image Deletion
router.post("/admin/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = {
    text: "DELETE FROM images WHERE id = $1",
    values: [id],
  };

  pool
    .query(query)
    .then(() => {
      console.log("Image deleted with ID:", id);
      res.redirect("/admin");
    })
    .catch((err) => {
      console.error("Error deleting image:", err);
      res.redirect("/admin");
    });
});

module.exports = router;
