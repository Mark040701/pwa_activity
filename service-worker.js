const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/superhero.html",
  "/superstyle.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// Install service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached assets when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update service worker and clear old cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== CACHE_NAME)
          .map((cache) => caches.delete(cache))
      );
    })
  );
});
