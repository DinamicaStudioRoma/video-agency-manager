// ============================================================
// CONFIGURAZIONE SUPABASE
// Queste chiavi sono "pubbliche" per design (protette dalle
// regole di sicurezza impostate nel database) e sicure da
// avere visibili nel codice del sito.
// ============================================================

const SUPABASE_URL = "https://llaptqfirsbkfhghuxix.supabase.co";
const SUPABASE_KEY = "sb_publishable_S_jzQaRMMKVoFepdarOwQw_Wx2BCSd3";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper: verifica se c'è una sessione attiva, altrimenti rimanda al login
async function requireAuth() {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    window.location.href = "index.html";
    return null;
  }
  return data.session;
}

// Helper: recupera il profilo (ruolo, nome) dell'utente loggato
async function getCurrentProfile() {
  const { data: sessionData } = await supabaseClient.auth.getSession();
  if (!sessionData.session) return null;

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", sessionData.session.user.id)
    .single();

  if (error) {
    console.error("Errore nel recupero del profilo:", error);
    return null;
  }
  return profile;
}
