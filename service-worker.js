const cacheName = "dice-roller-v1";

const appFiles = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(appFiles);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedFile) {
            return cachedFile || fetch(event.request);
        })
    );
});