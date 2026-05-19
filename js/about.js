/* about.js — renders story, mission, values, stats */

async function initAbout() {
  try {
    const res  = await fetch('/data/about.json');
    const data = await res.json();

    renderAboutHero(data.hero);
    renderStory(data.story);
    renderMission(data.mission);
    renderStats(data.stats);
    renderValues(data.values);
    renderTeam(data.team);
  } catch (e) {
    console.error('about.js:', e);
  }
}

function renderAboutHero(hero) {
  const el = document.getElementById('about-hero-content');
  if (!el) return;
  el.innerHTML = `
    <h1 class="about-title">${hero.title}</h1>
    <p class="about-body">${hero.body}</p>
  `;
}

function renderStory(paragraphs) {
  const el = document.getElementById('story-content');
  if (!el) return;
  el.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
}

function renderMission(text) {
  const el = document.getElementById('mission-content');
  if (!el) return;
  el.innerHTML = `
    <div class="mission-eyebrow">Our mission</div>
    <div class="mission-text">${text}</div>
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

function renderValues(values) {
  const el = document.getElementById('values-content');
  if (!el) return;
  el.innerHTML = values.map(v => `
    <div class="value-card">
      <div class="value-text-title">${v.title}</div>
      <div class="value-text-body">${v.body}</div>
    </div>
  `).join('');
}

function renderTeam(team) {
  const el = document.getElementById('team-content');
  if (!el) return;
  el.innerHTML = `
    <h2 class="team-heading">${team.heading}</h2>
    <p class="team-body">${team.body}</p>
    <p class="team-placeholder">${team.placeholder}</p>
  `;
}

document.addEventListener('DOMContentLoaded', initAbout);
