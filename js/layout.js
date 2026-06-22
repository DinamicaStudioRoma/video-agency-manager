// ============================================================
// LAYOUT CONDIVISO — topbar + barra di navigazione inferiore
// Si adatta in base al ruolo dell'utente loggato
// ============================================================

function renderShell(profile, activePage) {
  // --- Topbar ---
  const topbar = document.createElement("div");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <div class="brand"><span class="rec-dot"></span> ON SET</div>
    <button class="btn btn-ghost" id="logout-btn-shell">Esci</button>
  `;
  document.body.prepend(topbar);

  topbar.querySelector("#logout-btn-shell").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
  });

  // --- Voci di navigazione, in base al ruolo ---
  const navItems = [
    { id: "dashboard", label: "Home", href: "dashboard.html", roles: ["admin", "project_manager", "operatore"] },
    { id: "shootings", label: "Shooting", href: "shootings.html", roles: ["admin", "project_manager"] },
    { id: "products", label: "Prodotti", href: "products.html", roles: ["admin", "project_manager"] },
    { id: "projects", label: "Progetti", href: "projects.html", roles: ["admin"] },
    { id: "team", label: "Team", href: "team.html", roles: ["admin"] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(profile.role));

  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = visibleItems.map(item => `
    <a href="${item.href}" class="bottom-nav-item ${item.id === activePage ? "active" : ""}">
      ${item.label}
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
