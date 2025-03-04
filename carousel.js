(function() {
    const repoOwner = "CristianMaestre";  // 🔹 Change this to your GitHub username
    const repoName = "Art";       // 🔹 Change this to your GitHub repository name
    const folderPath = "carousel-images"; // 🔹 Change this to your folder name
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    async function fetchImages() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (!Array.isArray(data)) {
                console.error("Error: Unable to fetch images.");
                return;
            }

            const imageUrls = data
                .filter(file => file.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
                .map(file => file.download_url);

            createCarousel(imageUrls);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    function createCarousel(imageUrls) {
        if (imageUrls.length === 0) {
            console.error("No images found in the folder.");
            return;
        }

        const carouselContainer = document.createElement("div");
        carouselContainer.className = "custom-carousel-container";
        let imagesHtml = imageUrls.map(url => `<img src="${url}" alt="Carousel Image">`).join("");

        carouselContainer.innerHTML = `
            <div class="custom-carousel">${imagesHtml}</div>
            <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
            <button class="next" onclick="moveSlide(1)">&#10095;</button>
        `;

        document.querySelector(".custom_carousel_component").appendChild(carouselContainer);

        setInterval(() => moveSlide(1), 5000); // Auto-slide every 5 seconds
    }

    let index = 0;
    function moveSlide(step) {
        const slides = document.querySelectorAll(".custom-carousel img");
        if (!slides.length) return;
        index = (index + step + slides.length) % slides.length;
        document.querySelector(".custom-carousel").style.transform = `translateX(-${index * 100}%)`;
    }

    window.addEventListener("DOMContentLoaded", fetchImages);
})();
