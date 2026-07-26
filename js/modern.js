// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Handle dropdown hover behavior for desktop - safe guards
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  
  if (dropdown && dropdownToggle) {
    const handleHover = window.matchMedia('(min-width: 992px)').matches;
    if (handleHover) {
      dropdown.addEventListener('mouseenter', function() {
        this.classList.add('show');
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.add('show');
      });
      
      dropdown.addEventListener('mouseleave', function() {
        this.classList.remove('show');
        const menu = this.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
      });
      
      dropdownToggle.addEventListener('click', function(e) {
        if (window.matchMedia('(min-width: 992px)').matches) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (href && href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
              const headerHeight = document.querySelector('header').offsetHeight;
              const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
              });
            }
          }
        }
      });
    }
  }

  // Theme switching functionality - respects system preference
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  const getSystemTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const savedTheme = localStorage.getItem('theme') || getSystemTheme();
  document.body.classList.add(savedTheme + '-theme');
  
  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  updateThemeIcon(savedTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      } else {
        document.body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }
  
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap ? bootstrap.Collapse.getInstance(navbarCollapse) : null;
            if (bsCollapse) bsCollapse.hide();
            else navbarCollapse.classList.remove('show');
          }
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Image lazy loading enhancement - also handle native lazy
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backToTopButton.classList.add('active');
      else backToTopButton.classList.remove('active');
    });
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initialize lightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.image-link',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
  
  // Active nav tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  function onScroll() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', onScroll);
  
  // Navbar background on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        header.style.boxShadow = 'var(--box-shadow)';
      } else {
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // Contact form - validation + mailto fallback (Formspree deprecated email endpoint)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
        }
      });
      
      if (!valid) return;

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('_replyto') || formData.get('email') || '';
      const phone = formData.get('tel') || '';
      const message = formData.get('message') || '';

      // If form action is placeholder or not configured, use mailto
      const action = contactForm.getAttribute('action') || '';
      const isPlaceholder = action.includes('YOUR_FORM_ID') || action.includes('formspree.io/vaibhavgovilkar88') || !action || action === '#';

      if (isPlaceholder) {
        const subject = encodeURIComponent(`Contact from ${name} via portfolio`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
        window.location.href = `mailto:vaibhavgovilkar88@gmail.com?subject=${subject}&body=${body}`;
        
        // Show feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check me-2"></i>Email client opened';
          btn.disabled = true;
          setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
          }, 3000);
        }
        return;
      }

      // Otherwise submit to Formspree if configured
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          const btn = contactForm.querySelector('button[type="submit"]');
          if (btn) {
            btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
            btn.classList.replace('btn-primary', 'btn-success');
            setTimeout(() => {
              btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
              btn.classList.replace('btn-success', 'btn-primary');
            }, 3000);
          }
        } else {
          alert('Oops! There was a problem sending your message. Please email me directly at vaibhavgovilkar88@gmail.com');
        }
      }).catch(() => {
        // fallback to mailto
        const subject = encodeURIComponent(`Contact from ${name} via portfolio`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
        window.location.href = `mailto:vaibhavgovilkar88@gmail.com?subject=${subject}&body=${body}`;
      });
    });
  }
});
