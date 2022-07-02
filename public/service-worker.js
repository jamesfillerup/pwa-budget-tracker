
const APP_PREFIX = 'budgettracker-';  
const VERSION = 'v001';
const CACHE_NAME = APP_PREFIX + VERSION;
const DATA_CACHE_NAME = "cache-" + VERSION;

const FILES_TO_CACHE = [
  "/",
  "./index.html",
  "./css/styles.css",
  "./js/idb.js",
  "./js/index.js",
  "./manifest.json",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];
// this installs the cached items
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
        console.log('installed cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE);
        })
    );
});

//this fetches the items stored
self.addEventListener("fetch", function(event) {

    if (event.request.url.includes("/api/")) {
        event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(event.request)
            .then(response => {
                if (response.status === 200) {
                cache.put(event.request.url, response.clone());
                }
                return response;
            })
            .catch(err => {
            
                return cache.match(event.request);
            });
        }).catch(err => console.log(err))
        );

        return;
    }

    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request).then(function(response) {
                if (response) {
                return response;
                }
                else if (event.request.headers.get("accept").includes("text/html")) {
                return caches.match("/");
                }
            });
        })
    );
});

// Delete old saved items
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            let saveKey = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
            
            saveKey.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (saveKey.indexOf(key) === -1) {
                console.log('deleted: ' + keyList[i] );
                return caches.delete(keyList[i]);
                }
            }));
        })
    );
});