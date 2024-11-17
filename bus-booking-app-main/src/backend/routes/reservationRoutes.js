// backend/routes/reservationRoutes.js
const express = require('express');
const Passenger = require('../models/Passenger');
const Booking = require('../models/Booking');

const router = express.Router();

// Route to save booking information from Main.jsx
router.post('/reserve', async (req, res) => {
  try {
    const { name, from, to, date } = req.body;
    const newBooking = new Booking({ name, from, to, date });
    await newBooking.save();
    res.status(201).json({ message: 'Booking details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving booking details', error });
  }
});

// Route to save passenger details from Passengers.jsx
router.post('/passenger', async (req, res) => {
  try {
    const { name, mobile, email } = req.body;
    const newPassenger = new Passenger({ name, mobile, email });
    await newPassenger.save();
    res.status(201).json({ message: 'Passenger details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving passenger details', error });
  }
});

module.exports = router;
