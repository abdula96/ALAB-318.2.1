const express = require("express");
const path = require("path");
const morgan = require("morgan"); // Importing morgan for logging
const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Specify the views directory

// Serve static files (like images, stylesheets, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware for logging requests using morgan
app.use(morgan("dev")); // Log requests in a concise format

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); // Allows POST form data to be parsed

// Route for Home Page
app.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

// Route for About Page
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// Route with a parameter (user profile)
app.get("/user/:name", (req, res) => {
  const userName = req.params.name; // Access the user name from the URL
  res.render("user", { title: "User Profile", name: userName });
});

// Route to handle form submission (POST method)
app.post("/submit", (req, res) => {
  const username = req.body.username; // Get the username from the form input
  console.log("Form submitted with username:", username);
  res.send("Form submission successful");
});

// Route to handle image download
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "public/images/mountain.jpg");
  res.download(filePath, "mountain.jpg", (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Error downloading the file");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
s;
