function hasSkillMatch(studentSkills, companySkills) {
  const studentSet = new Set(studentSkills.map(s => s.toLowerCase()));
  return companySkills.some(skill => studentSet.has(skill.toLowerCase()));
}

document.getElementById('studentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    skills: document.getElementById('skills').value,
    location: document.getElementById('location').value
  };

  localStorage.setItem('student', JSON.stringify(data));

  performMatching(data);
});

function performMatching(student) {
  const skillList = student.skills ? student.skills.split(',').map(s => s.trim().toLowerCase()) : [];
  const matches = companies.filter(company => {
    const locationMatch = !company.location || !student.location || company.location.toLowerCase() === student.location.toLowerCase();
    const skillMatch = company.skills.some(skill => skillList.includes(skill.toLowerCase()));
    return locationMatch && skillMatch;
  });

  // Show only 2 matches
  const limitedMatches = matches.slice(0, 2);

  displayMatches(limitedMatches);
}

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
          <button class="btn btn-primary btn-sm apply-btn" data-email="${match.email}">Apply</button>
          <p class="mt-2"><strong>Instructions:</strong> Please contact the company via email to apply.</p>
        </div>
      `;
      matchesList.appendChild(matchDiv);
    });

    // Add event listeners to apply buttons
    document.querySelectorAll('.apply-btn').forEach(button => {
      button.addEventListener('click', () => {
        const email = button.getAttribute('data-email');
        alert(`To apply, please send your application to: ${email}`);
      });
    });
  }
}
