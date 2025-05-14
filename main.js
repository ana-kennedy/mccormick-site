const slideshowTrigger = document.getElementById('slideshow-trigger'); // Target the h4 element
const modal = document.getElementById('slideshow-modal');
const modalImage = document.getElementById('slideshow-image');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;

const images = Array.from({ length: 55 }, (_, i) => `assets/images/jpg/tree-service${String(i + 1).padStart(2, '0')}.jpg`);

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

slideshowTrigger.addEventListener('click', () => {
  currentImageIndex = 0; 
  openModal();
});

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

function openModal() {
  console.log(`Opening modal with image: ${images[currentImageIndex]}`); // Debugging
  modalImage.src = images[currentImageIndex];
  modal.classList.add('visible');
  preloadAdjacentImages();
}

function closeModal() {
  modal.classList.remove('visible');
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  console.log(`Showing previous image: ${images[currentImageIndex]}`); // Debugging
  modalImage.src = images[currentImageIndex];
  preloadAdjacentImages();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  console.log(`Showing next image: ${images[currentImageIndex]}`); // Debugging
  modalImage.src = images[currentImageIndex];
  preloadAdjacentImages();
}

function preloadAdjacentImages() {
  const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
  const nextIndex = (currentImageIndex + 1) % images.length;

  const preloadPrev = new Image();
  preloadPrev.src = images[prevIndex];

  const preloadNext = new Image();
  preloadNext.src = images[nextIndex];
}
