const { Schema, model } = require("mongoose");

const CartSchema = Schema({
  producto: {
    type: Schema.Types.Array,
    ref: 'Product',
    required: true,
  },

  quantity: {
    type: [Number],
    required: true,
  },

});

module.exports = model("Cart", CartSchema);