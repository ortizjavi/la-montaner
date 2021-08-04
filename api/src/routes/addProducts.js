const { Router } = require("express");
const routerProducts = Router();
const Product = require("../models/Product");

routerProducts.post("/add", async (req, res) => {
  console.log('routerProducts.post:',req.body);
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
});

routerProducts.put('/update/:id', async (req, res) => {
    const productId = req.params.id;
    const update = { ...req.body }
    try {
        //const productoEncontrado = await Product.findById(productId);
        const productoActualizado = await Product.findByIdAndUpdate(productId, update,{new:true})
        res.json({
            ok: true,
            product: productoActualizado
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        })
    }
})

routerProducts.delete('/delete/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.findByIdAndDelete(productId)
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        })
    }
})

module.exports = routerProducts;
