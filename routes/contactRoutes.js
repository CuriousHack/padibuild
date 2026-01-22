const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /send-email
router.post('/send-email', contactController.handleContactForm);

module.exports = router;
