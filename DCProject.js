// ==================== MOBILE NAV ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  const isOpen = navLinks.classList.contains('mobile-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('mobile-open');
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
});

// ==================== ACTIVE NAV HIGHLIGHT ====================
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.scrollY + 90;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      const target  = document.querySelector(href);
      const offset  = document.querySelector('.navbar-wrapper').offsetHeight + 16;
      const top     = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==================== SCROLL REVEAL ====================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ==================== COUNTER ANIMATION ====================
function animateCount(el, target, duration = 1200) {
  let start = 0;
  const step = (target / duration) * 16;
  const tick = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll('.metric-val[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const val = parseInt(el.getAttribute('data-count'), 10);
      animateCount(el, val);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ==================== NAVBAR SCROLL STYLE ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(5,5,5,0.92)';
  } else {
    navbar.style.background = 'rgba(5,5,5,0.72)';
  }
}, { passive: true });

// ==================== SCROLL TO TOP ====================
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-top';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

scrollBtn.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ==================== KEYBOARD NAV ====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navLinks.classList.remove('mobile-open');
});

// ==================== DASHBOARD BUTTON INTERACTIONS ====================
document.querySelectorAll('.dp-add:not(.active)').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = '✓';
    btn.classList.add('active');
    setTimeout(() => {
      btn.textContent = '+';
      btn.classList.remove('active');
    }, 2000);
  });
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🛒 Daily Cart — Case Study', 'font-size:16px;font-weight:800;color:#ff7a00;');
  console.log('%cBuilt by Kumar Manthri', 'font-size:12px;color:#a1a1aa;');
});