/* ============================================
   SIMMICO — app.js
   ============================================ */

const ICONS = {
  web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h.01M10 8h5"/></svg>`,
  app: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,
  ai:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>`,
  security: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  integration: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3M8.5 16.5 12 11l3.5 5.5"/></svg>`,
  brand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  digital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  content: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>`,
  social: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  seo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  ads: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  campaign: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  photo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
};

/* Detect active nav item */
function initNav() {
  const path = window.location.pathname;

  function isActive(href) {
    if (!href) return false;
    if (path === '/' || path === '/index.html') return href === '/index.html' || href === '/';
    if (path.startsWith('/it/'))        return href === '/it/index.html';
    if (path.startsWith('/marketing/')) return href === '/marketing/index.html';
    if (path.includes('/about'))        return href.includes('/about');
    if (path.includes('/contact'))      return href.includes('/contact');
    return false;
  }

  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    if (isActive(a.getAttribute('href'))) a.classList.add('active');
  });
  document.querySelectorAll('.bnav-item').forEach(a => {
    if (isActive(a.getAttribute('href'))) a.classList.add('active');
  });
}

/* Inject CONFIG values */
function injectConfig() {
  if (typeof CONFIG === 'undefined') return;

  document.querySelectorAll('[data-cfg]').forEach(el => {
    const k = el.getAttribute('data-cfg');
    if (CONFIG[k] != null) el.textContent = CONFIG[k];
  });

  document.querySelectorAll('[data-wa]').forEach(el => {
    const msg = el.getAttribute('data-wa') || "Hi, I'd like to get in touch with Simmico.";
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  });

  document.querySelectorAll('[data-mailto]').forEach(el => {
    el.href = `mailto:${CONFIG.email}`;
    if (!el.textContent.trim()) el.textContent = CONFIG.email;
  });

  document.querySelectorAll('[data-tel]').forEach(el => {
    el.href = `tel:${CONFIG.phone.replace(/\s/g, '')}`;
    if (!el.textContent.trim()) el.textContent = CONFIG.phone;
  });

  const yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();
}

/* Render service cards from JSON */
async function renderCards(division, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const r   = await fetch('/data/services.json');
    const data = await r.json();
    const svcs = data[division] || [];
    const isMkt = division === 'marketing';
    el.innerHTML = svcs.map(s => `
      <a href="/${s.slug}" class="service-card${isMkt ? ' mkt' : ''}">
        <div class="card-icon${isMkt ? ' mkt' : ''}">${ICONS[s.icon] || ''}</div>
        <h3>${s.title}</h3>
        <p>${s.shortDescription}</p>
      </a>`).join('');
  } catch (e) {
    console.warn('services.json load failed:', e);
  }
}

/* PWA registration */
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  injectConfig();
  renderCards('it',        'it-services-grid');
  renderCards('marketing', 'marketing-services-grid');
  renderCards('it',        'home-it-grid');
  renderCards('marketing', 'home-mkt-grid');
  registerSW();
});
