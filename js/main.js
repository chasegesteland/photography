document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    
    // Convert NodeList to an Array to utilize index tracking
    const galleryImages = Array.from(document.querySelectorAll('.gallery-container img'));
    
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    let currentIndex = 0; // State variable for active image

    // Centralized function to update DOM elements
    const updateLightboxContent = (index) => {
        const imgElement = galleryImages[index];
        lightboxImg.src = imgElement.src;
        lightboxTitle.textContent = imgElement.dataset.title || '';
        lightboxDesc.textContent = imgElement.dataset.description || '';
    };

    const openLightbox = (index) => {
        currentIndex = index;
        updateLightboxContent(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Navigation logic with modulo operator for infinite looping
    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightboxContent(currentIndex);
    };

    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxContent(currentIndex);
    };

    // Bind event listeners to gallery images, passing the array index
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard event listener mapping
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});