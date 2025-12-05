// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        hamburger.classList.toggle('active');
        // update aria-expanded
        const expanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            target.focus({preventScroll: true});
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Gallery Filter (for gallery.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryBoxes = document.querySelectorAll('.gallery-box');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryBoxes.forEach(box => {
                if (filterValue === 'all' || box.classList.contains(filterValue)) {
                    box.style.display = 'block';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        box.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Simple Lightbox for Gallery
const galleryItems = document.querySelectorAll('.gallery-item img');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            createLightbox(this.src, this.alt || '');
        });
    });
}

function createLightbox(src, alt) {
    // Prevent multiple lightboxes
    if (document.querySelector('.simple-lightbox')) return;

    // Save current scroll position and disable page scroll
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'simple-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.tabIndex = -1;

    // Content wrapper (centers image + caption)
    const content = document.createElement('div');
    content.className = 'lightbox-content';

    // Image
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = src;
    img.alt = alt;

    // Caption (optional)
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    caption.textContent = alt || '';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.innerHTML = '&times;';

    // Append elements
    content.appendChild(closeBtn);
    content.appendChild(img);
    if (alt) content.appendChild(caption);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Focus management
    closeBtn.focus();

    // Close handler
    function closeLightbox() {
        // remove listeners
        overlay.removeEventListener('click', overlayClickHandler);
        document.removeEventListener('keydown', keyHandler);
        closeBtn.removeEventListener('click', closeLightbox);

        // remove element
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);

        // restore scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollTop);
    }

    // Close when clicking outside image/content
    function overlayClickHandler(e) {
        // if click target is overlay (not content or children) -> close
        if (e.target === overlay) closeLightbox();
    }

    // Close on Escape
    function keyHandler(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeLightbox();
        }
    }

    // Attach listeners
    overlay.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown', keyHandler);
    closeBtn.addEventListener('click', closeLightbox);

    // prevent image drag ghost on mobile
    img.addEventListener('dragstart', e => e.preventDefault());
}
