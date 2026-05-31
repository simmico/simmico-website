document.addEventListener('DOMContentLoaded', () => {
    initBentoTilt();
    initScrollDynamics();
    initCinematicStack();
    initGlobalReveal();
    initFloatingNav();
});

/**
 * Floating Nav Effect
 */
function initFloatingNav() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Technical Scroll Dynamics
 * Rotates the needle and the circular text in opposite directions.
 */
function initScrollDynamics() {
    const needle = document.querySelector('.needle');
    const circleText = document.querySelector('.circle-text');
    if (!needle || !circleText) return;

    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Needle rotates fast
        const needleRotation = scrollPercent * 360 * 3;
        needle.style.transform = `rotate(${needleRotation}deg)`;
        
        // Text rotates slowly in opposite direction
        const textRotation = -scrollPercent * 360;
        circleText.style.transformOrigin = 'center';
        circleText.style.transform = `rotate(${textRotation}deg)`;
    });
}

/**
 * Bento Grid Tilt Effect
 */
function initBentoTilt() {
    const items = document.querySelectorAll('.bento-item');
    
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            item.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-5px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        });
    });
}

/**
 * Cinematic Stack Gallery
 */
function initCinematicStack() {
    const viewport = document.querySelector('.stack-viewport');
    if (!viewport) return;

    const arrange = () => {
        const cards = Array.from(viewport.querySelectorAll('.stack-card'));
        cards.forEach((card, i) => {
            const depth = cards.length - 1 - i;
            const isTop = i === cards.length - 1;

            card.style.zIndex = i;
            card.style.opacity = depth > 3 ? "0" : 1 - depth * 0.2;
            card.style.transform = `
                translateZ(${-depth * 100}px) 
                translateY(${-depth * 40}px) 
                scale(${1 - depth * 0.05})
            `;
            card.style.filter = isTop ? 'none' : `blur(${depth * 2}px) grayscale(${depth * 0.5})`;
            card.style.pointerEvents = isTop ? 'auto' : 'none';
        });
    };

    arrange();

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let topCard = null;

    const onStart = (e) => {
        const cards = Array.from(viewport.querySelectorAll('.stack-card'));
        topCard = cards[cards.length - 1];
        if (!topCard) return;
        
        isDragging = true;
        startX = (e.type.includes('touch') ? e.touches[0] : e).pageX;
        topCard.style.transition = 'none';
    };

    const onMove = (e) => {
        if (!isDragging || !topCard) return;
        currentX = ((e.type.includes('touch') ? e.touches[0] : e).pageX) - startX;
        const rotate = currentX / 15;
        topCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg) scale(1.05)`;
    };

    const onEnd = () => {
        if (!isDragging || !topCard) return;
        isDragging = false;
        
        const cardToMove = topCard;
        cardToMove.style.transition = 'all 0.8s var(--ease)';

        if (Math.abs(currentX) > 150) {
            const dir = currentX > 0 ? 1 : -1;
            cardToMove.style.transform = `translateX(${dir * 1500}px) rotate(${dir * 90}deg) scale(0.5)`;
            cardToMove.style.opacity = '0';

            setTimeout(() => {
                viewport.prepend(cardToMove);
                cardToMove.style.transition = 'none';
                cardToMove.style.opacity = '1';
                arrange();
            }, 400);
        } else {
            arrange();
        }
        currentX = 0;
    };

    viewport.addEventListener('mousedown', onStart);
    viewport.addEventListener('touchstart', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
}

/**
 * Staggered Global Reveal
 */
function initGlobalReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.bento-item, h1, h2, .btn-wow, .hero p').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.05}s`;
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(60px);
            transition: opacity 1.2s var(--ease-out), transform 1.2s var(--ease-out);
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}
