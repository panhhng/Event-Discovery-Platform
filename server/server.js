const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Event Schema
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  imageUrl: String,
});

const Event = mongoose.model('Event', eventSchema);

// Event Routes
app.get('/api/events', async (req, res) => {
  const API_KEY = process.env.EVENTBRITE_API_KEY; // Access API key from .env
  const { location, category, start_date, end_date } = req.query; // Extract query parameters

  try {
    const response = await axios.get(process.env.EVENTBRITE_API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // Set authorization header
      },
      params: {
        location: location || 'San Francisco', // Default location if not provided
        category: category || '', // Optional category
        start_date: start_date || '', // Optional start date
        end_date: end_date || '', // Optional end date
      },
    });

    console.log(response.data.events);
    res.json(response.data.events); // Send only the events data
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  const { name, date, location, description, imageUrl } = req.body;
  const event = new Event({ name, date, location, description, imageUrl });

  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Holiday Route
app.get('/api/holidays', async (req, res) => {
  console.log('Received request for /api/holidays');
  const { country, year } = req.query;
  console.log(`Fetching holidays for country: ${country}, year: ${year}`);
  
  try {
    const response = await axios.get('https://api.getfestivo.com/v2/holidays', {
      params: { 
        api_key: process.env.FESTIVO_API_KEY, // Include the API key in the parameters
        country: country || 'US',
        year: 2023
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching holidays:', error.message);
    res.status(500).json({ message: 'Error fetching holidays', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
