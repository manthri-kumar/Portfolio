// ==================== NAVBAR ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navLinks.classList.remove('active');
});

// ==================== FORM HANDLING ====================
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = sendBtn.querySelector('.btn-text');
    const btnLoading = sendBtn.querySelector('.btn-loading');
    const btnSuccess = sendBtn.querySelector('.btn-success');

    // Show loading
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    sendBtn.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Show success
        btnLoading.style.display = 'none';
        btnSuccess.style.display = 'flex';
        sendBtn.classList.add('success');
        form.reset();

        setTimeout(() => {
          btnSuccess.style.display = 'none';
          btnText.style.display = 'flex';
          sendBtn.classList.remove('success');
          sendBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      btnLoading.style.display = 'none';
      btnText.style.display = 'flex';
      sendBtn.disabled = false;
      alert('Something went wrong. Please email me directly at manthrikumar7@gmail.com');
    }
  });
}

// ==================== SCROLL TO TOP ====================
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
Object.assign(scrollBtn.style, {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#ffffff',
  cursor: 'pointer',
  opacity: '0',
  transition: 'all 300ms cubic-bezier(0.2,0,0.38,0.9)',
  pointerEvents: 'none',
  zIndex: '999',
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
    color: '#ffffff',
    transform: 'translateY(0)'
  });
});