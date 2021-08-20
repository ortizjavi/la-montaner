const { Schema, model } = require("mongoose");

const OrderSchema = Schema(
  {
    cart: {
      type: Schema.Types.Array,
      required: true
    },
    status: {
      type: String,
      enum: ["Creada", "Procesando", "Completa", "Cancelada"],
      default: "Creada",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    address: {
      type: String,
      default: '',
    },
    payment: {
      type: String,
      default: 'Efectivo',
    },
    date: {
      type: String,
      trim: true
    },
    payment_status: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    mp_preference: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
