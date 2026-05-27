// main.js - Revnat Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');

  const closeNavigation = () => {
    if (!header || !menuToggle || !primaryNavigation) return;
    header.classList.remove('is-open');
    primaryNavigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleNavigation = () => {
    if (!header || !menuToggle || !primaryNavigation) return;
    const isOpen = header.classList.toggle('is-open');
    primaryNavigation.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  if (menuToggle && primaryNavigation && header) {
    menuToggle.addEventListener('click', toggleNavigation);
    primaryNavigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNavigation);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeNavigation();
      }
    });
  }

  // Basic event tracking for Conversion Rate Optimization (CRO)
  const trackEvent = (eventName, eventData = {}) => {
    // Placeholder for Google Tag Manager / GA4 / Meta Pixel
    console.log(`[Event Tracked] ${eventName}`, eventData);
    // if (window.dataLayer) window.dataLayer.push({ event: eventName, ...eventData });
  };

  // Track WhatsApp clicks
  const waButtons = document.querySelectorAll('a[href^="https://wa.me"]');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      let context = 'other';
      if (btn.classList.contains('whatsapp-float')) context = 'floating_button';
      else if (btn.closest('.hero')) context = 'hero';
      else if (btn.closest('.cta-section')) context = 'footer_cta';

      trackEvent('click_whatsapp', { context });
    });
  });

  // Track Catalog clicks
  const catalogButtons = document.querySelectorAll('.stone-card .btn');
  catalogButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const stoneType = btn.closest('.stone-card').querySelector('h3').textContent;
      trackEvent('click_product_quote', { product: stoneType });
    });
  });

  // --- UI/UX Enhancements ---

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  const heroTextBox = document.querySelector('.hero .animate-on-scroll');
  if (heroTextBox) {
    window.requestAnimationFrame(() => {
      heroTextBox.classList.add('is-visible');
    });
  }

  // Parallax Effect for Hero Image and Decorative Isotipos
  const heroImg = document.getElementById('hero-img');
  const parallaxIsos = document.querySelectorAll('.parallax-iso');
  let parallaxTicking = false;

  const updateParallax = () => {
    const scrollPos = window.scrollY;

    if (heroImg) {
      heroImg.style.transform = `translate3d(0, ${scrollPos * 0.18}px, 0)`;
    }

    parallaxIsos.forEach(iso => {
      const speed = Number.parseFloat(iso.dataset.parallaxSpeed || '0.12');
      const rect = iso.getBoundingClientRect();
      const isoCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      const distance = isoCenter - viewportCenter;

      iso.style.setProperty('--iso-parallax-y', `${distance * -speed}px`);
    });

    parallaxTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateParallax();
  });

  updateParallax();
});
