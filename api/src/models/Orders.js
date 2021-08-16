const { Schema, model } = require("mongoose");


const OrderSchema = Schema({
    
    cart: {
        type: Schema.Types.Array,
        required: true
    },

    status: {
        type: String,
        enum: ['Creada', 'Procesando', 'Completa', 'Cancelada'],
        default: 'Creada',
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        trim: true ,
    },

},{timestamps: true});

module.exports = model('Order', OrderSchema);