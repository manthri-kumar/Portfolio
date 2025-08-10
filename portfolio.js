// Intersection Observer for fading in sections and social sidebar
const sections = document.querySelectorAll('section');
const socialSidebar = document.querySelector('.social-sidebar');
const projects = document.querySelectorAll('.project');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and project cards
sections.forEach(section => {
  observer.observe(section);
});
projects.forEach(project => {
  observer.observe(project);
});

// Fade-in for the social sidebar
if (socialSidebar) {
  observer.observe(socialSidebar);
}

// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
}

// Hide nav menu when a link is clicked
const navLinkElements = document.querySelectorAll("#navLinks a");
navLinkElements.forEach(link => {
  link.addEventListener("click", () => {
    const navLinks = document.getElementById("navLinks");
    navLinks.style.display = "none";
  });
});

// Move social sidebar below nav menu on mobile
function moveSocialSidebar() {
  const socialSidebar = document.getElementById('social-sidebar');
  const mobilePlaceholder = document.getElementById('mobile-social-placeholder');
  const originalParent = document.body;

  if (!socialSidebar || !mobilePlaceholder) return;

  if (window.innerWidth <= 768) {
    if (!mobilePlaceholder.contains(socialSidebar)) {
      mobilePlaceholder.appendChild(socialSidebar);
      socialSidebar.style.display = 'block';
    }
  } else {
    if (!originalParent.contains(socialSidebar)) {
      originalParent.appendChild(socialSidebar);
      socialSidebar.style.display = 'block';
    }
  }
}

// Run on page load and window resize
window.addEventListener('load', moveSocialSidebar);
window.addEventListener('resize', moveSocialSidebar);
