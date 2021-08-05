const Product = require('../../../models/Product');

module.exports = {
  getAdminProduct: async (req, res, next) => {
    try {
        const productos = await Product.find()
        res.json(productos)
    } catch (error) {
        console.log(error);
    }
  }
}
