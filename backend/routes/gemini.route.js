const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/geminiController'); // Assuming you have a controller

router.post('/summary/:spaceId', getSummary); // Ensure getSummary is properly defined and imported

module.exports = router;
