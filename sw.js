// ============================================================
// SERVICE WORKER — Video Agency Manager
// Per ora: abilita l'installazione come app sul telefono.
// La gestione delle notifiche push verrà aggiunta in seguito.
// ============================================================

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
