const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
}
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let activeImages = [];
let activeIndex = 0;

function openLightbox(images, index) {
  activeImages = images;
  activeIndex = index;
  lightboxImage.src = activeImages[activeIndex];
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function moveLightbox(step) {
  if (!activeImages.length) return;
  activeIndex = (activeIndex + step + activeImages.length) % activeImages.length;
  lightboxImage.src = activeImages[activeIndex];
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => moveLightbox(-1));
lightboxNext.addEventListener('click', () => moveLightbox(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') moveLightbox(-1);
  if (e.key === 'ArrowRight') moveLightbox(1);
});

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach((carousel) => {
  const images = [...carousel.querySelectorAll('.carousel-track img')];
  const dotsWrap = carousel.querySelector('.dots');
  let index = 0;

  function renderDots() {
    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = i === index ? 'active' : '';
      dot.addEventListener('click', () => show(i));
      dotsWrap.appendChild(dot);
    });
  }

  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  carousel.querySelector('.prev').addEventListener('click', () => show(index - 1));
  carousel.querySelector('.next').addEventListener('click', () => show(index + 1));
  carousel.querySelector('.zoom-btn').addEventListener('click', () => openLightbox(images.map(img => img.dataset.full), index));
  images.forEach((img, i) => img.addEventListener('click', () => openLightbox(images.map(el => el.dataset.full), i)));

  renderDots();
  show(0);
});

document.querySelectorAll('.gallery-item').forEach((button) => {
  button.addEventListener('click', () => openLightbox([button.dataset.open], 0));
});
