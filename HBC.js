// ==================== NAVIGATION FUNCTIONALITY ====================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLink = document.querySelectorAll('.nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked
navLink.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      if (!entry.target.style.animation) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.details-content, .details-image').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ==================== SMOOTH SCROLL ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      const headerHeight = document.querySelector('.navbar-wrapper').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== BUTTON RIPPLE EFFECT ====================

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mousedown', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    const size = Math.max(rect.width, rect.height);
    ripple.animate([
      { width: '0', height: '0', opacity: 1 },
      { width: size + 'px', height: size + 'px', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    }).onfinish = () => ripple.remove();
  });
});

// ==================== SCROLL TO TOP BUTTON ====================

function createScrollToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  button.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #ffffff;
    cursor: pointer;
    opacity: 0;
    transition: all 300ms cubic-bezier(0.2, 0, 0.38, 0.9);
    pointer-events: none;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  `;

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    } else {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', () => {
    button.style.background = 'rgba(255, 255, 255, 0.06)';
    button.style.borderColor = 'rgba(255, 122, 0, 0.5)';
    button.style.color = '#ff7a00';
    button.style.transform = 'translateY(-4px)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.background = 'rgba(255, 255, 255, 0.03)';
    button.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    button.style.color = '#ffffff';
    button.style.transform = 'translateY(0)';
  });
}

createScrollToTopButton();

// ==================== KEYBOARD NAVIGATION ====================

document.addEventListener('keydown', (e) => {
  // Close menu on Escape
  if (e.key === 'Escape') {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🤖 Hand Gesture Calculator Project Page Loaded', 'font-size: 16px; font-weight: bold; color: #ff7a00;');
  console.log('%cComputer Vision & Gesture Recognition Showcase', 'font-size: 12px; color: #a1a1aa;');
});