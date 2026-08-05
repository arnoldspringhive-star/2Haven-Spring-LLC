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
  // Check for successful FormSubmit redirect
  if (window.location.search.includes('success=true')) {
    const formContainer = document.getElementById('application-form-container');
    const successMsg = document.getElementById('application-success-msg');
    
    if (formContainer && successMsg) {
      formContainer.style.display = 'none';
      successMsg.style.display = 'block';
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => {
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // Careers Form Native Submission with dynamic redirect
  const careersForm = document.getElementById('careersForm');
  if (careersForm) {
    careersForm.addEventListener('submit', function(e) {
      const submitBtn = document.getElementById('submitBtn');
      if(submitBtn) {
        submitBtn.innerText = 'Redirecting to Security Check...';
        submitBtn.disabled = true;
      }
      
      // Inject the _next parameter for FormSubmit to redirect back to this page with success=true
      let nextInput = careersForm.querySelector('input[name="_next"]');
      if (!nextInput) {
        nextInput = document.createElement('input');
        nextInput.type = 'hidden';
        nextInput.name = '_next';
        careersForm.appendChild(nextInput);
      }
      // Use absolute URL for FormSubmit _next parameter
      const absoluteUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?success=true";
      nextInput.value = absoluteUrl;
    });
  }
});
