// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Handle dropdown hover behavior for desktop
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  
  // Only apply hover behavior on devices that support hover (desktop)
  if (window.matchMedia('(min-width: 992px)').matches) {
    dropdown.addEventListener('mouseenter', function() {
      this.classList.add('show');
      this.querySelector('.dropdown-menu').classList.add('show');
    });
    
    dropdown.addEventListener('mouseleave', function() {
      this.classList.remove('show');
      this.querySelector('.dropdown-menu').classList.remove('show');
    });
    
    // Prevent click from toggling on desktop
    dropdownToggle.addEventListener('click', function(e) {
      if (window.matchMedia('(min-width: 992px)').matches) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      }
    });
  }

  // Theme switching functionality
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check for saved theme preference or use default (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(savedTheme + '-theme');
  
  // Update icon based on current theme
  updateThemeIcon(savedTheme);
  
  // Theme toggle click handler
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
  
  // Function to update theme icon
  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  }
  
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          // Close mobile menu if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
          }
          
          // Calculate position accounting for fixed header
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

  // Image lazy loading with fade-in effect
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
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

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }

  // Back to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  // Initialize lightbox for project images
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.image-link',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
  
  // Add active class to nav items based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function onScroll() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 100)) {
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
  
  // Navbar background change on scroll
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      header.style.backgroundColor = 'var(--dark-bg)';
      header.style.boxShadow = 'var(--box-shadow)';
    } else {
      header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
      header.style.boxShadow = 'none';
    }
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (valid) {
        // Submit the form
        contactForm.submit();
      }
    });
  }
}); 