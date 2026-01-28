const styles = {
    header: `background-color: #ffffff; padding: 20px; text-align: center; border-bottom: 4px solid #dc2626;`,
    logo: `color: #dc2626; font-size: 24px; font-weight: bold; text-decoration: none; font-family: Arial, sans-serif;`,
    logoText: `color: #111827;`,
    body: `font-family: Arial, sans-serif; line-height: 1.6; color: #374151; max-width: 600px; margin: 0 auto; padding: 20px;`,
    footer: `background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; font-family: Arial, sans-serif;`,
    button: `display: inline-block; background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;`,
    table: `width: 100%; border-collapse: collapse; margin-top: 15px;`,
    th: `text-align: left; padding: 12px; background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;`,
    td: `padding: 12px; border-bottom: 1px solid #e5e7eb;`
};

exports.adminNotification = ({ name, email, service, message }) => {
    return `
    <div style="${styles.body}">
        <div style="${styles.header}">
            <img src="https://padibuild.padimi.com.ng/images/logo.png" alt="Padibuild" style="height: 50px; display: inline-block; vertical-align: middle; margin-right: 10px;">
            <span style="${styles.logo} vertical-align: middle;">PADI<span style="${styles.logoText}">BUILD</span></span>
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
            <img src="https://padibuild.padimi.com.ng/images/logo.png" alt="Padibuild" style="height: 50px; display: inline-block; vertical-align: middle; margin-right: 10px;">
            <span style="${styles.logo} vertical-align: middle;">PADI<span style="${styles.logoText}">BUILD</span></span>
        </div>
        <h3>Hello ${name},</h3>
        <p>We received your inquiry regarding <strong>${service}</strong>.</p>
        <p>Our team is reviewing your details and will respond within 24 hours.</p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #dc2626; font-style: italic;">"${message}"</p>
        
        <br>
        <p style="font-weight: bold; color: #1f2937;">
            Wale A,<br>
            Sales Representative.<br>
            PadiBuild.<br>
            Whatsapp: 08095600003
        </p>

        <div style="${styles.footer}">
            &copy; ${new Date().getFullYear()} Padibuild Containers. Lagos, Nigeria.
        </div>
    </div>`;
};