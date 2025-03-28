// Constants and Utility Functions
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1354610750261297277/lizrEeuzjv4_rqsqsOLmzxQ_J7YhQLk-AjZNggTHA4casWPDOGOulmFQgIH3PYIHkNXg";

const AI_RESPONSES = [
  "I'm happy to help! Based on your question, there are several aspects to consider. First, AI technologies like mine use advanced neural networks to process and understand natural language. This allows us to analyze context, recognize patterns, and generate relevant responses.",
  "That's an interesting question. DG8AB AI systems are designed to handle complex queries by breaking them down into manageable components. Our models are trained on diverse datasets to ensure comprehensive understanding and accurate responses.",
  "Great question! Our AI solutions employ sophisticated algorithms that continuously learn and improve. This adaptive approach allows us to provide increasingly relevant and personalized responses over time.",
  "I understand what you're asking. The DG8AB approach combines transformer architecture with proprietary enhancements for superior comprehension and response generation. This enables more natural conversations and deeper insights.",
  "Thanks for your question. DG8AB AI systems are built with scalability in mind, allowing them to handle everything from simple queries to complex problem-solving scenarios across various domains and industries."
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMobile = document.querySelector('.navbar-mobile');
  
  // Accordion functionality for FAQ section
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  // Form elements
  const contactForm = document.getElementById('contact-form');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');

  // Scroll Animation
  function handleScrollAnimation() {
    const scrollElements = document.querySelectorAll('.scroll-trigger');
    
    scrollElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const isElementInView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.25;
      
      if (isElementInView) {
        el.classList.add('scroll-appear');
      }
    });
  }

  // Initialize scroll animation
  handleScrollAnimation();
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Navbar Scroll Effect
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Initialize navbar scroll effect
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);
  
  // Mobile Menu Toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarMobile.classList.toggle('active');
    });
  }
  
  // FAQ Accordion
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(accItem => {
        accItem.classList.remove('active');
      });
      
      // If the clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Chatbot Functionality
  if (chatForm && userInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const message = userInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addMessageToChat(message, true);
      userInput.value = '';
      
      // Show typing indicator
      showTypingIndicator();
      
      // Simulate AI response after delay
      setTimeout(() => {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing-indicator-container');
        if (typingIndicator) {
          typingIndicator.remove();
        }
        
        // Get random AI response
        const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
        addMessageToChat(randomResponse, false);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1500);
    });
  }
  
  function addMessageToChat(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = content;
    
    messageDiv.appendChild(messageParagraph);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator-container';
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      typingIndicator.appendChild(dot);
    }
    
    typingDiv.appendChild(typingIndicator);
    chatMessages.appendChild(typingDiv);
    
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Contact Form Validation and Submission
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const companyInput = document.getElementById('company');
      const messageInput = document.getElementById('message');
      const submitButton = document.getElementById('submit-button');
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
      });
      
      // Validate inputs
      let isValid = true;
      
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError('name-error', 'Name must be at least 2 characters');
        isValid = false;
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
      }
      
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('message-error', 'Message must be at least 10 characters');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Submit form
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Create form data object
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          company: companyInput.value.trim(),
          message: messageInput.value.trim()
        };
        
        // Send to Discord webhook
        await sendToDiscordWebhook(formData);
        
        // Show success message
        alert('Your message has been sent successfully! We\'ll be in touch soon.');
        
        // Reset form
        contactForm.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was a problem sending your message. Please try again.');
      } finally {
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
      }
    });
  }
  
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  async function sendToDiscordWebhook(formData) {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `**New Contact Form Submission**\n\n**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Company:** ${formData.company || 'Not provided'}\n**Message:**\n${formData.message}`,
      }),
    });
    
    return response;
  }
});