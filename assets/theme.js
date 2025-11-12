/**
 * EVERLINK THEME JAVASCRIPT
 * Vanilla JavaScript for theme interactivity
 * Luxury NFC Jewelry - Clean, elegant, accessible
 */

(function() {
  'use strict';

  // ==================
  // DOM READY
  // ==================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initLazyLoading();
    initFormValidation();
    initProductCardInteractions();
    initAccessibility();
  }

  // ==================
  // MOBILE MENU TOGGLE
  // ==================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.header__nav');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
      const isActive = mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);

      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.header__nav') && !event.target.closest('.header__menu-toggle')) {
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });

    // Close menu on window resize to desktop width
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }, 250);
    });
  }

  // ==================
  // STICKY HEADER
  // ==================
  function initStickyHeader() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScrollTop = scrollTop;
    }, { passive: true });
  }

  // ==================
  // SMOOTH SCROLL
  // ==================
  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignore empty hash or just "#"
        if (!href || href === '#') return;

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          // Close mobile menu if open
          const mobileMenu = document.querySelector('.header__nav');
          const menuToggle = document.querySelector('.header__menu-toggle');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (menuToggle) {
              menuToggle.classList.remove('active');
              menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
          }

          // Get header height for offset
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;

          // Smooth scroll to target
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update focus for accessibility
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // ==================
  // LAZY LOAD IMAGES
  // ==================
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');

            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(function(img) {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
      });
    }
  }

  // ==================
  // FORM VALIDATION (Newsletter)
  // ==================
  function initFormValidation() {
    const newsletterForm = document.querySelector('.newsletter__form');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
      const emailInput = this.querySelector('input[type="email"]');

      if (!emailInput) return;

      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        e.preventDefault();

        // Show error message
        let errorMessage = this.querySelector('.newsletter__validation-error');
        if (!errorMessage) {
          errorMessage = document.createElement('div');
          errorMessage.className = 'newsletter__validation-error newsletter__error';
          errorMessage.setAttribute('role', 'alert');
          this.insertBefore(errorMessage, this.firstChild);
        }
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';

        emailInput.focus();
        emailInput.setAttribute('aria-invalid', 'true');
      } else {
        emailInput.removeAttribute('aria-invalid');
      }
    });

    // Remove error on input
    const emailInputs = document.querySelectorAll('.newsletter__input[type="email"]');
    emailInputs.forEach(function(input) {
      input.addEventListener('input', function() {
        const form = this.closest('form');
        const errorMessage = form ? form.querySelector('.newsletter__validation-error') : null;

        if (errorMessage) {
          errorMessage.style.display = 'none';
        }

        this.removeAttribute('aria-invalid');
      });
    });
  }

  // ==================
  // PRODUCT CARD INTERACTIONS
  // ==================
  function initProductCardInteractions() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(function(card) {
      // Add hover effect with slight delay for smoothness
      let hoverTimeout;

      card.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(function() {
          card.style.transform = 'translateY(-8px)';
        }, 50);
      });

      card.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
        card.style.transform = 'translateY(0)';
      });

      // Add keyboard navigation support
      const link = card.querySelector('.product-card__link');
      if (link) {
        link.addEventListener('focus', function() {
          card.style.transform = 'translateY(-8px)';
        });

        link.addEventListener('blur', function() {
          card.style.transform = 'translateY(0)';
        });
      }
    });
  }

  // ==================
  // ACCESSIBILITY ENHANCEMENTS
  // ==================
  function initAccessibility() {
    // Track mouse vs keyboard usage for focus styles
    document.addEventListener('mousedown', function() {
      document.body.classList.add('using-mouse');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }

      // Close mobile menu on Escape
      if (e.key === 'Escape') {
        const mobileMenu = document.querySelector('.header__nav');
        const menuToggle = document.querySelector('.header__menu-toggle');

        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
          }
          document.body.style.overflow = '';
        }
      }
    });

    // Trap focus in mobile menu when open
    const mobileMenu = document.querySelector('.header__nav');
    if (mobileMenu) {
      mobileMenu.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab' || !this.classList.contains('active')) return;

        const focusableElements = this.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      });
    }

    // Add ARIA labels to elements that need them
    const socialLinks = document.querySelectorAll('.footer__social a');
    socialLinks.forEach(function(link) {
      if (!link.getAttribute('aria-label')) {
        const href = link.getAttribute('href');
        if (href && href.includes('instagram')) {
          link.setAttribute('aria-label', 'Visit our Instagram page');
        } else if (href && href.includes('facebook')) {
          link.setAttribute('aria-label', 'Visit our Facebook page');
        } else if (href && href.includes('pinterest')) {
          link.setAttribute('aria-label', 'Visit our Pinterest page');
        }
      }
    });
  }

  // ==================
  // PERFORMANCE: Debounce utility
  // ==================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ==================
  // SCROLL REVEAL ANIMATION (Optional Enhancement)
  // ==================
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll(
      '.value-item, .product-card, .testimonial-card, .about__content'
    );

    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(element);
    });
  }

  // Initialize scroll reveal after a short delay
  setTimeout(initScrollReveal, 100);

  // ==================
  // PUBLIC API (if needed for theme extensions)
  // ==================
  window.EverlinkTheme = {
    init: init,
    version: '1.0.0'
  };

})();
