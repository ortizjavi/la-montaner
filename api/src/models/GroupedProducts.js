const { Schema, model }  = require('mongoose');
const CategoryModel = require('./Category');
const ProductModel = require('./Product');


const GroupedProductsSchema =  Schema ({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: [CategoryModel.schema],
        required: true
    },
    products : [
       {
            product: ProductModel.schema,
            cantidad: Number
        }
    ],
    /*products: {
        type: [ProductModel.schema],
        required: true
    },*/
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
})

module.exports = model('GroupedProducts', GroupedProductsSchema);