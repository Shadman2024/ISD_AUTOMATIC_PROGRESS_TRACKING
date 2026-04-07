const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const instructorRoutes = require('./routes/instructor');

const app = express();
// const PORT = process.env.INSTRUCTOR_PORT || 5000;
const PORT = process.env.PORT || 5001;     //for hosting in render 
const allowedOrigins = [
  'http://localhost:5173',
  'https://g4-isdautomaticprogresstracking.app',
  'https://g4-isdautomaticprogresstracking.netlify.app',
];
// 1. Middleware
// app.use(cors()); // Allows Shadman's frontend to fetch data
app.use(cors({
    origin(origin, callback) {
      // Allow browserless tools and configured frontend origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true 
}));

app.use(express.json());

// 2. Routes
app.use('/api/instructor', instructorRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'Instructor API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
