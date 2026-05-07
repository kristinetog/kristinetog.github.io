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


// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');

let illoImages = [];
let currentIndex = 0;

function openLightbox(index) {
  illoImages = Array.from(document.querySelectorAll('.illo-card img')).map(img => img.src);
  if (illoImages.length === 0) return;
  currentIndex = index;
  lightboxImg.src = illoImages[currentIndex];
  lightbox.classList.add('active');
  updateCounter();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  currentIndex = (currentIndex - 1 + illoImages.length) % illoImages.length;
  lightboxImg.src = illoImages[currentIndex];
  updateCounter();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % illoImages.length;
  lightboxImg.src = illoImages[currentIndex];
  updateCounter();
}

function updateCounter() {
  lightboxCounter.textContent = (currentIndex + 1) + ' / ' + illoImages.length;
}

// Klikk på illustrasjonskort
document.querySelectorAll('.illo-card').forEach((card, index) => {
  card.addEventListener('click', () => openLightbox(index));
});

// Lukk med Escape, naviger med piltaster
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// Lukk ved klikk utenfor bildet
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
