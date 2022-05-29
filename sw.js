const CACHE_VERSION = '0.4.0';
const urlsToCache = ['index.html'];

const self = this;

self.addEventListener('install', (e) => {
  e.waitUntil(
    Promise.all([
      caches
        .open(CACHE_VERSION)
        .then((cache) => {
          console.log('Cache opened successfully.');

          return cache.addAll(urlsToCache);
        })
        .catch((err) => {
          console.log('Failed to open cache.');
        }),
    ])
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => {
        caches.match('index.html');
      });
    })
  );
});

self.addEventListener('activate', (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_VERSION);

  e.waitUntil(
    caches.keys().then((cacheVersions) =>
      Promise.all(
        cacheVersions.map((cacheVersion) => {
          if (!cacheWhitelist.includes(cacheVersion))
            return caches.delete(cacheVersion);
          else return null;
        })
      )
    )
  );
});
