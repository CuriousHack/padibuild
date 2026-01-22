const transporter = require('../config/transporter');
const templates = require('../templates/emailTemplates');
require('dotenv').config();

exports.handleContactForm = async (req, res) => {
    const { name, email, service, message } = req.body;

    // 1. Validation
    if (!name || !email || !message) {
        return res.status(400).send('<h1>Error</h1><p>Please fill in all required fields.</p>');
    }

    try {
        // 2. Prepare Emails
        const adminMail = {
            from: process.env.FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `New Lead: ${service} - ${name}`,
            html: templates.adminNotification({ name, email, service, message })
        };

        const userMail = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'We received your inquiry - Padibuild',
            html: templates.userConfirmation({ name, service, message })
        };

        // 3. Send Concurrently
        await Promise.all([
            transporter.sendMail(adminMail),
            transporter.sendMail(userMail)
        ]);

        console.log(`📧 Emails sent successfully for client: ${name}`);

        // 4. Response (Redirect back to home with success hash)
        res.redirect('/?status=success#contact');

    } catch (error) {
        console.error('❌ Email Logic Error:', error);
        res.status(500).send('<h1>Server Error</h1><p>Something went wrong. Please try again later.</p>');
    }
};