// ==================== SCROLL REVEAL ==================== //
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// ==================== MOBILE MENU ==================== //
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('mobile-open');
    }
  });
}

// ==================== METRIC COUNTER ==================== //
const countElements = document.querySelectorAll('[data-count]');

const countUp = (element) => {
  const target    = parseInt(element.dataset.count, 10);
  const duration  = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

countElements.forEach((element) => countObserver.observe(element));

// ==================== NAVBAR SCROLL EFFECT ==================== //
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.background    = 'rgba(5, 5, 5, 0.85)';
    navbar.style.backdropFilter = 'blur(32px)';
    navbar.style.borderColor   = 'rgba(255, 255, 255, 0.12)';
  } else {
    navbar.style.background    = 'rgba(5, 5, 5, 0.72)';
    navbar.style.backdropFilter = 'blur(24px)';
    navbar.style.borderColor   = 'rgba(255, 255, 255, 0.08)';
  }
}, { passive: true });

// ==================== SMOOTH SCROLL NAV ==================== //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  });
});

// ==================== ACTIVE NAV LINK ON SCROLL ==================== //
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((s) => sectionObserver.observe(s));

// ==================== LAZY LOAD IMAGES ==================== //
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
}

// ==================== ACCESSIBILITY ==================== //
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

console.log('Sarathi Project Page — Loaded and Ready 🚀');