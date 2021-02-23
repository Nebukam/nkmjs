/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

// Use a cacheName for cache versioning
var cacheName = '$version';
var cacheURLs = %cacheURLs%;

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function (e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheName)
        .then(function (cache) {
            return cache.addAll(cacheURLs)
            .then(function () { self.skipWaiting(); });
        })
    );
});

// when the browser fetches a URL…
self.addEventListener('fetch', function (event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) { return response; } // retrieve from cache
            return fetch(event.request, { credentials: 'include' });// fetch as normal
        })
    );
});