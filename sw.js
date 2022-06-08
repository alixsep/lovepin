const CACHE_VERSION = '0.9.3';
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
  "/lovepin/static/js/main.8827bd26.js",
  "/lovepin/static/css/main.d64a01ba.css",
  "/lovepin/static/media/calig.a9299122816bfb2a37d6.png",
  "/lovepin/static/media/qr.58411a49525bbccdca19.png",
  "/lovepin/static/media/uk.1ad99c78720b23b8ed42.png",
  "/lovepin/static/media/us.3c9e24ecfdf1b8379cdd.png"
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
        cacheVersions
          .filter((cacheVersion) => !cacheWhitelist.includes(cacheVersion))
          .map((cacheVersion) => {
            return caches.delete(cacheVersion);
          })
      )
    )
  );
});
