/* it-service.js — reads slug from URL, fetches matching IT service, renders detail page */

async function initITService() {
  try {
    const slug = window.location.pathname
      .split('/')
      .filter(Boolean)
      .pop()
      .replace('.html', '');

    const res      = await fetch('/data/it-services.json');
    const services = await res.json();
    const service  = services.find(s => s.slug === slug);

    if (!service) {
      document.getElementById('service-detail-content').innerHTML =
        '<p style="padding:24px;color:var(--color-text-muted)">Service not found.</p>';
      return;
    }

    document.title = `${service.title} — Simmico IT Services`;
    renderServiceDetail(service);
  } catch (e) {
    console.error('it-service.js:', e);
  }
}

function renderServiceDetail(s) {
  const el = document.getElementById('service-detail-content');
  if (!el) return;

  const featuresHtml = s.features.map(f => `
    <div class="feature-item">
      <div class="feature-check">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      ${f}
    </div>
  `).join('');

  const processHtml = s.process.map(p => `
    <div class="process-step">
      <div class="step-number">${p.step}</div>
      <div class="step-content">
        <div class="step-title">${p.title}</div>
        <div class="step-desc">${p.description}</div>
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    <div class="service-detail-hero">
      <div class="service-detail-badge">
        <span class="service-detail-badge-icon">${s.icon}</span>
        <span class="service-detail-badge-label">IT Services</span>
      </div>
      <h1 class="service-detail-title">${s.title}</h1>
      <p class="service-detail-hero-body">${s.hero}</p>
    </div>

    <div class="detail-section">
      <div class="detail-section-heading">What we offer</div>
      <div class="feature-list">${featuresHtml}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-heading">How it works</div>
      <div class="process-list">${processHtml}</div>
    </div>

    <div class="detail-section">
      <div class="detail-section-heading">Who this is for</div>
      <div class="audience-block">
        <div class="audience-eyebrow">Right for you if…</div>
        <div class="audience-text">${s.audience}</div>
      </div>
    </div>

    <div class="detail-cta-section">
      <div class="cta-block">
        <div class="cta-block-heading">Ready to get started?</div>
        <div class="cta-block-body">Tell us about your project and we'll come back with a clear plan.</div>
        <a href="/contact.html" class="btn btn-primary">${s.cta}</a>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initITService);
