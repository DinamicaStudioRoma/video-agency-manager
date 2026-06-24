// ============================================================
// LAYOUT CONDIVISO — topbar + barra di navigazione inferiore
// Si adatta in base al ruolo dell'utente loggato
// ============================================================

// Registra il service worker (necessario per installare l'app sul telefono)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(err => console.error("SW registration failed:", err));
}

function renderShell(profile, activePage) {
  // --- Topbar ---
  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <div class="brand"><span class="rec-dot"></span> DINAMICA</div>
    <button class="btn btn-ghost" id="logout-btn-shell">Esci</button>
  `;
  document.body.prepend(topbar);

  topbar.querySelector("#logout-btn-shell").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
  });

  // --- Voci di navigazione, in base al ruolo ---
  const navItems = [
    { id: "dashboard", label: "Home", icon: "🏠", href: "dashboard.html", roles: ["admin", "project_manager", "operatore"] },
    { id: "calendar", label: "Cal.", icon: "📅", href: "calendar.html", roles: ["admin", "project_manager", "operatore"] },
    { id: "shootings", label: "Shoot", icon: "🎬", href: "shootings.html", roles: ["admin", "project_manager"] },
    { id: "products", label: "Prod.", icon: "✂️", href: "products.html", roles: ["admin", "project_manager"] },
    { id: "projects", label: "Prog.", icon: "📁", href: "projects.html", roles: ["admin"] },
    { id: "team", label: "Team", icon: "👥", href: "team.html", roles: ["admin"] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(profile.role));

  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = visibleItems.map(item => `
    <a href="${item.href}" class="bottom-nav-item ${item.id === activePage ? "active" : ""}">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </a>
  `).join("");
  document.body.appendChild(nav);
}

// Verifica che il profilo abbia uno dei ruoli ammessi; altrimenti rimanda alla dashboard
function requireRole(profile, allowedRoles) {
  if (!profile || !allowedRoles.includes(profile.role)) {
    window.location.href = "dashboard.html";
    return false;
  }
  return true;
}
