(function () {
  // Inject top nav (desktop, via CSS)
  createTopNav();

  // Highlight active bottom nav item
  var activeNav = document.body.getAttribute('data-nav');
  if (activeNav) {
    var navEl = document.getElementById('nav-' + activeNav);
    if (navEl) navEl.classList.add('active');
  }

  // Inject contact info from config
  document.querySelectorAll('[data-config="phone-href"]').forEach(function (el) {
    el.href = 'tel:' + SIMMICO.phone;
  });
  document.querySelectorAll('[data-config="wa-href"]').forEach(function (el) {
    el.href = 'https://wa.me/' + SIMMICO.whatsapp;
  });
  document.querySelectorAll('[data-config="email-href"]').forEach(function (el) {
    el.href = 'mailto:' + SIMMICO.email;
  });
  document.querySelectorAll('[data-config="email"]').forEach(function (el) {
    el.textContent = SIMMICO.email;
  });

  // Render service list on hub pages
  var serviceList = document.getElementById('service-list');
  var hubType = document.body.getAttribute('data-hub');
  if (serviceList && hubType) {
    fetch('/data/services.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { renderServices(serviceList, data[hubType].services, hubType); })
      .catch(function () {});
  }

  // PWA install banner
  var deferredPrompt;
  var banner = document.getElementById('install-banner');

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (banner) banner.style.display = 'flex';
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    if (banner) banner.style.display = 'none';
  });

  window.installApp = function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        if (banner) banner.style.display = 'none';
      });
    }
  };

  window.dismissBanner = function (e) {
    e.stopPropagation();
    if (banner) banner.style.display = 'none';
  };
})();

function createTopNav() {
  var shell = document.querySelector('.shell');
  var pageContent = document.querySelector('.page-content');
  if (!shell || !pageContent) return;

  var activeNav = document.body.getAttribute('data-nav');
  var path = window.location.pathname;

  var itLinks = [
    ['Web Development',       '/it/web-development.html'],
    ['App Development',       '/it/app-development.html'],
    ['AI & Automation',       '/it/ai-automation.html'],
    ['Cloud & Infrastructure','/it/cloud-infrastructure.html'],
    ['Cybersecurity',         '/it/cybersecurity.html'],
    ['IT Support & Admin',    '/it/support-admin.html'],
    ['Software Integration',  '/it/software-integration.html'],
    ['Network & Systems',     '/it/network-systems.html']
  ];

  var mktLinks = [
    ['Brand Strategy & Identity', '/marketing/brand-strategy.html'],
    ['Digital Marketing',         '/marketing/digital-marketing.html'],
    ['Content Creation',          '/marketing/content-creation.html'],
    ['Social Media',              '/marketing/social-media.html'],
    ['SEO & Performance',         '/marketing/seo-performance.html'],
    ['Paid Advertising',          '/marketing/paid-advertising.html'],
    ['Campaign Management',       '/marketing/campaign-management.html'],
    ['Photography & Video',       '/marketing/photography-video.html']
  ];

  var chevron = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';

  function buildDropdown(links) {
    var items = links.map(function (l) {
      var cls = (path === l[1]) ? ' class="active"' : '';
      return '<a href="' + l[1] + '"' + cls + '>' + l[0] + '</a>';
    }).join('');
    return '<div class="tn-dropdown"><div class="tn-dropdown-inner">' + items + '</div></div>';
  }

  function tnl(label, href, navKey) {
    var cls = 'tnl' + (activeNav === navKey ? ' active' : '');
    return '<a class="' + cls + '" href="' + href + '">' + label + '</a>';
  }

  var nav = document.createElement('nav');
  nav.className = 'topnav';
  nav.innerHTML =
    '<a class="logo" href="/"><span class="s">Simmi</span><span class="c">co</span></a>' +
    '<div class="topnav-links">' +
      tnl('Home', '/', 'home') +
      '<div class="tnl-wrap">' +
        '<a class="tnl' + (activeNav === 'it' ? ' active' : '') + '" href="/it/">IT Services ' + chevron + '</a>' +
        buildDropdown(itLinks) +
      '</div>' +
      '<div class="tnl-wrap">' +
        '<a class="tnl' + (activeNav === 'marketing' ? ' active' : '') + '" href="/marketing/">Marketing ' + chevron + '</a>' +
        buildDropdown(mktLinks) +
      '</div>' +
      tnl('About', '/about.html', 'about') +
      '<a class="tnl-cta" href="/contact.html">Get in touch</a>' +
    '</div>';

  shell.insertBefore(nav, pageContent);
}

function renderServices(container, services, type) {
  container.innerHTML = services.map(function (svc) {
    return '<a class="sc ' + type + '" href="' + svc.href + '">' +
      '<div class="si ' + type + '"><svg viewBox="0 0 24 24">' + svc.icon + '</svg></div>' +
      '<div style="flex:1"><div class="sn">' + svc.name + '</div><div class="st">' + svc.tagline + '</div></div>' +
      '<div class="chev"><svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg></div>' +
      '</a>';
  }).join('');
}
