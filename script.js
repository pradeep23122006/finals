// Function to handle form submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
  console.log('Form submitted');
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
  console.log('Performing matching');
  const skillList = student.skills ? student.skills.split(',').map(s => s.trim()) : [];
  let matches = companies.filter(company => {
    const locationMatch = !company.location || !student.location || company.location.toLowerCase() === student.location.toLowerCase();
    const skillMatch = hasSkillMatch(skillList, company.skills);
    return locationMatch && skillMatch;
  });

  if (matches.length < 2) {
    const defaultCompanies = companies.slice(0, 2);
    matches = [...new Set([...matches, ...defaultCompanies])];
  }

  displayMatches(matches);
}

// Function to display matches
function displayMatches(matches) {
  console.log('Displaying matches:', matches);
  const matchesDiv = document.getElementById('matches');
  const matchesList = document.getElementById('matchesList');

  matchesList.innerHTML = '';
  matchesDiv.style.display = 'block';

  if (matches.length === 0) {
    matchesList.innerHTML = '<p>No matching internships found.</p>';
  } else {
    matchesList.innerHTML = '<h3>Matching Internship Opportunities</h3><p>Here are some internships that match your skills and preferences. Click the Apply button to submit your application.</p>';
    matches.forEach(match => {
      const matchDiv = document.createElement('div');
      matchDiv.className = 'card mb-3';
      matchDiv.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${match.companyName} - ${match.role}</h5>
          <p class="card-text"><b>Description:</b> ${match.description}</p>
          <p class="card-text"><b>Required Skills:</b> ${match.skills.join(', ')}</p>
          <p class="card-text"><b>Location:</b> ${match.location}</p>
          <p class="card-text"><b>Contact:</b> ${match.email}</p>
          <button class="btn btn-primary">Apply</button>
        </div>
      `;
      matchesList.appendChild(matchDiv);
    });
  }
}
