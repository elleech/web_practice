const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true, length: 10 },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
