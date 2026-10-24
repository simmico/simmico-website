/**
 * Mink Luxury Interiors — Pecanwood Estate Interactive Presentation
 */

(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const roomPills = Array.from(document.querySelectorAll('.room-pill'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const startBtn = document.getElementById('startBtn');
  const replayBtn = document.getElementById('replayBtn');
  const homeBtn = document.getElementById('homeBtn');
  const slideCounter = document.getElementById('slideCounter');
  const currentSlideLabel = document.getElementById('currentSlideLabel');
  const progressFill = document.getElementById('progressFill');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const overviewBtn = document.getElementById('overviewBtn');
  const overviewDialog = document.getElementById('overviewDialog');
  const overviewGrid = document.getElementById('overviewGrid');
  const lightboxDialog = document.getElementById('lightboxDialog');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  let currentIndex = 0;
  const totalSlides = slides.length;

  /**
   * Navigates to a new view with a directional transition.
   * Follows modern-web-guidance: directional-navigation-transitions
   * @param {Function} updateDOM - Callback to update the DOM state.
   * @param {string} direction - Either 'forward' or 'backward'.
   */
  function navigate(updateDOM, direction) {
    if (!document.startViewTransition) {
      updateDOM();
      return;
    }

    document.startViewTransition({
      update: updateDOM,
      types: [direction]
    });
  }

  function formatNum(n) {
    return String(n).padStart(2, '0');
  }

  function applySlideState(targetIndex) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === targetIndex);
    });

    currentIndex = targetIndex;
    const activeSlide = slides[currentIndex];
    const sectionId = activeSlide.getAttribute('data-section');
    const title = activeSlide.getAttribute('data-title') || '';

    roomPills.forEach((pill) => {
      pill.classList.toggle('active', pill.getAttribute('data-target') === sectionId);
    });

    slideCounter.textContent = `${formatNum(currentIndex + 1)} / ${formatNum(totalSlides)}`;
    currentSlideLabel.textContent = title;
    progressFill.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;

    // Sync overview active state
    const overviewItems = overviewGrid.querySelectorAll('.overview-item');
    overviewItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentIndex);
    });

    // Update URL hash without jumping
    history.replaceState(null, '', `#slide-${currentIndex + 1}`);
  }

  function goToSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= totalSlides || targetIndex === currentIndex) {
      return;
    }
    const direction = targetIndex > currentIndex ? 'forward' : 'backward';
    navigate(() => applySlideState(targetIndex), direction);
  }

  // Button Events
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  if (startBtn) startBtn.addEventListener('click', () => goToSlide(1));
  if (replayBtn) replayBtn.addEventListener('click', () => goToSlide(0));
  if (homeBtn) homeBtn.addEventListener('click', () => goToSlide(0));

  roomPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const target = parseInt(pill.getAttribute('data-target'), 10);
      goToSlide(target);
    });
  });

  // Build Overview Grid
  slides.forEach((slide, idx) => {
    const title = slide.getAttribute('data-title') || `Slide ${idx + 1}`;
    const thumb = slide.getAttribute('data-thumb') || 'assets/brand/hero-bg.jpg';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `overview-item${idx === 0 ? ' active' : ''}`;
    btn.innerHTML = `
      <div class="overview-thumb">
        <img src="${thumb}" alt="${title}" loading="lazy" />
      </div>
      <div class="overview-meta">
        <span class="overview-num">${formatNum(idx + 1)}</span>
        <span class="overview-name">${title}</span>
      </div>
    `;
    btn.addEventListener('click', () => {
      overviewDialog.close();
      goToSlide(idx);
    });
    overviewGrid.appendChild(btn);
  });

  overviewBtn.addEventListener('click', () => {
    overviewDialog.showModal();
  });

  // Lightbox Zoom on Gallery Cards
  document.querySelectorAll('[data-zoom]').forEach((mediaEl) => {
    mediaEl.addEventListener('click', () => {
      const src = mediaEl.getAttribute('data-zoom');
      const caption = mediaEl.getAttribute('data-caption') || '';
      lightboxImg.src = src;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;
      lightboxDialog.showModal();
    });
  });

  // Fallback for browsers without <dialog closedby="any"> support
  // Follows modern-web-guidance: light-dismiss-a-dialog
  [lightboxDialog, overviewDialog].forEach((dialog) => {
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        dialog.close();
      });
    }
  });

  // Fullscreen Toggle
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (lightboxDialog.open || overviewDialog.open) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    } else if (e.key === 'g' || e.key === 'G') {
      e.preventDefault();
      overviewDialog.showModal();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      fullscreenBtn.click();
    }
  });

  // Touch Swipe Navigation
  let touchStartX = 0;
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (lightboxDialog.open || overviewDialog.open) return;
    if (e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Restore slide from URL hash if present
  const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
  if (hashMatch) {
    const idx = parseInt(hashMatch[1], 10) - 1;
    if (idx >= 0 && idx < totalSlides) {
      applySlideState(idx);
    }
  }
})();
