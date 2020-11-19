// const CACHE_NAME = "football data V1.1.1";
// var urlsToCache = [
//   "/",
//   "/manifest.json",
//   "/nav.html",
//   "/index.html",
//   "/article.html",
//   "/pages/home.html",
//   "/pages/saved.html",
//   "/css/materialize.min.css",
//   "/css/za.css",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/register-sw.js",
//   "/js/api.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/js/snarkdown.umd.js",
//   "testpush.js",
//   "/asset/brand.gif",
//   "/asset/brand.png",
//   "/asset/delete.png",
//   "/asset/football.png",
//   "/asset/save.png",
//   "/asset/brand1.gif",
//   "/asset/brand1.png",
//   "/asset/c.png",
//   "/asset/cryptofun.png",
//   "/asset/cryptofun512.png",
//   "/asset/cryptofun192.png",
//   "/asset/e.png",
//   "/asset/f.png",
//   "/asset/fb.png",
//   "/asset/forum.png",
//   "/asset/gmail.png",
//   "/asset/home.png",
//   "/asset/i.png",
//   "/asset/insta.png",
//   "/asset/load.gif",
//   "/asset/news.png",
//   "/asset/short.png",
//   "/asset/t.png",
//   "/asset/twitter.png",
// ];
 
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });
// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.football-data.org/v2/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//             return response || fetch (event.request);
//         })
//     )
//   }
// });
// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'asset/brand1.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });




importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './service-worker.js', revision: '1' },
    { url: './article.html', revision: '1' },
    { url: './nav.html', revision: '1' },
    { url: './css/materialize.min.css', revision: '1' },
    { url: './css/za.css', revision: '1' },
    { url: './js/materialize.min.js', revision: '1' },
    { url: './js/api.js', revision: '1' },
    { url: './js/db.js', revision: '1' },
    { url: './js/idb.js', revision: '1' },
    { url: './js/nav.js', revision: '1' },
    { url: './js/register-sw.js', revision: '1' },
    { url: './js/snarkdown.umd.js', revision: '1' },
    { url: "./asset/brand.gif", revision: '1' },
    { url: "./asset/brand.png", revision: '1' },
    { url: "./asset/delete.png", revision: '1' },
    { url: "./asset/football.png", revision: '1' },
    { url: "./asset/save.png", revision: '1' },
    { url: "./asset/brand1.gif", revision: '1' },
    { url: "./asset/brand1.png", revision: '1' },
    { url: "./asset/c.png", revision: '1' },
    { url: "./asset/cryptofun.png", revision: '1' },
    { url: "./asset/cryptofun512.png", revision: '1' },
    { url: "./asset/cryptofun192.png", revision: '1' },
    { url: "./asset/e.png", revision: '1' },
    { url: "./asset/f.png", revision: '1' },
    { url: "./asset/fb.png", revision: '1' },
    { url: "./asset/forum.png", revision: '1' },
    { url: "./asset/gmail.png", revision: '1' },
    { url: "./asset/home.png", revision: '1' },
    { url: "./asset/i.png", revision: '1' },
    { url: "./asset/insta.png", revision: '1' },
    { url: "./asset/load.gif", revision: '1' },
    { url: "./asset/news.png", revision: '1' },
    { url: "./asset/short.png", revision: '1' },
    { url: "./asset/t.png", revision: '1' },
    { url: "./asset/twitter.png", revision: '1' },
]);



workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.cacheFirst({
        cacheName: 'fetchUrl',
        plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
            })
          ],
    })
);

workbox.routing.registerRoute(
    new RegExp(/\.(?:png|gif|jpg|jpeg|svg)$/),
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
);


workbox.routing.registerRoute(
  new RegExp('/article.html'),
  workbox.strategies.cacheFirst()
);



self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'asset/brand1.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
