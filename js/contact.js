/* contact.js — renders contact channels, WhatsApp URL, form */

async function initContact() {
  try {
    const [contactRes, companyRes] = await Promise.all([
      fetch('/data/contact.json'),
      fetch('/data/company.json')
    ]);
    const contact = await contactRes.json();
    const company = await companyRes.json();

    renderContactHero(contact.hero);
    renderChannels(contact.channels, company, contact.whatsappTemplate);
    renderForm(contact.form, company);
    renderAddress(company);
  } catch (e) {
    console.error('contact.js:', e);
  }
}

function renderContactHero(hero) {
  const el = document.getElementById('contact-hero-content');
  if (!el) return;
  el.innerHTML = `
    <h1 class="contact-title">${hero.title}</h1>
    <p class="contact-body">${hero.body}</p>
  `;
}

function buildWhatsAppUrl(number, template) {
  const clean = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(template)}`;
}

function renderChannels(channels, company, waTemplate) {
  const el = document.getElementById('contact-channels-content');
  if (!el) return;

  const icons = {
    phone: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 13a19.79 19.79 0 01-3.07-8.67A2 2 0 012.85 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
  };

  const hrefs = {
    phone:    `tel:${company.phone}`,
    whatsapp: buildWhatsAppUrl(company.whatsapp, waTemplate),
    email:    `mailto:${company.email}`
  };

  el.innerHTML = channels.map(c => `
    <a href="${hrefs[c.type]}" class="contact-btn ${c.id}" ${c.type === 'whatsapp' ? 'target="_blank" rel="noopener"' : ''}>
      <div class="contact-btn-icon">${icons[c.type]}</div>
      <div class="contact-btn-text">
        <div class="contact-btn-label">${c.label}</div>
        <div class="contact-btn-sub">${c.type === 'email' ? company.email : c.sub}</div>
      </div>
      <div class="contact-btn-arrow">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    </a>
  `).join('');
}

function renderForm(form, company) {
  const el = document.getElementById('contact-form-content');
  if (!el) return;

  const serviceOptions = form.fields.find(f => f.name === 'service');
  const optionsHtml = serviceOptions
    ? serviceOptions.options.map(o => `<option value="${o}">${o}</option>`).join('')
    : '';

  el.innerHTML = `
    <h2 class="contact-form-heading">${form.heading}</h2>
    <form class="contact-form" action="${form.action}" method="POST">
      <div class="form-field">
        <label class="form-label" for="name">Your name</label>
        <input class="form-input" type="text" id="name" name="name" required placeholder="e.g. Jane Smith">
      </div>
      <div class="form-field">
        <label class="form-label" for="email">Email address</label>
        <input class="form-input" type="email" id="email" name="email" required placeholder="your@email.com">
      </div>
      <div class="form-field">
        <label class="form-label" for="service">What can we help with?</label>
        <select class="form-select" id="service" name="service">
          <option value="">Select an option</option>
          ${optionsHtml}
        </select>
      </div>
      <div class="form-field">
        <label class="form-label" for="message">Tell us more</label>
        <textarea class="form-textarea" id="message" name="message" required placeholder="Describe your project or question…"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">${form.submitLabel}</button>
    </form>
  `;
}

function renderAddress(company) {
  const el = document.getElementById('contact-address-content');
  if (!el) return;
  el.innerHTML = `
    <div class="contact-address-heading">Find us</div>
    <div class="contact-address-text">${company.address}</div>
  `;
}

document.addEventListener('DOMContentLoaded', initContact);
