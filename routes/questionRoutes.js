const express  = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {addQuestion, getQuestions} = require('../controllers/questionController');

router.post("/add", protect, addQuestion);
router.get("/", protect, getQuestions);

module.exports = router;