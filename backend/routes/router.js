const express = require('express');
const router = express.Router();

// Import Routes
const contactRoutes = require('./contactRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

// Use Routes
router.use('/contacts', contactRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;