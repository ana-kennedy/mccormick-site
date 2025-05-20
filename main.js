const slideshowTrigger = document.getElementById('slideshow-trigger');
const modal = document.getElementById('slideshow-modal');
const modalImage = document.getElementById('slideshow-image');
const modalVideo = document.getElementById('slideshow-video');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;

// Static image list for modal slideshow (tree-service01.jpg to tree-service62.jpg)
const images = Array.from({ length: 62 }, (_, i) => `assets/images/jpg/tree-service${String(i + 1).padStart(2, '0')}.jpg`);
// Put the mp4 as the first "slide"
const slides = ['assets/images/jpg/output.mp4', ...images];

slideshowTrigger.addEventListener('click', () => {
  if (slides.length === 0) {
    alert('No images available for slideshow.');
    return;
  }
  currentImageIndex = 0;
  openModal();
});

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevSlide);
nextBtn.addEventListener('click', showNextSlide);

function openModal() {
  showSlide(currentImageIndex);
  modal.classList.add('visible');
  preloadAdjacentSlides();
}

function closeModal() {
  modal.classList.remove('visible');
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
}

function showPrevSlide() {
  currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
  showSlide(currentImageIndex);
  preloadAdjacentSlides();
}

function showNextSlide() {
  currentImageIndex = (currentImageIndex + 1) % slides.length;
  showSlide(currentImageIndex);
  preloadAdjacentSlides();
}

function showSlide(index) {
  const isVideo = slides[index].endsWith('.mp4');
  if (isVideo) {
    modalImage.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.src = slides[index];
    modalVideo.load();
    modalVideo.play();
  } else {
    modalVideo.pause();
    modalVideo.style.display = 'none';
    modalImage.style.display = 'block';
    modalImage.src = slides[index];
  }
}

function preloadAdjacentSlides() {
  if (slides.length === 0) return;
  const prevIndex = (currentImageIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentImageIndex + 1) % slides.length;

  if (!slides[prevIndex].endsWith('.mp4')) {
    const preloadPrev = new Image();
    preloadPrev.src = slides[prevIndex];
  }
  if (!slides[nextIndex].endsWith('.mp4')) {
    const preloadNext = new Image();
    preloadNext.src = slides[nextIndex];
  }
}

// HERO SLIDESHOW (only 5 images)
const heroImages = [
  'assets/images/jpg/tree-service01.jpg',
  'assets/images/jpg/tree-service02.jpg',
  'assets/images/jpg/tree-service03.jpg',
  'assets/images/jpg/tree-service04.jpg',
  'assets/images/jpg/tree-service05.jpg'
];

let heroIndex = 0;
const heroSection = document.querySelector('.hero');

function updateHeroBackground() {
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  }
}

function cycleHeroImage() {
  heroIndex = (heroIndex + 1) % heroImages.length;
  updateHeroBackground();
}

if (heroSection) {
  updateHeroBackground();
  setInterval(cycleHeroImage, 4000); // Change every 4 seconds
}
