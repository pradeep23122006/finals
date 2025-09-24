const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration with safety check
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('Email transporter configured successfully.');
} else {
  console.warn('****************************************************************');
  console.warn('*** WARNING: EMAIL_USER or EMAIL_PASS not set in environment. ***');
  console.warn('*** Email functionality will be disabled.                      ***');
  console.warn('****************************************************************');
}

// Email templates
const emailTemplates = {
  student: {
    subject: 'Registration Successful',
    text: 'Hello [Student Name], your registration has been successfully completed. Welcome aboard!'
  },
  company: {
    subject: 'Registration Successful',
    text: 'Hello [Company Name], your registration has been successfully completed. We’re excited to have your company with us.'
  }
};

// Helper function to send email
async function sendEmail(to, template, replacements) {
  if (!transporter) {
    console.error('Attempted to send email, but transporter is not configured.');
    throw new Error('Email service is not configured by the server administrator.');
  }

  let text = emailTemplates[template].text;
  for (const [key, value] of Object.entries(replacements)) {
    text = text.replace(`[${key}]`, value);
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: emailTemplates[template].subject,
    text: text
  };

  // This will throw an error if sending fails, which will be caught by the route handler.
  await transporter.sendMail(mailOptions);
  console.log('Email sent successfully to', to);
}

// Student registration route
app.post('/api/register/student', async (req, res) => {
  const { name, email, skills, location } = req.body;

  if (!name || !email || !skills || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sendEmail(email, 'student', { 'Student Name': name });
    res.json({ message: 'Student registration successful. Confirmation email sent.' });
  } catch (error) {
    // Send the specific error message back to the client
    res.status(500).json({ message: error.message });
  }
});

// Company registration route
app.post('/api/register/company', async (req, res) => {
  const { companyName, role, skills, location, email } = req.body;

  if (!companyName || !email || !role || !skills || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sendEmail(email, 'company', { 'Company Name': companyName });
    res.json({ message: 'Company registration successful. Confirmation email sent.' });
  } catch (error) {
    // Send the specific error message back to the client
    res.status(500).json({ message: error.message });
  }
});

// --- HTML Serving Routes ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/schemes', (req, res) => {
  res.sendFile(path.join(__dirname, 'schemes.html'));
});

app.get('/eligibility', (req, res) => {
  res.sendFile(path.join(__dirname, 'eligibility.html'));
});

app.get('/company', (req, res) => {
  res.sendFile(path.join(__dirname, 'company.html'));
});

app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname, 'student.html'));
});


// Export for Vercel serverless function
module.exports = app;