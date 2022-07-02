// const CACHE_NAME = 'budgettracker-cache-v2';
// const DATA_CACHE_NAME = 'budgetdata-cache-v2';

const APP_PREFIX = "budgettracker-";    
const VERSION = 'version-01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/index.js',
    './js/idb.js',
    './manifest.json',
    './icons/icon-512x512.png',
    './icons/icon-384x384.png',
    './icons/icon-192x192.png',
    './icons/icon-152x152.png',
    './icons/icon-144x144.png',
    './icons/icon-128x128.png',
    './icons/icon-96x96.png',
    './icons/icon-72x72.png'
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('installed from SW!');
            
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});



self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            let keyIndex = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });

            keyIndex.push(CACHE_NAME);

            return Promise.all(keyList.map((key, i) => {
                console.log(key);
                if (keyIndex.indexOf (key ) === -1) {
                console.log('gets rid of old data', keyList);
                return caches.delete(keyList [i]);
                }
            })
            );
        })
    );
    // self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    // if (event.request.url.includes('/api/')){
        event.respondWith(
            caches.match(event.request).then(function (request) {
                if (request) { 
                    console.log('fetch request working');
                    return request
                }
                else {       
                    console.log('fetch failed on service worker');
                    return fetch(event.request)
                }
            })
        )
    
});




