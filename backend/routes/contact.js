// routes/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Load from .env
const EMAIL_USER = process.env.CONTACT_EMAIL;
const EMAIL_PASS = process.env.CONTACT_PASS;

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: [
      'buket.alkan@vanderbilt.edu',
      'rohit.sharma.1@vanderbilt.edu',
      'giorgioa02@gmail.com',
    ],
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('[✓] Contact email sent');
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('[!] Email sending failed:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
