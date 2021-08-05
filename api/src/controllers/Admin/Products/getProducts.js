const Product = require('../../../models/Product');

module.exports= {
    getProducts: async ( req, res) => {
        try {
            let productos = await Product.find()
            return res.json(productos)
        } catch (error) {
            console.log(error)
        }
    }
}