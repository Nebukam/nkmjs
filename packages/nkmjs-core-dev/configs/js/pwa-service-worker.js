/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

// Use a cacheUID for cache versioning
const cacheUID = '%build-uid%';
const cacheURLs = % cacheURLs %;

function Broadcast(p_data) {
    const msg = p_data;
    self.clients.matchAll()
        .then(function (clients) {
            for (const client of clients) {
                client.postMessage(msg);
                console.log(`[SW -> CLIENT]`, msg);
            };
        });
}

//#region Installation & Activation

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function (e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    e.waitUntil(
        caches.open(cacheUID)
            .then(function (cache) {
                return cache.addAll(cacheURLs)
                    .then(function () {
                        self.skipWaiting();
                        Broadcast({ signal: `installed` });
                        Broadcast({ signal: `cache-ready` });
                    })
                    .catch((e) => {
                        console.error(e);
                        self.Broadcast({ signal: `error`, err: e });
                    });
            })
            .catch((e) => {
                console.error(e);
                self.Broadcast({ signal: `error`, err: e });
            })
    );
});

// Invalidate old caches on activation
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return (cacheName !== cacheUID);
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// when the browser fetches a URL…
self.addEventListener('fetch', function (event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) { return response; } // retrieve from cache
            return fetch(event.request);// fetch as normal
        })
    );
});

//#endregion

//#region Misc

// listen to app messages
self.addEventListener('message', function handler(event) {
    console.log(`[INSIDE SW : message event :]`);
    console.log(event);
    if (event.data.command === 'deleteCache') {
        caches.delete(cacheUID);
    } else if (event.data.command === 'skipWaiting') {
        self.skipWaiting();
    }
    /*
    else if(event.data.url){
            event.respondWith(
                fetch(event.data.url, { mode: 'no-cors' })
                .then((response) => {
                    response = response.clone();
                    if (!event.data.type || event.data.type == 'text') {
                        return response.text();
                    } else if (event.data.type == 'blob') {
                        return response.blob();
                    } else if (event.data.type == 'json') {
                        return response.json();
                    } else if (event.data.type == 'arrayBuffer') {
                        return response.arrayBuffer();
                    }
                })
                .then((data) => {
                    if (event.data.type == 'blob') {
                        var reader = new FileReader();
                        data = reader.readAsDataURL(data);
                    } else if (event.data.type == 'arrayBuffer') {
                        var enc = new TextEncoder();
                        data = enc.decode(data);
                    } else {
                        data = data;
                    }
                    return { data: data };
                })
                .catch(error => {
                    return { error: error };
                })
            );
    }
    */
});

//#endregion