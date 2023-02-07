/* eslint-env serviceworker */

const CACHE_NAME = 'albertoelias.me-cache-v1'

/**
 * Fetches request and saves it to the cache
 * @param {Cache} cache - The cache where the request will be saved
 * @param {Request} request - The request to fetch
 * @param {Response} response - Original response if the request was already in the cache
 *
 * @returns {Promise} response
 */
function fetchAndAddToCache (cache, request, response) {
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone())
      return networkResponse
    })

  return response || fetchPromise
}

self.addEventListener('install', (event) => {
  event.waitUntil(() => {
    return caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll([
          '/src/css/main.css',
          '/css/vendor/solarized_dark.css',
          '/src/js/main.js',
          '/src/js/jsconsole.js',
          '/src/js/person.js',
          '/src/js/vendor/highlight.pack.js',
          '/index.html',
          '/manifest.json'
        ])
      })
      .then(() => {
        self.skipWaiting()
      })
  })
})

self.addEventListener('activate', (event) => {
  event.waitUntil(() => {
    caches.keys()
      .then((cacheNames) => {
        cacheNames = cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })

        return Promise.all(cacheNames)
      })
      .then(() => {
        self.clients.claim()
      })
  })
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method === 'GET' && (url.origin === self.location.origin || url.origin === 'https://polyfill.io')) {
    event.respondWith(
      // Stale-while-revalidate
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              return fetchAndAddToCache(cache, request, response)
            }, () => {
              return fetchAndAddToCache(cache, request)
            })
            .catch((error) => {
              console.log('log: ', error)
            })
        })
    )
  }
})
