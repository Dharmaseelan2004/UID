// index.js (Backend Code)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API route for booking reservation
app.post('/api/reserve', (req, res) => {
  const { name, from, to, date } = req.body;

  console.log('Received reservation request:', req.body);

  // Simulate a successful booking
  if (!name || !from || !to || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Logic to save reservation can go here (e.g., database)

  res.status(200).json({ message: 'Booking successful!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
