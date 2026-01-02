// Fade-up animation
const fadeItems = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
});

fadeItems.forEach(i => observer.observe(i));


// FILTER LOGIC
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".project-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      card.style.display = "none";

      if(filter === "all" || card.classList.contains(filter)){
        card.style.display = "block";
      }
    });

  });
});



// NAV MENU
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", ()=> {
  navLinks.classList.toggle("active");
  menuToggle.firstElementChild.classList.toggle("fa-bars");
  menuToggle.firstElementChild.classList.toggle("fa-xmark");
});
