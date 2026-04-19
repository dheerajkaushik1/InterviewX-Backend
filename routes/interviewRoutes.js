const getMyInterviews = require('../controllers/interviewController');
const express = require('express');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/my', protect, getMyInterviews);

module.exports = router;