require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');
const apiRoutes = require('./routes/router');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Sync Models (Creates tables if they don't exist)
// In production, use migrations instead of .sync()
sequelize.sync({ alter: true }).then(() => {
    console.log('📂 Database Tables Synced');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/uploads', express.static('uploads'));
// app.use(express.static('public'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.use('/api', apiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});