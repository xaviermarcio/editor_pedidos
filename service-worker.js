const CACHE_NAME = "editor-pedidos-v3";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.html",
  "/register.html",
  "/reset.html",
  "/css/styles.css",
  "/js/app.js",
  "/js/auth.js",
  "/js/firebase-config.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalação → cache inicial + skipWaiting()
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Arquivos em cache inicial");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // força ativação imediata
});

// Ativação → limpa caches antigos + assume controle
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Cache antigo removido:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // garante que a nova versão assuma
});

// Estratégia: Stale-While-Revalidate
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // fallback offline só para páginas HTML
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
      return response || fetchPromise;
    })
  );
});
