const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email delivery failed');
    }
  }

  // --- Templates ---

  getTemplate(title, body, ctaText, ctaLink) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: 700; color: #166534; }
          .content { line-height: 1.6; font-size: 16px; margin-bottom: 40px; }
          .button { display: inline-block; padding: 14px 28px; background-color: #166534; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌿 AyurvedaLearn</div>
          </div>
          <div class="content">
            <h2 style="color: #166534;">${title}</h2>
            ${body}
            ${ctaLink ? `<div style="text-align: center; margin-top: 30px;">
              <a href="${ctaLink}" class="button">${ctaText}</a>
            </div>` : ''}
          </div>
          <div class="footer">
            <p>© 2026 AyurvedaLearn. All rights reserved.</p>
            <p>Empowering BAMS students through ancient wisdom and modern digital learning.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendVerificationEmail(name, email, otp) {
    const body = `
      <p>Namaste, <strong>${name}</strong>!</p>
      <p>Welcome to AyurvedaLearn! To complete your registration, please verify your email address using the One-Time Password (OTP) below:</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #166534; font-size: 24px; font-weight: 700; text-align: center; color: #166534; letter-spacing: 5px; margin: 20px 0;">
        ${otp}
      </div>
      <p>This OTP is valid for <strong>1 hour</strong>. If you didn't create an account, please ignore this email.</p>
    `;
    return this.sendEmail(email, 'Verify your email - AyurvedaLearn', this.getTemplate('Email Verification OTP', body));
  }

  async sendForgotPasswordEmail(name, email, token) {
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const body = `
      <p>Hello <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p>This reset link will expire in <strong>15 minutes</strong>.</p>
    `;
    return this.sendEmail(email, 'Reset your password - AyurvedaLearn', this.getTemplate('Password Reset Request', body, 'Reset My Password', link));
  }

  async sendWelcomeEmail(name, email) {
    const body = `
      <p>Namaste <strong>${name}</strong>,</p>
      <p>You are now a verified member of AyurvedaLearn. Your portal to advanced Ayurvedic curriculum is open.</p>
      <p>Explore subjects like Dravyaguna, Rog Nidan, and more with our premium materials.</p>
    `;
    return this.sendEmail(email, 'Welcome to AyurvedaLearn!', this.getTemplate('Account Verified', body, 'Go to Dashboard', `${process.env.FRONTEND_URL}/dashboard`));
  }

  async sendEnrollmentEmail(name, email, courseTitle) {
    const body = `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Congratulations! You have successfully enrolled in <strong>${courseTitle}</strong>.</p>
      <p>Your journey towards mastering clinical Ayurveda just took a significant step forward.</p>
    `;
    return this.sendEmail(email, `Enrolled: ${courseTitle}`, this.getTemplate('Enrollment Confirmed', body, 'Start Learning', `${process.env.FRONTEND_URL}/my-courses`));
  }

  async sendDailyReminder(name, email, topicTip) {
    const body = `
      <p>Namaste <strong>${name}</strong>,</p>
      <p>Here is your Daily Ayurveda Wisdom Nugget:</p>
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #166534; font-style: italic;">
        "${topicTip}"
      </div>
      <p>Keep the momentum going! Just 15 minutes of study today makes a difference.</p>
    `;
    return this.sendEmail(email, 'Daily Ayurveda Reminder', this.getTemplate('Day 15 Momentum!', body, 'Continue Study', `${process.env.FRONTEND_URL}/dashboard`));
  }
}

module.exports = new EmailService();
