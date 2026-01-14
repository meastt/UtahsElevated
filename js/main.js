/**
 * Utah's Elevated Real Estate
 * Main JavaScript - Interactions & Scroll Animations
 */

(function() {
  'use strict';

  // ----------------------------------------
  // DOM Elements
  // ----------------------------------------
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.section-nav__dot');
  const menuToggle = document.querySelector('.header__menu-toggle');
  const mobileNav = document.querySelector('.header__nav');
  const contactForm = document.getElementById('contact-form');

  // ----------------------------------------
  // Header Scroll Effect
  // ----------------------------------------
  function initHeaderScroll() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      // Add scrolled class when past first section
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ----------------------------------------
  // Section Observer - Animations & Nav Dots
  // ----------------------------------------
  function initSectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add active class to section for animations
          entry.target.classList.add('active');
          
          // Update navigation dots
          updateNavDots(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // ----------------------------------------
  // Update Navigation Dots
  // ----------------------------------------
  function updateNavDots(activeId) {
    navDots.forEach(dot => {
      const href = dot.getAttribute('href');
      if (href === `#${activeId}`) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  // ----------------------------------------
  // Smooth Scroll for Navigation
  // ----------------------------------------
  function initSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          // Close mobile menu if open
          if (mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
          }
          
          target.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Update URL without scrolling
          history.pushState(null, null, href);
        }
      });
    });
  }

  // ----------------------------------------
  // Mobile Menu Toggle
  // ----------------------------------------
  function initMobileMenu() {
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('active') && 
          !mobileNav.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ----------------------------------------
  // Contact Form Handling
  // ----------------------------------------
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      // Simple validation
      if (!data.name || !data.email) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      // In production, replace with actual form endpoint
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showFormMessage('Thank you! We\'ll be in touch soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = contactForm.querySelector('.form__message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form__message form__message--${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
      color: ${type === 'success' ? '#155724' : '#721c24'};
    `;
    
    // Insert at top of form
    contactForm.insertBefore(messageEl, contactForm.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  // ----------------------------------------
  // Testimonial Carousel (Basic)
  // ----------------------------------------
  function initTestimonialCarousel() {
    const dots = document.querySelectorAll('.testimonial__dot');
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Update active states
        dots.forEach(d => {
          d.classList.remove('active');
          d.setAttribute('aria-current', 'false');
        });
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
        
        // In production, this would switch testimonials
        // For now, just updates the visual state
      });
    });
  }

  // ----------------------------------------
  // Keyboard Navigation
  // ----------------------------------------
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Arrow key navigation between sections
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;
        
        const currentIndex = Array.from(sections).indexOf(activeSection);
        let targetIndex;
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
          targetIndex = currentIndex + 1;
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        }
        
        if (targetIndex !== undefined) {
          sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // ----------------------------------------
  // Lazy Load Images
  // ----------------------------------------
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ----------------------------------------
  // Initialize on DOM Ready
  // ----------------------------------------
  function init() {
    initHeaderScroll();
    initSectionObserver();
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
    initTestimonialCarousel();
    initKeyboardNav();
    initLazyLoad();
    
    // Mark first section as active on load
    if (sections.length > 0) {
      sections[0].classList.add('active');
    }
    
    console.log('Utah\'s Elevated Real Estate - Site initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
