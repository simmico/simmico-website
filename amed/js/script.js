document.addEventListener('DOMContentLoaded', () => {
    initStackGallery();
    initRevealAnimations();
    initMobileMenu();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Robust Infinite Stack Gallery
 * Moves cards to the bottom of the DOM for a perfect loop.
 */
function initStackGallery() {
    const viewport = document.querySelector('.stack-viewport');
    if (!viewport) return;

    function arrangeStack() {
        const cards = Array.from(viewport.querySelectorAll('.stack-card'));
        cards.forEach((card, i) => {
            const depth = cards.length - 1 - i;
            const isTop = i === cards.length - 1;

            card.style.zIndex = i;
            card.style.opacity = depth > 3 ? "0" : "1";
            card.style.transform = `scale(${1 - (depth * 0.05)}) translateY(${depth * -20}px)`;
            card.style.pointerEvents = isTop ? "auto" : "none";
            card.style.filter = isTop ? "none" : `blur(${depth * 2}px)`;
        });
    }

    // Initial setup
    arrangeStack();

    // Event Delegation for dynamic looping
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let topCard = null;

    const onStart = (e) => {
        const cards = Array.from(viewport.querySelectorAll('.stack-card'));
        topCard = cards[cards.length - 1];
        
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
        topCard.style.transition = 'none';
    };

    const onMove = (e) => {
        if (!isDragging || !topCard) return;
        currentX = (e.type.includes('touch') ? e.touches[0].pageX : e.pageX) - startX;
        const rotate = currentX / 20;
        topCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg) scale(1.05)`;
    };

    const onEnd = () => {
        if (!isDragging || !topCard) return;
        isDragging = false;
        
        const cardToMove = topCard;
        cardToMove.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease';

        if (Math.abs(currentX) > 120) {
            // Swipe Out
            const dir = currentX > 0 ? 1 : -1;
            cardToMove.style.transform = `translateX(${dir * 1000}px) rotate(${dir * 45}deg)`;
            cardToMove.style.opacity = '0';

            setTimeout(() => {
                // Move the swiped card to the very bottom of the DOM stack
                viewport.prepend(cardToMove);
                
                // Reset card properties for its new life at the bottom
                cardToMove.style.transition = 'none';
                cardToMove.style.opacity = '1';
                
                arrangeStack();
            }, 300);
        } else {
            // Snap back
            arrangeStack();
        }
        
        currentX = 0;
        topCard = null;
    };

    // Global listeners for smoother interaction
    viewport.addEventListener('mousedown', onStart);
    viewport.addEventListener('touchstart', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
}

/**
 * Modern Scroll Reveal
 */
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > *, .service-card, .feature').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}
