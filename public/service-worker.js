const APP_PREFIX = "BudgetTracker-";    
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./public/index.html",
    "./public/css/styles.css",
    "./public/js/index.js",
    "./public/js/idb.js",
    "./public/manifest.json",
    "./public/icons/icon-512x512.png",
    "./public/icons/icon-384x384.png",
    "./public/icons/icon-192x192.png",
    "./public/icons/icon-152x152.png",
    "./public/icons/icon-144x144.png",
    "./public/icons/icon-128x128.png",
    "./public/icons/icon-96x96.png",
    "./public/icons/icon-72x72.png"
];


self.addEventListener('install', function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Your files were pre-cached successfully!');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});