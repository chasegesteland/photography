document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // Convert NodeList to an Array to utilize index tracking
    const galleryImages = Array.from(document.querySelectorAll('.gallery-container img'));
    
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    let currentIndex = 0; // State variable for active image
    let touchStartX = 0;
    let touchEndX = 0;

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

    // Centralized swipe evaluation logic
    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum distance (in pixels) to register a swipe
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance < -swipeThreshold) {
            // Swiped left (finger moved right-to-left)
            showNext();
        } else if (swipeDistance > swipeThreshold) {
            // Swiped right (finger moved left-to-right)
            showPrev();
        }
    };

    // Bind event listeners to gallery images, passing the array index
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    showPrev();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Add touch event listeners to the lightbox container
    lightbox.addEventListener('touchstart', (e) => {
        // Record the initial X coordinate of the first finger touch
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        // Record the final X coordinate when the finger lifts
        touchEndX = e.changedTouches[0].screenX;
        
        // Evaluate if it was a deliberate swipe or just a tap
        handleSwipe();
    });

    // Keyboard event listener mapping
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});