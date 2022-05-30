const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const packageJson = require('../package.json');

const appVersion = packageJson.version;

let buildPath = path.join(__dirname, '..', 'build');

require('node-dir').files(buildPath, function (err, files) {
  let list = files
    .filter((file) =>
      ['.html', '.js', '.css', '.png', '.jpg', '.json'].includes(
        file.match(/\.[0-9a-z]+$/i)[0]
      )
    )
    .map((file) => file.replace(buildPath, ''))
    .filter((file) => !['/sw.js'].includes(file));

  generate(['/', ...list]);
});

const generate = (list) => {
  let sw = `const CACHE_VERSION = '${appVersion}';
const urlsToCache = 
${JSON.stringify(list, null, 2)}
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
          else return null;
        })
      )
    )
  );
});
`;

  fs.writeFile('./build/sw.js', sw, 'utf8', function (err) {
    if (err) {
      console.log('Error: ', err);
      return exit(-1);
    }

    console.log('Successfully generated service worker.');
  });
};
