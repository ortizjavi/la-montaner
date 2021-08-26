const { Schema, model } = require("mongoose");

const SalesSchema = Schema(
  {
    date: {
      type: Object,
      default: {},
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Sale", SalesSchema);
