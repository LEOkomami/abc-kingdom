const CACHE_NAME = 'abc-kingdom-v2';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './translations.js',
    './letters.js',
    './manifest.json',
    './icon-512.png'
];

self.addEventListener('install', (e) => {
    // Force this new SW to become the active one, kicking out the old one
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    // Clean up old caches so the user doesn't see stale files
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    // Take control of all pages immediately
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // 1) For HTML pages (navigation), try the Network first, then fallback to Cache.
    //    This ensures the user ALWAYS gets the latest index.html if online.
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request)
                .catch(() => caches.match(e.request))
        );
        return;
    }

    // 2) For everything else (CSS, JS, Images), look in Cache first, then Network.
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});
