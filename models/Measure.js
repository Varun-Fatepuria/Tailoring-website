const mongoose = require('mongoose');

const MeasureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, required: true },
  Chest: Number,
  Waist: Number,
  Hip: Number,
  Shoulder: Number,
  Sleeve: Number,
  Length: Number,
  Bust: Number,
  Thigh: Number,
  Inseam: Number,
  Armhole: Number
});

module.exports = mongoose.model('Measure', MeasureSchema);
