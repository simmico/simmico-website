/**
 * Joe's Confectionary - Main Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuBtn.innerHTML = navLinksContainer.classList.contains('active') ? '&times;' : '&#9776;';
        });

        // Close menu when a link is clicked
        const links = navLinksContainer.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuBtn.innerHTML = '&#9776;';
            });
        });
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Active Nav State Indicator
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Smooth Parallax for asymmetric backgrounds
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const asymmetricBgs = document.querySelectorAll('.asymmetric-bg::before');
        // Note: Can't easily target pseudo-elements with JS style, 
        // so we use a class or dedicated div if complex parallax is needed.
        // For now, keeping it CSS-based for performance.
    });
});

/**
 * Gallery Filter (Used in gallery.html)
 */
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
        }
    });
}

/**
 * Lightbox (Used in gallery.html)
 */
function openLightbox(imgSrc, caption) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imgSrc}" alt="${caption}">
            <p class="lightbox-caption">${caption}</p>
        </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    lightbox.addEventListener('click', (e) => {
        if (e.target.className === 'lightbox' || e.target.className === 'lightbox-close') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
}
