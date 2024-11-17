// backend/models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
