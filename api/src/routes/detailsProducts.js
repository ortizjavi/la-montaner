const Product = require("../models/Product");
const { Router } = require("express");
const detailProducts = Router();

detailProducts.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).send({ error: "Id not found" });

    let product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = detailProducts;
