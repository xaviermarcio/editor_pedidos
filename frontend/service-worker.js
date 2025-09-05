const CACHE_NAME = "editor-pedidos-v1";
const urlsToCache = [
  "/frontend/index.html",
  "/frontend/login.html",
  "/frontend/register.html",
  "/frontend/reset.html",
  "/frontend/css/styles.css",         // se existir
  "/frontend/js/app.js",              // se existir
  "/frontend/js/auth.js",             // se existir
  "/frontend/js/firebase-config.js",  // se existir
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];


// Instalação do SW → adiciona ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Arquivos em cache inicial");
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação do SW → limpa caches antigos
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
});

// Intercepta requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Se já tiver no cache → retorna
      if (response) {
        return response;
      }
      // Senão → busca na rede e adiciona ao cache dinâmico
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Se falhar (ex.: offline), retorna um fallback
          if (event.request.destination === "document") {
            return caches.match("/frontend/index.html");
          }
        });
    })
  );
});
