(function() {
    let index = 0;
    function moveSlide(step) {
        index = (index + step + slides.length) % slides.length;
        document.querySelector(".custom-carousel").style.transform = `translateX(-${index * 100}%)`;
    }

    function createCarousel() {
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "custom-carousel-container";
        carouselContainer.innerHTML = `
            <div class="custom-carousel">
                <img src="https://your-image-url-1.com" alt="Slide 1">
                <img src="https://your-image-url-2.com" alt="Slide 2">
                <img src="https://your-image-url-3.com" alt="Slide 3">
            </div>
            <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="next" onclick="moveSlide(1)">&#10095;</button>
        `;

        document.querySelector(".custom_carousel_component").appendChild(carouselContainer);

        setInterval(() => moveSlide(1), 5000); // Auto-slide every 5 seconds
    }

    window.addEventListener("DOMContentLoaded", createCarousel);
})();
