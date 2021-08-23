const { Schema, model } = require("mongoose");

const SalesSchema = Schema(
    {
      date: {
        type: String,
      },
      price: {
        type: Number,
      },
      discount: {
        type: Number,
        required: true
      },
    },
    { timestamps: true }
  );
  
  module.exports = model("Sale", SalesSchema);
  