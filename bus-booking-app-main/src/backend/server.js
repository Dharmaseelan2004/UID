// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/busReservation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use reservation routes
app.use('/api', reservationRoutes);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
