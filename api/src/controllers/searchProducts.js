const Product = require("../models/Product");

async function searchP (req, res, next) {
    try {
        let product = await Product.find();
        return res.json(product);
      } catch (error) {
        console.log(error);
      }
    }

module.exports = searchP