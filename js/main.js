// Språkbytte
let currentLang = 'no';

function toggleLang() {
  currentLang = currentLang === 'no' ? 'en' : 'no';
  document.getElementById('lang-btn').textContent = currentLang === 'no' ? 'EN' : 'NO';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-no]').forEach(el => {
    el.textContent = el.dataset[currentLang];
  });
}

// Scroll-animasjoner
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .illo-card, .about-text, .about-img').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
