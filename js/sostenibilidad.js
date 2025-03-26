document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('socialCarousel');
    const carouselInner = document.getElementById('carouselInner');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const cardWidth = 352 + 16; // tarjeta + margen

    let scrollPosition = 0;

    const maxScroll = carouselInner.scrollWidth - carousel.offsetWidth;

    nextBtn.addEventListener('click', () => {
        scrollPosition += cardWidth * 2;
        if (scrollPosition > maxScroll) scrollPosition = maxScroll;
        carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        updateButtons();
    });

    prevBtn.addEventListener('click', () => {
        scrollPosition -= cardWidth * 2;
        if (scrollPosition < 0) scrollPosition = 0;
        carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        updateButtons();
    });

    function updateButtons() {
        prevBtn.style.opacity = scrollPosition <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = scrollPosition >= maxScroll ? '0.5' : '1';
    }

    updateButtons();
});