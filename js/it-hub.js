/* it-hub.js — renders IT hub intro and all IT service cards */

async function initITHub() {
  try {
    const [hubRes, servicesRes] = await Promise.all([
      fetch('/data/it-hub.json'),
      fetch('/data/it-services.json')
    ]);
    const hub      = await hubRes.json();
    const services = await servicesRes.json();

    renderHubHero(hub);
    renderServiceCards(services);
    renderHubCTA(hub.cta);
  } catch (e) {
    console.error('it-hub.js:', e);
  }
}

function renderHubHero(hub) {
  const el = document.getElementById('hub-hero-content');
  if (!el) return;
  el.innerHTML = `
    <div class="badge badge-it">
      <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      ${hub.badge}
    </div>
    <h1 class="hub-title">${hub.title}</h1>
    <p class="hub-desc">${hub.body}</p>
  `;
}

function renderServiceCards(services) {
  const el = document.getElementById('services-grid');
  if (!el) return;
  el.innerHTML = services.map(s => `
    <a href="/it/${s.slug}.html" class="service-card it">
      <div class="service-icon it">${s.icon}</div>
      <div class="service-info">
        <div class="service-name">${s.title}</div>
        <div class="service-desc">${s.shortDescription}</div>
      </div>
      <div class="service-chevron">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join('');
}

function renderHubCTA(cta) {
  const el = document.getElementById('hub-cta-content');
  if (!el) return;
  el.innerHTML = `
    <div class="cta-block">
      <div class="cta-block-heading">${cta.heading}</div>
      <div class="cta-block-body">${cta.body}</div>
      <a href="${cta.href}" class="btn btn-primary">${cta.buttonLabel}</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initITHub);
