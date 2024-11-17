const express = require('express');
const router = express.Router();
const Reservation = require('../models/eservation'); // Mongoose model

// Get all reservations
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

// Create a reservation
router.post('/reserve', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating reservation' });
  }
});

module.exports = router;
