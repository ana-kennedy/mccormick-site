const slideshowTrigger = document.getElementById('slideshow-trigger'); // Target the h4 element
const modal = document.getElementById('slideshow-modal');
const modalImage = document.getElementById('slideshow-image');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;


const images = Array.from({ length: 55 }, (_, i) => `assets/images/jpg/tree-service${String(i + 1).padStart(2, '0')}.jpg`);


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
}

function closeModal() {
  modal.classList.remove('visible');
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  console.log(`Showing previous image: ${images[currentImageIndex]}`); // Debugging
  modalImage.src = images[currentImageIndex];
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  console.log(`Showing next image: ${images[currentImageIndex]}`); // Debugging
  modalImage.src = images[currentImageIndex];
}
