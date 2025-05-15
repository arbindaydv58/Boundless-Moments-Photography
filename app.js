const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const photoRoutes = require("./routes/photo");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Home Page
app.get("/", (req, res) => {
  res.render("includes/home");
});

// Portfolio Page
app.get("/portfolio", (req, res) => res.render("includes/portfolio"));

// Experience Page
app.get("/experience", (req, res) => res.render("includes/experience"));

app.use("/", loginRoutes); //login
app.use("/", registerRoutes); // register
app.use("/", adminRoutes); // Admin
app.use("/", contactRoutes); // Contact
app.use("/", photoRoutes); //photo

// Server setup
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
