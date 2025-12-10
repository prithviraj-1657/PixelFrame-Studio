document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Animations ---
    const heroElements = document.querySelectorAll('.hero .fade-in');

    // Simple delay for hero load animation
    setTimeout(() => {
        heroElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);


    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const imgSrc = img.getAttribute('src');
            // Use a higher res if available, for now using same for picsum but logic stands
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling bg
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Header Background on Scroll ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.85)';
            navbar.style.padding = '1.5rem 5%';
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Lazy Loading / Scroll Reveal for Gallery (Optional Enhancement) ---
    // If we wanted to fade in gallery items as we scroll:
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // --- Shop / Cart Logic ---
    const buyButtons = document.querySelectorAll('.btn-buy');

    // Create Toast Element dynamically
    const toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);

    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemName = e.target.getAttribute('data-item');
            showToast(`Added ${itemName} to Cart`);

            // Optional: Animate button
            e.target.textContent = 'Added!';
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
            }, 2000);
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

});

