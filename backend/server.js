const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com', // Replace with your Gmail address
    pass: 'yourgmailpassword'    // Replace with your Gmail app password or actual password
  }
});

// In-memory storage for students and companies
const students = [];
const companies = [
  {
    companyName: 'Tech Solutions',
    role: 'Software Intern',
    skills: ['JavaScript', 'React', 'Node.js'],
    location: 'Remote',
    email: 'hr@techsolutions.com'
  },
  {
    companyName: 'Data Insights',
    role: 'Data Analyst Intern',
    skills: ['Python', 'Data Analysis', 'SQL'],
    location: 'Mumbai',
    email: 'contact@datainsights.com'
  },
  {
    companyName: 'Web Innovators',
    role: 'Frontend Developer Intern',
    skills: ['HTML', 'CSS', 'JavaScript'],
    location: 'Bangalore',
    email: 'jobs@webinnovators.com'
  }
];

// Helper function to check skill match
function hasSkillMatch(studentSkills, companySkills) {
  const studentSet = new Set(studentSkills.map(s => s.toLowerCase()));
  return companySkills.some(skill => studentSet.has(skill.toLowerCase()));
}

// Endpoint for student registration email and storing data
app.post('/api/register/student', (req, res) => {
  const { name, email, skills, location } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const skillList = skills ? skills.split(',').map(s => s.trim()) : [];

  // Store student data
  students.push({ name, email, skills: skillList, location });

  // Send confirmation email (don't fail registration if email fails)
  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'Student Registration Successful',
    text: `Dear ${name},\n\nThank you for registering as a student.\n\nDetails:\nSkills: ${skillList.join(', ')}\nPreferred Location: ${location}\n\nBest regards,\nAI Internship Allocation Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });

  res.json({ message: 'Registration successful' });
});

// Endpoint for company registration email and storing data
app.post('/api/register/company', (req, res) => {
  const { companyName, role, skills, location, email } = req.body;
  if (!companyName || !role || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const skillList = skills ? skills.split(',').map(s => s.trim()) : [];

  // Store company data
  companies.push({ companyName, role, skills: skillList, location, email });

  // Send confirmation email (don't fail registration if email fails)
  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'Company Registration Successful',
    text: `Dear ${companyName},\n\nThank you for registering your company.\n\nDetails:\nRole: ${role}\nRequired Skills: ${skillList.join(', ')}\nLocation: ${location}\n\nBest regards,\nAI Internship Allocation Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });

  res.json({ message: 'Registration successful' });
});

// Endpoint to get matching internships for a student by email
app.get('/api/match/:email', (req, res) => {
  const email = req.params.email;
  const student = students.find(s => s.email === email);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  const matches = companies.filter(company => {
    const locationMatch = !company.location || !student.location || company.location.toLowerCase() === student.location.toLowerCase();
    const skillMatch = hasSkillMatch(student.skills, company.skills);
    return locationMatch && skillMatch;
  });
  res.json({ matches });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
