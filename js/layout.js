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
    { id: "projects", label: "Progetti", icon: "📁", href: "projects.html", roles: ["admin"], overflow: true },
    { id: "team", label: "Team", icon: "👥", href: "team.html", roles: ["admin"], overflow: true },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(profile.role));
  const mainItems = visibleItems.filter(item => !item.overflow);
  const overflowItems = visibleItems.filter(item => item.overflow);
  const overflowActive = overflowItems.some(item => item.id === activePage);

  const nav = document.createElement("nav");
  nav.className = "bottom-nav";

  let navHtml = mainItems.map(item => `
    <a href="${item.href}" class="bottom-nav-item ${item.id === activePage ? "active" : ""}">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </a>
  `).join("");

  if (overflowItems.length > 0) {
    navHtml += `
      <button type="button" id="nav-more-btn" class="bottom-nav-item ${overflowActive ? "active" : ""}">
        <span class="nav-icon">⋯</span>
        <span class="nav-label">Più</span>
      </button>
    `;
  }

  nav.innerHTML = navHtml;
  document.body.appendChild(nav);

  if (overflowItems.length > 0) {
    const panel = document.createElement("div");
    panel.className = "nav-more-panel";
    panel.id = "nav-more-panel";
    panel.innerHTML = overflowItems.map(item => `
      <a href="${item.href}" class="nav-more-item ${item.id === activePage ? "active" : ""}">
        <span class="nav-icon">${item.icon}</span> ${item.label}
      </a>
    `).join("");
    document.body.appendChild(panel);

    const moreBtn = document.getElementById("nav-more-btn");
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && e.target !== moreBtn) panel.classList.remove("open");
    });
  }
}

// Verifica che il profilo abbia uno dei ruoli ammessi; altrimenti rimanda alla dashboard
function requireRole(profile, allowedRoles) {
  if (!profile || !allowedRoles.includes(profile.role)) {
    window.location.href = "dashboard.html";
    return false;
  }
  return true;
}
