document.getElementById('studentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Show loading animation
  const studentForm = document.getElementById('studentForm');
  const spinner = document.getElementById('spinner');
  const matchesDiv = document.getElementById('matches');
  
  studentForm.style.display = 'none';
  spinner.style.display = 'block';
  matchesDiv.style.display = 'none';

  // Simulate loading with delay
  setTimeout(() => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skills = document.getElementById('skills').value;
    const studentSkills = skills.split(',').map(skill => skill.trim().toLowerCase());
    
    const locationSelect = document.getElementById('location');
    let preferredLocation = locationSelect.value;
    if (preferredLocation === 'Other') {
      preferredLocation = document.getElementById('otherLocation').value;
    }
    preferredLocation = preferredLocation.toLowerCase();

    // Temporarily store student data in localStorage
    const studentData = { name, email, skills, location: preferredLocation };
    localStorage.setItem('studentData', JSON.stringify(studentData));

    let matches = companies.filter(company => {
      const companySkills = company.skills.map(skill => skill.toLowerCase());
      const companyLocation = company.location.toLowerCase();

      const hasMatchingSkill = studentSkills.some(studentSkill => companySkills.includes(studentSkill));
      const isMatchingLocation = preferredLocation === '' || companyLocation === preferredLocation || company.location === 'Remote';

      return hasMatchingSkill && isMatchingLocation;
    });

    // Ensure at least two matches; if fewer, add top overall samples
    if (matches.length < 2) {
      const topSamples = companies.slice(0, 2 - matches.length);
      matches = matches.concat(topSamples);
    }

    spinner.style.display = 'none';
    displayMatches(matches.slice(0, 2));
  }, 2000); // 2 second delay for loading effect
});

function displayMatches(matches) {
  const matchesDiv = document.getElementById('matches');
  const matchesList = document.getElementById('matchesList');

  matchesList.innerHTML = '';

  if (matches.length > 0) {
    matches.forEach(company => {
      const card = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${company.companyName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${company.role}</h6>
            <p class="card-text"><strong>Location:</strong> ${company.location}</p>
            <p class="card-text"><strong>Skills:</strong> ${company.skills.join(', ')}</p>
            <p class="card-text">${company.description}</p>
            <a href="mailto:${company.email}" class="btn btn-primary">Apply</a>
          </div>
        </div>
      `;
      matchesList.innerHTML += card;
    });
    matchesDiv.style.display = 'block';
  } else {
    matchesList.innerHTML = '<p>No matching internships found.</p>';
    matchesDiv.style.display = 'block';
  }
}
