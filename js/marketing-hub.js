/* marketing-hub.js — renders Marketing hub intro and all marketing service cards */

async function initMarketingHub() {
  try {
    const [hubRes, servicesRes] = await Promise.all([
      fetch('/data/marketing-hub.json'),
      fetch('/data/marketing-services.json')
    ]);
    const hub      = await hubRes.json();
    const services = await servicesRes.json();

    renderHubHero(hub);
    renderServiceCards(services);
    renderHubCTA(hub.cta);
  } catch (e) {
    console.error('marketing-hub.js:', e);
  }
}

function renderHubHero(hub) {
  const el = document.getElementById('hub-hero-content');
  if (!el) return;
  el.innerHTML = `
    <div class="badge badge-mkt">
      <svg viewBox="0 0 24 24"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
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
    <a href="/marketing/${s.slug}.html" class="service-card mkt">
      <div class="service-icon mkt">${s.icon}</div>
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

document.addEventListener('DOMContentLoaded', initMarketingHub);
