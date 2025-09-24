const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

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

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile.html'));
});


// Export for Vercel serverless function
module.exports = app;
