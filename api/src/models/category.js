const { Schema } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
   
})

module.exports = ['category', schema];