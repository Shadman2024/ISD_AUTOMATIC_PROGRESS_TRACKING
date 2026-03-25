const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const instructorRoutes = require('./routes/instructor');

const app = express();
const PORT = process.env.INSTRCUTOR_PORT || 5000;

// 1. Middleware
app.use(cors()); // Allows Shadman's frontend to fetch data
app.use(express.json());

// 2. Routes
app.use('/api/instructor', instructorRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Instructor API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});