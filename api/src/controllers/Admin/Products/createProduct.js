const Product = require("../../../models/Product");

module.exports = async (req, res, next) => {
  const product = new Product(req.body);
  //name, category, img, price, stock, abv, ibu, description, volumen, others

  try {
    const productSave = await product.save();

    res.json({
      ok: true,
      producto: productSave,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
    });
  }
}

