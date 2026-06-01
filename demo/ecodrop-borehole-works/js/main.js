/* Ecodrop Borehole Works - Main JS */

document.addEventListener('DOMContentLoaded', () => {

    // ── Mobile Menu ──
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            mobileToggle.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
        });
        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.innerHTML = '&#9776;';
            });
        });
    }

    // ── Scroll-reveal for non-hero elements ──
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        const revealTargets = document.querySelectorAll(
            '.card, .testimonial-card, .process-step, .stat-item, .gallery-item'
        );
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.55s ease-out, transform 0.55s ease-out';
            revealObserver.observe(el);
        });
    }

    // ── Gallery Lightbox ──
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="" alt="">
            </div>`;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        const openLightbox = (src, alt) => {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.classList.add('active');
            lightboxClose.focus();
        };
        const closeLightbox = () => lightbox.classList.remove('active');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                openLightbox(img.src, img.alt);
            });
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(item.querySelector('img').src, item.querySelector('img').alt);
            });
            item.setAttribute('tabindex', '0');
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    }

    // ── Gallery Filtering ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelectorAll('.gallery-item');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                galleryGrid.forEach(item => {
                    const show = filter === 'all' || item.getAttribute('data-category') === filter;
                    item.style.display = show ? '' : 'none';
                });
            });
        });
    }
});

// ── Lightbox Styles ──
const _ls = document.createElement('style');
_ls.textContent = `
.lightbox {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.92);
    display: none; align-items: center; justify-content: center;
    z-index: 100; padding: 24px;
}
.lightbox.active { display: flex; }
.lightbox-content { position: relative; max-width: 90vw; max-height: 88vh; }
.lightbox-content img { max-width: 100%; max-height: 88vh; border-radius: 10px; display: block; }
.lightbox-close {
    position: absolute; top: -44px; right: 0;
    background: none; border: none; color: #fff; font-size: 2rem;
    cursor: pointer; line-height: 1; padding: 4px 10px; border-radius: 6px;
}
.lightbox-close:hover { background: rgba(255,255,255,0.15); }
`;
document.head.appendChild(_ls);
