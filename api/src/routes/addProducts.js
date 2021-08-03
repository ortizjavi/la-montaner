const {Router} = require('express');
const routerProducts = Router();
const Product = require('../models/Product');

routerProducts.post('/add', async (req, res) => {
    console.log(req.body)
    const product = new Product(req.body);
    //name, category, img, price, stock, abv, ibu, description, volumen, others

    try {
         const productSave = await product.save();

         res.json({
             ok: true,
             producto: productSave
         })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false
        })
    }
})

module.exports = routerProducts;

