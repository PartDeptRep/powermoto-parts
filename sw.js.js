self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('powermoto-store').then((cache) => cache.addAll([
        '/index.html',
        '/inventory.csv'
      ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request))
    );
});