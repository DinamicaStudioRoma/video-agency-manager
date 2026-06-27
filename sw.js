// ============================================================
// SERVICE WORKER — Video Agency Manager
// Abilita l'installazione come app sul telefono E le notifiche push
// (tramite il motore di OneSignal, integrato qui per evitare conflitti)
// ============================================================

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js");

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Lascia passare tutte le richieste di rete normalmente (nessuna cache offline per ora,
// teniamo sempre i dati aggiornati dal database)
self.addEventListener("fetch", (event) => {
  // intenzionalmente vuoto
});
