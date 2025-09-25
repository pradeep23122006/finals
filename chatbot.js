// AI Chatbot Logic for PM Internship Scheme Website
document.addEventListener('DOMContentLoaded', function() {
  const chatbotBtn = document.getElementById('chatbot-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (!chatbotBtn || !chatWindow || !closeChat || !chatForm || !chatInput || !chatMessages) {
    console.error('Chatbot elements not found. Ensure HTML structure is added to the page.');
    return;
  }

  // Predefined responses based on keywords
  const responses = {
    'internship|scheme': "The PM Internship Scheme, launched by the Ministry of Corporate Affairs, offers 12-month internships in the top 500 companies for eligible students. Monthly stipend: Rs. 25,000 + Rs. 2,500 for insurance. It aims to provide 1 crore internships over 5 years to skill the youth.",
    'apply|register|application': "To apply as a student: Visit the 'Student Registration' page (student.html), fill in your name, email, skills, and preferred location, then submit. For companies: Use 'Company Registration' (company.html) to post opportunities. After registration, check your email for confirmation.",
    'eligibility|criteria|qualify': "Eligibility: Indian citizen, pursuing 2nd/3rd year of UG or PG (technical/non-technical), or 3rd year of 5-year integrated program. Minimum 60% marks in 10th, 12th, and Diploma/UG. Age: 21-24 years. No family income limit. Full details on eligibility.html.",
    'how to apply|steps': "Steps: 1. Register/Login on the website. 2. Go to Student/Company Registration page. 3. Fill the form with required details. 4. Submit and receive confirmation email. 5. Await matching and allocation. Guidelines on guidelines.html.",
    'website|pages|navigation': "This website is for PM Internship Scheme. Key pages: Home (index.html) - Overview; Login/Signup - Access account; Student Registration (student.html) - Apply as student; Company Registration (company.html) - Post internships; Guidelines/Eligibility/Schemes - Info; Profile - Dashboard; Contact - Support.",
    'contact|support|help': "Contact: Email - support@pminternship.gov.in; Phone - +91-11-12345678. For queries, visit contact.html or type your doubt here.",
    'help|topics': "I can help with: PM Internship Scheme details, eligibility criteria, how to apply/register, website navigation. Ask something like 'What is eligibility?' or 'How to apply?'",
    default: "I'm the PM Internship Assistant. I can answer questions about the scheme, eligibility, application process, and website usage. Try asking 'What is the PM Internship Scheme?' or 'How do I apply?'"
  };

  let messages = []; // Store chat history

  // Function to add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;

    chatMessages.appendChild(messageDiv);
    messages.push({ text, isUser });

    // Limit to 10 messages
    if (messages.length > 10) {
      const oldest = chatMessages.firstChild;
      if (oldest) chatMessages.removeChild(oldest);
      messages.shift();
    }

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to get bot response
  function getBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase().trim();
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && new RegExp(key.split('|').join('|')).test(lowerInput)) {
        return response;
      }
    }
    return responses.default;
  }

  // Toggle chat window
  chatbotBtn.addEventListener('click', function() {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open') && messages.length === 0) {
      // Welcome message on first open
      setTimeout(() => addMessage("Hi! I'm the PM Internship Assistant. How can I help you today? Ask about the scheme, eligibility, or how to apply."), 200);
    }
  });

  // Close chat
  closeChat.addEventListener('click', function() {
    chatWindow.classList.remove('open');
  });

  // Close on outside click
  document.addEventListener('click', function(event) {
    if (!chatWindow.contains(event.target) && !chatbotBtn.contains(event.target)) {
      chatWindow.classList.remove('open');
    }
  });

  // Send message
  chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputText = chatInput.value.trim();
    if (inputText === '') return;

    addMessage(inputText, true);
    chatInput.value = '';

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      addMessage(botResponse);
    }, 800);
  });

  // Enter key to send
  chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  // Initial hide if not present
  chatWindow.classList.remove('open');
});
