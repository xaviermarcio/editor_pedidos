const CACHE_NAME = "editor-pedidos-v4";

// Arquivos estáticos (CSS, JS, ícones)
const urlsToCache = [
  "/css/styles.css",
  "/js/app.js",
  "/js/auth.js",
  "/js/firebase-config.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Instalação → cache inicial de arquivos estáticos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Cache inicial adicionado");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Ativação → remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Cache antigo removido:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch → estratégia diferente para HTML vs estáticos
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Para documentos HTML → sempre buscar da rede primeiro
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Para CSS/JS/ícones → cache first, depois rede
  event.respondWith(
    caches.match(request).then((response) => {
      return (
        response ||
        fetch(request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    })
  );
});
