/* sw.js — service worker for Simmico PWA */

const CACHE_NAME = 'simmico-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/it/',
  '/marketing/',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/home.css',
  '/css/about.css',
  '/css/contact.css',
  '/css/it-hub.css',
  '/css/it-service.css',
  '/css/marketing-hub.css',
  '/css/marketing-service.css',
  '/js/config.js',
  '/js/nav.js',
  '/js/pwa.js',
  '/js/home.js',
  '/js/about.js',
  '/js/contact.js',
  '/js/it-hub.js',
  '/js/it-service.js',
  '/js/marketing-hub.js',
  '/js/marketing-service.js',
  '/data/company.json',
  '/data/it-services.json',
  '/data/marketing-services.json',
  '/data/home.json',
  '/data/about.json',
  '/data/contact.json',
  '/data/it-hub.json',
  '/data/marketing-hub.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
      return cached || network;
    })
  );
});
