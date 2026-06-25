-- ============================================================
-- AGGIUNTA CAMPI: Ore di lavorazione (prodotti) e Data di fine (shooting)
-- Da eseguire in Supabase > SQL Editor
-- ============================================================

-- Ore di lavorazione richieste per un prodotto video (1-20 ore)
alter table video_products add column work_hours integer not null default 1;

-- Data di fine opzionale per gli shooting su più giorni
alter table shootings add column shoot_end_date date;
