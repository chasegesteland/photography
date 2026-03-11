document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryImages = document.querySelectorAll('.gallery-container img');

    // --- Helper Functions for Opening/Closing ---

    const openLightbox = (src) => {
        // Clear old src just in case there's lag, then set new
        lightboxImg.src = '';
        lightboxImg.src = src;
        
        // Add the CSS class to trigger the transition
        lightbox.classList.add('active');
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden'; 
    };

    const closeLightbox = () => {
        // Remove the CSS class to trigger the reverse transition
        lightbox.classList.remove('active');
        
        // Restore background scrolling
        document.body.style.overflow = '';
        
        /* Crucial for smooth UX: We do NOT clear lightboxImg.src here. 
           We let the image fade out with the lightbox. 
           If we cleared it instantly, you'd see the image disappear 
           while the black background was still fading.
        */
    };

    // --- Event Listeners ---

    // 1. Click on Gallery Image
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            openLightbox(e.target.src);
        });
    });

    // 2. Click Close Button
    closeBtn.addEventListener('click', closeLightbox);

    // 3. Click the Black Overlay/Background
    lightbox.addEventListener('click', (e) => {
        // Only close if the background itself was clicked (not the image)
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 4. Press Escape Key
    document.addEventListener('keydown', (e) => {
        // Check if Escape was pressed AND if lightbox is actually open
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});