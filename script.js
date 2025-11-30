document.addEventListener("DOMContentLoaded", () => {
  const zoomImages = document.querySelectorAll('.zoomable');
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');

  zoomImages.forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
});