const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // You can use time as string (HH:mm format)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);