document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Sticky Header scroll effect
  // ==========================================
  const header = document.getElementById('header');
  const scrollThreshold = 20;

  function toggleHeaderSticky() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', toggleHeaderSticky);
  toggleHeaderSticky(); // Initial check on load

  // ==========================================
  // 2. Mobile Menu Navigation
  // ==========================================
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll locking when mobile menu is open
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ==========================================
  // 3. Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once the section reveals, we stop observing it
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15, // trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // adjust bottom margin slightly
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================
  // 4. Active Navigation Scroll Spy
  // ==========================================
  const sections = document.querySelectorAll('section');
  
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.4 // trigger when 40% of the section is visible
  });

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });

  // ==========================================
  // 5. Contact Form Client Validation & Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Get input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation checks
    if (!name || !email || !phone || !message) {
      showFormStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    if (!isValidPhone(phone)) {
      showFormStatus('Please enter a valid 10-digit phone number (e.g. 414-455-5899 or 4144555899).', 'error');
      return;
    }

    // Simulate form submission to backend (API call)
    // Disable submit button during processing
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Message...';

    setTimeout(() => {
      // Re-enable button and reset form
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      contactForm.reset();

      // Show beautiful success status
      showFormStatus('Thank you for contacting HavenSpring! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
    }, 1200); // 1.2 second simulated network latency
  });

  function showFormStatus(text, type) {
    formStatus.textContent = text;
    formStatus.classList.add(type);
    formStatus.style.display = 'block';

    // Auto-scroll slightly to show the message status if on small screen
    if (window.innerWidth < 768) {
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    // Matches common formats: 10 digits total, allowing spaces, dots, dashes, parentheses
    const phoneRegex = /^\+?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  }

  // Hero is now static background with no slider animation

});
