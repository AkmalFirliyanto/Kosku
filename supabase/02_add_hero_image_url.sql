-- ============================================
-- MIGRATION SCRIPT: Tambah Kolom hero_image_url
-- ============================================

-- Tambahkan kolom hero_image_url ke tabel kos_info
ALTER TABLE kos_info ADD COLUMN IF NOT EXISTS hero_image_url text;
