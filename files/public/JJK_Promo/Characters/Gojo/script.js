let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel .slide');
    const totalSlides = slides.length;

    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}
