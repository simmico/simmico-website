/* =========================================================================
   SIMMICO - Custom Software, Automation & Marketing
   Core Interactive Engine (Vanilla ES6)
   ========================================================================= */

/**
 * 1. Inject Config Values into DOM
 */
function injectConfig() {
  if (typeof CONFIG === 'undefined') return;

  // Replace text for elements with data-cfg attribute
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const key = el.getAttribute('data-cfg');
    if (CONFIG[key] != null) el.textContent = CONFIG[key];
  });

  // Wire WhatsApp direct message links
  document.querySelectorAll('[data-wa]').forEach(el => {
    const customMsg = el.getAttribute('data-wa') || "Hi Simmico, I would like to discuss a project.";
    el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(customMsg)}`;
  });

  // Wire direct mailto links
  document.querySelectorAll('[data-mailto]').forEach(el => {
    el.href = `mailto:${CONFIG.email}`;
    if (!el.textContent.trim()) el.textContent = CONFIG.email;
  });

  // Wire telephone call links
  document.querySelectorAll('[data-tel]').forEach(el => {
    el.href = `tel:${CONFIG.phone.replace(/\s+/g, '')}`;
    if (!el.textContent.trim()) el.textContent = CONFIG.phone;
  });

  // Set current year in footers
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * 2. Active Route Navigation Highlighting
 */
function initNavigation() {
  const currentPath = window.location.pathname.toLowerCase();
  
  const routes = [
    { name: 'solutions', file: 'solutions.html' },
    { name: 'services', file: 'services.html' },
    { name: 'process', file: 'process.html' },
    { name: 'about', file: 'about.html' },
    { name: 'contact', file: 'contact.html' },
    { name: 'home', file: 'index.html' }
  ];

  let activeRoute = 'home';
  for (const route of routes) {
    if (currentPath.includes(route.file)) {
      activeRoute = route.name;
      break;
    }
  }

  // Set active class on desktop nav
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (activeRoute === 'home' && (href === 'index.html' || href === './' || href === '/')) {
      link.classList.add('active');
    } else if (activeRoute !== 'home' && href.includes(activeRoute)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Set active class on mobile dock
  const dockItems = document.querySelectorAll('.mobile-bottom-dock .dock-item');
  dockItems.forEach(item => {
    const href = (item.getAttribute('href') || '').toLowerCase();
    if (activeRoute === 'home' && (href === 'index.html' || href === './' || href === '/')) {
      item.classList.add('active');
    } else if (activeRoute !== 'home' && href.includes(activeRoute)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * 3. DOM Ready Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  injectConfig();
  initNavigation();
});
