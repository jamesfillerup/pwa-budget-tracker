const CACHE_NAME = 'budgettracker-cache-v2';
const DATA_CACHE_NAME = 'budgetdata-cache-v2';

const APP_PREFIX = "budgettracker-";    
const VERSION = 'version-01';
// const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    'index.html',
    'css/styles.css',
    'js/index.js',
    'js/idb.js',
    'manifest.json',
    'icons/icon-512x512.png',
    'icons/icon-384x384.png',
    'icons/icon-192x192.png',
    'icons/icon-152x152.png',
    'icons/icon-144x144.png',
    'icons/icon-128x128.png',
    'icons/icon-96x96.png',
    'icons/icon-72x72.png'
];


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('install from SW!');
            
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// self.addEventListener('fetch',function(e) {
    
// })



self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
            keyList.map(key => {
                console.log(key);
                if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                console.log('Removing old cache data', key);
                return caches.delete(key);
                }
            })
            );
        })
    );
    self.clients.claim();
});