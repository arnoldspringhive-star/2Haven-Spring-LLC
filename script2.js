document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !expanded);
    });
  }

  // Header Scroll State
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.9;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Trigger once on load

  // Magnetic Button Effect
  const magneticBtns = document.querySelectorAll('.magnetic');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Reduce transition time while moving for snappy feel
      btn.style.transition = 'transform 0.1s ease';
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      // Restore smooth transition
      btn.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Careers Form AJAX Submission & Validation
  const careersForm = document.getElementById('careersForm');
  if (careersForm) {
    careersForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent standard redirect
      
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerText;
      
      // Inline validation for ReCAPTCHA
      const recaptchaResponse = grecaptcha ? grecaptcha.getResponse() : '';
      if (recaptchaResponse.length === 0) {
        alert('Please complete the reCAPTCHA verification before submitting.');
        return;
      }
      
      // Show loading state
      submitBtn.innerText = 'Submitting Application...';
      submitBtn.disabled = true;
      
      const formData = new FormData(careersForm);
      
      fetch(careersForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Hide form and show success message
          document.getElementById('application-form-container').style.display = 'none';
          document.getElementById('application-success-msg').style.display = 'block';
          
          // Optionally scroll to top of the success message
          document.getElementById('application-success-msg').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was a problem submitting your application. Please try again later or contact us directly.');
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});
