// Sample company details
const companies = [
  { companyName: 'Tech Solutions', role: 'Software Intern', skills: ['JavaScript', 'React', 'Node.js'], location: 'Remote', email: 'hr@techsolutions.com' },
  { companyName: 'Data Insights', role: 'Data Analyst Intern', skills: ['Python', 'Data Analysis', 'SQL'], location: 'Mumbai', email: 'contact@datainsights.com' },
  { companyName: 'Web Innovators', role: 'Frontend Developer Intern', skills: ['HTML', 'CSS', 'JavaScript'], location: 'Bangalore', email: 'jobs@webinnovators.com' },
  { companyName: 'CloudNet', role: 'Cloud Engineer Intern', skills: ['AWS', 'Docker', 'Kubernetes'], location: 'Remote', email: 'careers@cloudnet.com' },
  { companyName: 'AI Labs', role: 'AI Research Intern', skills: ['Python', 'Machine Learning', 'TensorFlow'], location: 'Pune', email: 'hr@ailabs.com' }
];

// Helper function to check skill match
function hasSkillMatch(studentSkills, companySkills) {
  const studentSet = new Set(studentSkills.map(s => s.toLowerCase()));
  return companySkills.some(skill => studentSet.has(skill.toLowerCase()));
}

// Function to handle form submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    skills: document.getElementById('skills').value,
    location: document.getElementById('location').value
  };

  // Store student details temporarily in localStorage
  localStorage.setItem('student', JSON.stringify(data));

  // Perform matching locally
  performMatching(data);
});

// Function to perform matching and display results
function performMatching(student) {
  const skillList = student.skills ? student.skills.split(',').map(s => s.trim()) : [];
  const matches = companies.filter(company => {
    const locationMatch = !company.location || !student.location || company.location.toLowerCase() === student.location.toLowerCase();
    const skillMatch = hasSkillMatch(skillList, company.skills);
    return locationMatch && skillMatch;
  });

  displayMatches(matches);
}

// Function to display matches
function displayMatches(matches) {
  const matchesDiv = document.getElementById('matches');
  const matchesList = document.getElementById('matchesList');

  matchesList.innerHTML = '';
  matchesDiv.style.display = 'block';

  if (matches.length === 0) {
    matchesList.innerHTML = '<p>No matching internships found.</p>';
  } else {
    matches.forEach(match => {
      const matchDiv = document.createElement('div');
      matchDiv.className = 'card mb-3';
      matchDiv.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${match.companyName} - ${match.role}</h5>
          <p class="card-text">Required Skills: ${match.skills.join(', ')}</p>
          <p class="card-text">Location: ${match.location}</p>
          <p class="card-text">Contact: ${match.email}</p>
        </div>
      `;
      matchesList.appendChild(matchDiv);
    });
  }
}
