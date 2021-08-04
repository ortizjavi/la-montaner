const Product = require('../../models/Product');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
        const product = await Product.find();
        return res.json(product);
      } catch (error) {
        console.log(error);
      }
  }
}
