const nodemailer = require('nodemailer');
require('dotenv').config();

// Create Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for others
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Verify Connection on Startup (Optional but recommended)
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error);
    } else {
        console.log('✅ SMTP Server Ready');
    }
});

module.exports = transporter;