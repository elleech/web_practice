const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salespersonSchema = new Schema(
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
    jobtitle: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true, length: 10 },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Salesperson = mongoose.model("salesperson", salespersonSchema);

module.exports = Salesperson;
