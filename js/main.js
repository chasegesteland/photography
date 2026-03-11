document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryImages = document.querySelectorAll('.gallery-container img');

    // 1. Open lightbox and bind image source
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            lightbox.style.display = 'flex';
            lightboxImg.src = e.target.src;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // 2. Define close function
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    };

    // 3. Close via 'X' button
    closeBtn.addEventListener('click', closeLightbox);

    // 4. Close via clicking background overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 5. Close via Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});