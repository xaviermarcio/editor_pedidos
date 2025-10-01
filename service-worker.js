const CACHE_NAME = "editor-pedidos-v3";

// Somente os arquivos essenciais para abrir o app offline
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
  "/js/index.js",
  "/js/register.js",
  "/js/reset.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalação do SW → adiciona ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Cache inicial adicionado");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // força ativação imediata do novo SW
});

// Ativação do SW → limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Cache antigo removido:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // garante que os clientes usem o novo SW
});

// Intercepta requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // retorna do cache se já existir
      }
      return fetch(event.request)
        .then(networkResponse => {
          // adiciona ao cache dinâmico
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // fallback se offline e for documento HTML
          if (event.request.destination === "document") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
