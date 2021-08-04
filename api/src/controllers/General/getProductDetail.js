const Product = require('../../models/Product');

module.exports = {
  getProductDetail: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (!id) return res.status(400).send({ error: "Id not found" });
      const product = await Product.findById(id);
      return res.json(product);
    } catch (error) {
      console.log(error);
    }
  }
}
