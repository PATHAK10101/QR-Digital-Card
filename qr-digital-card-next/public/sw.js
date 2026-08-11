const CACHE_NAME = "qrcard-shell-v1"

const APP_SHELL = [
  "/",
  "/create",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL)
    }),
  )

  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      )
    }),
  )

  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const request = event.request

  if (request.method !== "GET") {
    return
  }

  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/p/")
  ) {
    return
  }

  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request)
    }),
  )
})