const styles = {
    header: `background-color: #111827; padding: 20px; text-align: center; border-bottom: 4px solid #ea580c;`,
    logo: `color: #ea580c; font-size: 24px; font-weight: bold; text-decoration: none; font-family: Arial, sans-serif;`,
    logoText: `color: #ffffff;`,
    body: `font-family: Arial, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;`,
    footer: `background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; font-family: Arial, sans-serif;`,
    button: `display: inline-block; background-color: #ea580c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;`,
    table: `width: 100%; border-collapse: collapse; margin-top: 15px;`,
    th: `text-align: left; padding: 12px; background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;`,
    td: `padding: 12px; border-bottom: 1px solid #e5e7eb;`
};

exports.adminNotification = ({ name, email, service, message }) => {
    return `
    <div style="${styles.body}">
        <div style="${styles.header}">
            <span style="${styles.logo}">PADI<span style="${styles.logoText}">BUILD</span></span>
        </div>
        <h2>New Project Inquiry</h2>
        <p><strong>Status:</strong> New Lead</p>
        
        <table style="${styles.table}">
            <tr><th style="${styles.th}">Client Name</th><td style="${styles.td}">${name}</td></tr>
            <tr><th style="${styles.th}">Email</th><td style="${styles.td}"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><th style="${styles.th}">Service</th><td style="${styles.td}">${service}</td></tr>
            <tr><th style="${styles.th}">Message</th><td style="${styles.td}">${message}</td></tr>
        </table>
        
        <div style="margin-top: 20px;">
            <a href="mailto:${email}" style="${styles.button}">Reply to Client</a>
        </div>
    </div>`;
};

exports.userConfirmation = ({ name, service, message }) => {
    return `
    <div style="${styles.body}">
        <div style="${styles.header}">
            <span style="${styles.logo}">PADI<span style="${styles.logoText}">BUILD</span></span>
        </div>
        <h3>Hello ${name},</h3>
        <p>We received your inquiry regarding <strong>${service}</strong>.</p>
        <p>Our team is reviewing your details and will respond within 24 hours.</p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ea580c; font-style: italic;">"${message}"</p>
        <div style="${styles.footer}">
            &copy; ${new Date().getFullYear()} Padibuild Containers. Lagos, Nigeria.
        </div>
    </div>`;
};