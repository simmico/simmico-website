/* home.js — renders hero, value props, service preview cards, stats */

async function initHome() {
  try {
    const [homeRes, itRes, mktRes] = await Promise.all([
      fetch('/data/home.json'),
      fetch('/data/it-services.json'),
      fetch('/data/marketing-services.json')
    ]);
    const home        = await homeRes.json();
    const itServices  = await itRes.json();
    const mktServices = await mktRes.json();

    renderHero(home.hero);
    renderStats(home.stats);
    renderValueProps(home.valueProps);
    renderServicePreview('it-cards',  itServices,  'it',  '/it/');
    renderServicePreview('mkt-cards', mktServices, 'mkt', '/marketing/');
  } catch (e) {
    console.error('home.js:', e);
  }
}

function renderHero(hero) {
  const el = document.getElementById('hero-content');
  if (!el) return;
  el.innerHTML = `
    <div class="hero-eyebrow">${hero.eyebrow}</div>
    <h1 class="hero-title">${hero.headline}<br><span class="accent">${hero.headlineAccent}</span></h1>
    <p class="hero-body">${hero.body}</p>
    <div class="cta-row">
      <a href="${hero.primaryCTA.href}" class="btn btn-primary">${hero.primaryCTA.label}</a>
      <a href="${hero.secondaryCTA.href}" class="btn btn-secondary">${hero.secondaryCTA.label}</a>
    </div>
    <div class="hero-tagline">${hero.tagline}</div>
  `;
}

function renderStats(stats) {
  const el = document.getElementById('stats-content');
  if (!el) return;
  el.innerHTML = stats.map(s => `
    <div class="stat-block">
      <div class="stat-number">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function renderValueProps(props) {
  const el = document.getElementById('value-props-content');
  if (!el) return;
  el.innerHTML = props.map(p => `
    <div class="value-prop-item">
      <div class="value-prop-icon">${p.icon}</div>
      <div>
        <div class="value-prop-title">${p.title}</div>
        <div class="value-prop-body">${p.description}</div>
      </div>
    </div>
  `).join('');
}

function renderServicePreview(containerId, services, type, hubHref) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const preview = services.slice(0, 4);
  el.innerHTML = preview.map(s => `
    <a href="${hubHref}${s.slug}.html" class="service-card ${type}">
      <div class="service-icon ${type}">${s.icon}</div>
      <div class="service-info">
        <div class="service-name">${s.title}</div>
        <div class="service-desc">${s.shortDescription}</div>
      </div>
      <div class="service-chevron">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join('') + `
    <a href="${hubHref}" class="btn btn-ghost" style="margin-top:8px;">View all →</a>
  `;
}

document.addEventListener('DOMContentLoaded', initHome);
