const { Schema, model } = require("mongoose");
const { schema } = require("./Category");

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  categories: {
    type: Schema.Types.Array,
    ref: "Category",
    required: true,
  },

  img: {
    type: Array,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  abv: {
    type: Number,
  },

  ibu: {
    type: Number,
  },

  description: {
    type: String,
    required: true,
  },

  volumen: {
    type: Number,
  },

  others: {
    type: String,
  },
  reviews: {
    type: Object,
  },
  rating: {
    type: [Number],
  }
});

module.exports = model("Product", ProductSchema);
