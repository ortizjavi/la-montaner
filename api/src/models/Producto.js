const { Schema } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    abv: {

    },
    ibu: {

    },
    description: {

    },
    price: {
        
    }
})

module.exports = ['Producto', schema];