const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const a = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { name: "" });
});

app.post("/", (req, res) => {
  a.push(req.body.name);

  const name = req.body.name;
res.render("product", { name });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
