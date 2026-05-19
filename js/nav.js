/* nav.js — bottom nav active state, desktop dropdown population */

(function () {
  const path = window.location.pathname;

  /* ---- Bottom nav active state ---- */
  function getActiveSection() {
    if (path === '/' || path === '/index.html' || path.endsWith('/index.html') && !path.includes('/it/') && !path.includes('/marketing/')) {
      return 'home';
    }
    if (path.includes('/it/'))        return 'it';
    if (path.includes('/marketing/')) return 'marketing';
    if (path.includes('/about'))      return 'about';
    if (path.includes('/contact'))    return 'contact';
    return 'home';
  }

  const active = getActiveSection();

  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.section === active) {
      item.classList.add('active');
    }
  });

  /* ---- Desktop top nav active state ---- */
  document.querySelectorAll('.top-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = new URL(href, window.location.origin).pathname;
    if (path === linkPath || (linkPath !== '/' && path.startsWith(linkPath.replace(/\/$/, '')))) {
      link.classList.add('active');
    }
  });

  /* ---- Populate desktop dropdowns from JSON ---- */
  async function populateDropdowns() {
    try {
      const [itRes, mktRes] = await Promise.all([
        fetch('/data/it-services.json'),
        fetch('/data/marketing-services.json')
      ]);
      const itServices  = await itRes.json();
      const mktServices = await mktRes.json();

      const itDropdown  = document.getElementById('dropdown-it');
      const mktDropdown = document.getElementById('dropdown-mkt');

      if (itDropdown) {
        itDropdown.innerHTML = itServices.map(s => `
          <a href="/it/${s.slug}.html" class="dropdown-link">
            <span class="dropdown-link-icon">${s.icon}</span>
            ${s.title}
          </a>
        `).join('');
      }

      if (mktDropdown) {
        mktDropdown.innerHTML = mktServices.map(s => `
          <a href="/marketing/${s.slug}.html" class="dropdown-link">
            <span class="dropdown-link-icon">${s.icon}</span>
            ${s.title}
          </a>
        `).join('');
      }
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', populateDropdowns);
})();
