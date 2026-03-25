const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor');

// This maps to /api/instructor/overview
router.get('/overview', instructorController.getOverview);
router.get('/students', instructorController.getStudents);
router.get('/engagement', instructorController.getEngagement);

module.exports = router;