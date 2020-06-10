const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    // buyId
    _buyId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // emplUsername
    _emplId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subject: { type: String, required: true, minlength: 3 },
    complaint: { type: String, required: true, minlength: 3 },
    status: { type: Boolean, required: true, default: false },
    resolution: { type: String, required: true, default: "TBU" },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
