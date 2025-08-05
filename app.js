const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch"); // API request

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const query = req.body.name.toLowerCase();

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    // Search for product match
    const result = data.find(product =>
      product.title.toLowerCase().includes(query)
    );

    if (result) {
      res.render("product", {
        name: result.title,
        price: result.price,
        description: result.description,
        image: result.image
      });
    } else {
      res.render("product", {
        name: "Product not found",
        price: "",
        description: "",
        image: ""
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
