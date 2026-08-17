const cacheName = "dice-roller-v2";

const appFiles = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png"
];

/* Save the core app files for offline use */
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(appFiles);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

/* Delete caches belonging to older versions */
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                const deletionPromises = [];

                for (const name of cacheNames) {
                    if (name !== cacheName) {
                        deletionPromises.push(caches.delete(name));
                    }
                }

                return Promise.all(deletionPromises);
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

/* Use fresh online files, with the cache as an offline backup */
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                if (response.ok) {
                    const responseCopy = response.clone();

                    caches.open(cacheName).then(function (cache) {
                        cache.put(event.request, responseCopy);
                    });
                }

                return response;
            })
            .catch(function () {
                return caches.open(cacheName).then(function (cache) {
                    return cache.match(event.request);
                });
            })
    );
});