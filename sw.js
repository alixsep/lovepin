const CACHE_VERSION = '0.5.0';
const urlsToCache = 
[
  "/lovepin/",
  "/lovepin/apple-icon-180.png",
  "/lovepin/asset-manifest.json",
  "/lovepin/favicon-196.png",
  "/lovepin/index.html",
  "/lovepin/manifest-icon-192.maskable.png",
  "/lovepin/manifest-icon-512.maskable.png",
  "/lovepin/manifest.json",
  "/lovepin/static/css/main.2aa18b5b.css",
  "/lovepin/static/js/main.ade5c541.js"
]
;

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
    caches.match(e.request).then(function (response) {
      if (response) {
        return response;
      } else
        return fetch(e.request)
          .catch(() => {
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
        })
      )
    )
  );
});
