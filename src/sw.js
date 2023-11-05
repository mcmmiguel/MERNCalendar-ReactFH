import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from "workbox-precaching";

import { clientsClaim } from "workbox-core";

import { NavigationRoute, registerRoute } from "workbox-routing";

cleanupOutdatedCaches();
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// to allow work offline
registerRoute(
    new NavigationRoute(createHandlerBoundToURL("index.html"), {
        denylist: [/^\/backoffice/],
    })
);

self.skipWaiting();
clientsClaim();

self.addEventListener("install", async () => {

    const cache = await caches.open("cache-1");

    await cache.addAll([
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
        '/vite.svg'
    ]);
});


const apiOfflineFallback = [
    'https://merncalendarbackend-reactfh-production.up.railway.app/api/auth/renew',
    'https://merncalendarbackend-reactfh-production.up.railway.app/api/events',
]

self.addEventListener('fetch', (event) => {

    // if (event.request.url !== 'https://merncalendarbackend-reactfh-production.up.railway.app/api/auth/renew') return;

    if (!apiOfflineFallback.includes(event.request.url)) return;
    const resp = fetch(event.request)
        .then(response => {

            if (!response) {
                return caches.match(event.request);
            }

            // Guardar en cache la respuesta 
            caches.open('cache-dynamic')
                .then(cache => cache.put(event.request, response))

            return response.clone();

        })
        .catch(err => {
            console.log('offline response');
            return caches.match(event.request)
        })

    event.respondWith(resp);

});