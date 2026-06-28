/* ==================== MOBILE MENU ==================== */

const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

function openMenu() {
  mobileNav.classList.add('open');
  menuToggle.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden'; // prevent scroll behind sheet
}

function closeMenu() {
  mobileNav.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (mobileNav.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    mobileNav.classList.contains('open') &&
    !mobileNav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

// Close on mobile nav link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ==================== ACTIVE NAV LINK ==================== */

const navLinks    = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function setActive(href) {
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === href);
  });
  mobileLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === href);
  });
}

function updateActiveOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;

  let currentId = null;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) currentId = '#' + sec.id;
  });

  if (currentId) setActive(currentId);
}

window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
updateActiveOnScroll();

/* ==================== SMOOTH SCROLL ==================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      const offset = document.querySelector('.navbar-wrapper').offsetHeight + 20;
      const top    = document.querySelector(href).offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ==================== NAVBAR SHRINK ON SCROLL ==================== */

const navWrapper = document.querySelector('.navbar-wrapper');

window.addEventListener('scroll', () => {
  navWrapper.style.paddingTop = window.scrollY > 50 ? '8px' : '16px';
}, { passive: true });

/* ==================== INTERSECTION OBSERVER ==================== */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.animation = 'fadeInUp 0.55s ease-out forwards';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.skill-chip, .info-card, .metric-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

/* ==================== FORM HANDLING ==================== */

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const orig = btn.innerHTML;

    btn.innerHTML  = '<span>Sending…</span>';
    btn.disabled   = true;

    try {
      contactForm.submit();
      setTimeout(() => {
        btn.innerHTML = '<span>✓ Sent!</span>';
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; contactForm.reset(); }, 2000);
      }, 500);
    } catch {
      btn.innerHTML = orig;
      btn.disabled  = false;
    }
  });
}

/* ==================== BUTTON RIPPLE ==================== */

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousedown', function (e) {
    const rect   = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size   = Math.max(rect.width, rect.height);

    Object.assign(ripple.style, {
      position: 'absolute', borderRadius: '50%',
      left: (e.clientX - rect.left) + 'px',
      top:  (e.clientY - rect.top)  + 'px',
      width: '0', height: '0',
      background: 'rgba(255,255,255,0.4)',
      pointerEvents: 'none', zIndex: '1'
    });

    this.style.position = 'relative';
    this.style.overflow  = 'hidden';
    this.appendChild(ripple);

    ripple.animate(
      [{ width: '0', height: '0', opacity: 1 },
       { width: size + 'px', height: size + 'px', opacity: 0 }],
      { duration: 550, easing: 'ease-out' }
    ).onfinish = () => ripple.remove();
  });
});

/* ==================== SCROLL TO TOP ==================== */

const scrollBtn = document.createElement('button');
scrollBtn.innerHTML   = '<i class="fa-solid fa-arrow-up"></i>';
scrollBtn.className   = 'scroll-top-btn';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
Object.assign(scrollBtn.style, {
  position: 'fixed', bottom: '24px', right: '24px',
  width: '44px', height: '44px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff', cursor: 'pointer', opacity: '0',
  transition: 'all 300ms cubic-bezier(0.2,0,0.38,0.9)',
  pointerEvents: 'none', zIndex: '900',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '16px'
});
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  const show = window.scrollY > 300;
  scrollBtn.style.opacity       = show ? '1' : '0';
  scrollBtn.style.pointerEvents = show ? 'auto' : 'none';
}, { passive: true });

scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

scrollBtn.addEventListener('mouseenter', () => {
  Object.assign(scrollBtn.style, {
    background: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,122,0,0.5)',
    color: '#ff7a00',
    transform: 'translateY(-4px)'
  });
});

scrollBtn.addEventListener('mouseleave', () => {
  Object.assign(scrollBtn.style, {
    background: 'rgba(255,255,255,0.03)',
    borderColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    transform: 'translateY(0)'
  });
});

/* ==================== INIT ==================== */

document.addEventListener('DOMContentLoaded', () => {
  updateActiveOnScroll();
  console.log('%c✨ Portfolio Loaded', 'font-size:14px;font-weight:bold;color:#ff7a00;');
});