// ============================================================
// SERVICE WORKER — OneSignal (notifiche push) + installabilità PWA
// File nel formato standard richiesto da OneSignal
// ============================================================

importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDKWorker.js");

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});
