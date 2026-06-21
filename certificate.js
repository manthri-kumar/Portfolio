// ==================== NAVBAR ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) navLinks.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('active');
    closeModal();
  }
});

// ==================== CERTIFICATE MODAL ====================
const modal = document.getElementById('certModal');
const modalImg = document.getElementById('certModalImg');
const modalTitleBar = document.getElementById('certModalTitleBar');
const modalOverlay = document.getElementById('certModalOverlay');
const modalClose = document.getElementById('certModalClose');

function openModal(imgSrc, title) {
  modalImg.src = '';
  modalImg.alt = title;
  modalTitleBar.textContent = title;
  
  // Preload
  const preload = new Image();
  preload.onload = () => { modalImg.src = imgSrc; };
  preload.onerror = () => { modalImg.src = imgSrc; };
  preload.src = imgSrc;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modalImg.src = ''; }, 300);
}

// Attach open to all view-cert buttons
document.querySelectorAll('.view-cert-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.getAttribute('data-img');
    const title = btn.getAttribute('data-title');
    openModal(img, title);
  });
});

// Close triggers
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

// Prevent clicks inside container from closing
document.querySelector('.cert-modal-container').addEventListener('click', (e) => {
  e.stopPropagation();
});

// ==================== FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.certificate-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.5s ease-out forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==================== TIMELINE SCROLL REVEAL ====================
const timelineItems = document.querySelectorAll('.timeline-item');

const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

timelineItems.forEach(item => tlObserver.observe(item));

// ==================== SCROLL TO TOP ====================
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
Object.assign(scrollBtn.style, {
  position: 'fixed',
  bottom: '24px', right: '24px',
  width: '48px', height: '48px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#ffffff',
  cursor: 'pointer',
  opacity: '0',
  transition: 'all 300ms cubic-bezier(0.2,0,0.38,0.9)',
  pointerEvents: 'none',
  zIndex: '998',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px'
});
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.pointerEvents = 'auto';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.pointerEvents = 'none';
  }
}, { passive: true });

scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollBtn.addEventListener('mouseenter', () => {
  Object.assign(scrollBtn.style, { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,122,0,0.5)', color: '#ff7a00', transform: 'translateY(-4px)' });
});
scrollBtn.addEventListener('mouseleave', () => {
  Object.assign(scrollBtn.style, { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#ffffff', transform: 'translateY(0)' });
});