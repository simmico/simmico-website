document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Active State ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('svg');
            // Toggle icon between menu and x
            if (navMenu.classList.contains('open')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />';
            }
        });
    }

    // --- Hero Animations ---
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .cta-group');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';
        }, 300 + (index * 200));
    });

    // --- Intersection Observer for Fade-in ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .card, .why-item').forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    // --- Gallery Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- Simple Lightbox ---
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        lightbox.style.cssText = `
            position: fixed;
            z-index: 2000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(2, 6, 23, 0.95);
            display: none;
            justify-content: center;
            align-items: center;
            cursor: zoom-out;
            backdrop-filter: blur(10px);
        `;

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const clone = img.cloneNode();
                clone.style.cssText = `
                    max-width: 90%;
                    max-height: 80%;
                    border-radius: 1rem;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                `;
                lightbox.innerHTML = '';
                lightbox.appendChild(clone);
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});
