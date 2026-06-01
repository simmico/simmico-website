/* ============================================================
   Supertek Auto Works Alberton — main.js
   Handles: mobile nav, scroll animations, gallery, lightbox, FAQ
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Navigation ───────────────────────────────────
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', e => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Active Nav Link ──────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // ─── Scroll Animations (IntersectionObserver) ────────────
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');

  if ('IntersectionObserver' in window && animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }

  // ─── FAQ Accordion ────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');

      // Close all others
      document.querySelectorAll('.faq-item.is-open').forEach(open => {
        if (open !== item) {
          open.classList.remove('is-open');
          open.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ─── Gallery Filter ───────────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.removeAttribute('data-hidden');
          } else {
            item.setAttribute('data-hidden', 'true');
          }
        });
      });
    });
  }

  // ─── Gallery Lightbox ─────────────────────────────────────
  const lightbox      = document.getElementById('lightbox');
  const lbImg         = document.getElementById('lb-image');
  const lbCaption     = document.getElementById('lb-caption');
  const lbClose       = document.getElementById('lb-close');
  const lbPrev        = document.getElementById('lb-prev');
  const lbNext        = document.getElementById('lb-next');

  if (lightbox && galleryItems.length) {
    let currentIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(i => !i.hasAttribute('data-hidden'));

    const openLightbox = (index) => {
      const items = visibleItems();
      if (!items[index]) return;
      currentIndex = index;
      const img = items[index].querySelector('img');
      const caption = items[index].querySelector('.gallery-caption');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    const navigate = (dir) => {
      const items = visibleItems();
      currentIndex = (currentIndex + dir + items.length) % items.length;
      openLightbox(currentIndex);
    };

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const items = visibleItems();
        const visibleIdx = items.indexOf(item);
        openLightbox(visibleIdx >= 0 ? visibleIdx : 0);
      });

      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click',  () => navigate(-1));
    lbNext.addEventListener('click',  () => navigate(1));

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  // ─── Scroll To Top ────────────────────────────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
