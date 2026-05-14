const express = require('express');
const router = express.Router();

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

// Use Routes
router.use('/contacts', contactRoutes);
router.use('/auth', authRoutes);

module.exports = router;