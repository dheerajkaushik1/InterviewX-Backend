const express = require("express");
const getProfile = require('../controllers/userController');
const protect = require("../middleware/authMiddleware");
const router = express.Router();

//Protected Route
router.get("/profile", protect, getProfile);

module.exports = router;