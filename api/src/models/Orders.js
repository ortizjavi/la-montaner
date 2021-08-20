const { Schema, model } = require("mongoose");

const OrderSchema = Schema(
  {
    cart: {
      type: Schema.Types.Array,
      required: true,
    },

    status: {
      type: String,
      enum: ["Creada", "Procesando", "Completa", "Cancelada"],
      default: "Procesando",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      default: 'Retiro en local',
    },
    payment: {
      type: String,
      default: 'Efectivo'
    },
    date: {
      type: String,
      trim: true,
    },
    mp_preference: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = model("Order", OrderSchema);
