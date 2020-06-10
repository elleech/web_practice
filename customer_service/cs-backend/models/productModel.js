const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    itemname: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    unitprice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
