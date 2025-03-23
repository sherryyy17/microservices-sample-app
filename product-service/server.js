const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/productDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB - Product Service"))
    .catch(err => console.error(err));

const productSchema = new mongoose.Schema({ name: String });
const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post("/products", async (req, res) => {
    const newProduct = new Product({ name: req.body.name });
    await newProduct.save();
    res.json(newProduct);
});

app.listen(5002, () => console.log("Product Service running on port 5002"));
