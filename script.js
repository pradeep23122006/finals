// Sample company details
const companies = [
  { companyName: 'Tech Solutions', role: 'Software Intern', skills: ['JavaScript', 'React', 'Node.js'], location: 'Remote', email: 'hr@techsolutions.com' },
  { companyName: 'Data Insights', role: 'Data Analyst Intern', skills: ['Python', 'Data Analysis', 'SQL'], location: 'Mumbai', email: 'contact@datainsights.com' },
  { companyName: 'Web Innovators', role: 'Frontend Developer Intern', skills: ['HTML', 'CSS', 'JavaScript'], location: 'Bangalore', email: 'jobs@webinnovators.com' },
  { companyName: 'CloudNet', role: 'Cloud Engineer Intern', skills: ['AWS', 'Docker', 'Kubernetes'], location: 'Remote', email: 'careers@cloudnet.com' },
  { companyName: 'AI Labs', role: 'AI Research Intern', skills: ['Python', 'Machine Learning', 'TensorFlow'], location: 'Pune', email: 'hr@ailabs.com' },
  { companyName: 'CyberSecure', role: 'Cybersecurity Intern', skills: ['Network Security', 'Python', 'Ethical Hacking'], location: 'Delhi', email: 'jobs@cybersecure.com' },
  { companyName: 'FinTech Corp', role: 'Financial Analyst Intern', skills: ['Excel', 'SQL', 'Data Analysis'], location: 'Mumbai', email: 'hr@fintechcorp.com' },
  { companyName: 'GreenTech', role: 'Sustainability Intern', skills: ['Research', 'Data Analysis', 'Excel'], location: 'Bangalore', email: 'contact@greentech.com' },
  { companyName: 'HealthPlus', role: 'Healthcare Data Intern', skills: ['Python', 'Data Science', 'R'], location: 'Chennai', email: 'hr@healthplus.com' },
  { companyName: 'EduSmart', role: 'EdTech Intern', skills: ['JavaScript', 'React', 'UI/UX'], location: 'Remote', email: 'jobs@edusmart.com' },
  { companyName: 'AutoDrive', role: 'Automotive Intern', skills: ['C++', 'Embedded Systems', 'Python'], location: 'Pune', email: 'careers@autodrive.com' },
  { companyName: 'MediaWorks', role: 'Digital Marketing Intern', skills: ['SEO', 'Content Writing', 'Social Media'], location: 'Delhi', email: 'hr@mediaworks.com' },
  { companyName: 'BuildIt', role: 'Civil Engineering Intern', skills: ['AutoCAD', 'Project Management', 'Excel'], location: 'Mumbai', email: 'jobs@buildit.com' },
  { companyName: 'DesignHub', role: 'Graphic Design Intern', skills: ['Photoshop', 'Illustrator', 'Creativity'], location: 'Bangalore', email: 'contact@designhub.com' },
  { companyName: 'TravelEase', role: 'Travel Consultant Intern', skills: ['Communication', 'Research', 'Excel'], location: 'Chennai', email: 'hr@travelease.com' },
  { companyName: 'RetailPro', role: 'Retail Management Intern', skills: ['Sales', 'Customer Service', 'Excel'], location: 'Delhi', email: 'jobs@retailpro.com' },
  { companyName: 'GameZone', role: 'Game Development Intern', skills: ['Unity', 'C#', '3D Modeling'], location: 'Remote', email: 'careers@gamezone.com' },
  { companyName: 'BioGen', role: 'Biotech Intern', skills: ['Research', 'Lab Work', 'Data Analysis'], location: 'Pune', email: 'hr@biogen.com' },
  { companyName: 'LogiTrack', role: 'Logistics Intern', skills: ['Excel', 'Data Analysis', 'Communication'], location: 'Mumbai', email: 'contact@logitrack.com' },
  { companyName: 'Foodies', role: 'Food Tech Intern', skills: ['Research', 'Marketing', 'Social Media'], location: 'Bangalore', email: 'jobs@foodies.com' },
  { companyName: 'SmartHome', role: 'IoT Intern', skills: ['Arduino', 'C++', 'Python'], location: 'Delhi', email: 'hr@smarthome.com' },
  { companyName: 'EcoEnergy', role: 'Renewable Energy Intern', skills: ['Research', 'Data Analysis', 'Excel'], location: 'Chennai', email: 'careers@ecoenergy.com' },
  { companyName: 'FinServe', role: 'Banking Intern', skills: ['Excel', 'Finance', 'Communication'], location: 'Mumbai', email: 'hr@finserve.com' },
  { companyName: 'TechWave', role: 'Software Testing Intern', skills: ['Selenium', 'Java', 'Automation'], location: 'Bangalore', email: 'jobs@techwave.com' },
  { companyName: 'Creative Minds', role: 'Content Creation Intern', skills: ['Writing', 'Video Editing', 'Social Media'], location: 'Remote', email: 'contact@creativeminds.com' },
  { companyName: 'DataStream', role: 'Big Data Intern', skills: ['Hadoop', 'Spark', 'Python'], location: 'Pune', email: 'hr@datastream.com' },
  { companyName: 'UrbanPlan', role: 'Urban Planning Intern', skills: ['GIS', 'Research', 'AutoCAD'], location: 'Delhi', email: 'jobs@urbanplan.com' },
  { companyName: 'SafeNet', role: 'Network Security Intern', skills: ['Networking', 'Python', 'Ethical Hacking'], location: 'Mumbai', email: 'careers@safenet.com' },
  { companyName: 'BrightFuture', role: 'Education Intern', skills: ['Teaching', 'Communication', 'Research'], location: 'Chennai', email: 'hr@brightfuture.com' },
  { companyName: 'NextGen', role: 'Robotics Intern', skills: ['C++', 'Robotics', 'Python'], location: 'Bangalore', email: 'jobs@nextgen.com' }
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

  // Skip sending registration to backend and directly perform matching
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
  const loadingDiv = document.getElementById('loading');

  // Show loading animation
  loadingDiv.style.display = 'block';
  matchesList.innerHTML = '';
  matchesDiv.style.display = 'block';

  // Delay display of results by 2 seconds
  setTimeout(() => {
    loadingDiv.style.display = 'none';

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
  }, 2000);
}
