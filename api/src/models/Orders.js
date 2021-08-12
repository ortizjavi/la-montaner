const { Schema, model } = require("mongoose");
const {CartSchema} = require("./Cart")


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
        ref: 'User'
    },
});

module.exports = model('Order', OrderSchema);