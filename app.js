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
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const result = data.products.find(product =>
      product.title.toLowerCase().includes(query)
    );

    if (result) {
      res.render("product", {
        name: result.title,
        price: result.price,
        description: result.description,
        image: result.thumbnail
      });
    } else {
      res.render("product", {
        name: "Product not found",
        price: "",
        description: "",
        image: ""
      });
    }
console.log(data.products.map(p => p.title));

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).send("Server error while fetching products.");
  }
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




