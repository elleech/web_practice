const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buySchema = new Schema(
  {
    // custUsername
    _custId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // itemname
    _pdtId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // saleUsername
    _saleId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
    orderDate: { type: Date, required: true },
    deliverDate: { type: Date, required: true },
    cancel: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Buy = mongoose.model("buy", buySchema);

module.exports = Buy;
