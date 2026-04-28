-- ============================================
-- KosKu Database Schema
-- ============================================
-- Jalankan SQL ini di Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================

-- 1. Tabel informasi kos
CREATE TABLE IF NOT EXISTS kos_info (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'KosKu',
  address TEXT,
  description TEXT,
  rules TEXT,
  maps_url TEXT,
  wa_number TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel kamar
CREATE TABLE IF NOT EXISTS rooms (
  id BIGSERIAL PRIMARY KEY,
  room_name TEXT NOT NULL,
  type TEXT NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  size_m2 TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel harga
CREATE TABLE IF NOT EXISTS prices (
  id BIGSERIAL PRIMARY KEY,
  room_type TEXT NOT NULL,
  daily BIGINT DEFAULT 0,
  monthly BIGINT DEFAULT 0,
  yearly BIGINT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 4. Tabel promo
CREATE TABLE IF NOT EXISTS promos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_pct INT DEFAULT 0,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- 5. Tabel foto
CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'umum',
  sort_order INT DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabel inquiry / pesan masuk
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabel FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE kos_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public READ access (untuk halaman publik)
CREATE POLICY "Public read kos_info" ON kos_info FOR SELECT USING (true);
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Public read prices" ON prices FOR SELECT USING (true);
CREATE POLICY "Public read promos" ON promos FOR SELECT USING (true);
CREATE POLICY "Public read photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);

-- Public INSERT on inquiries (form kontak publik)
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read inquiries" ON inquiries FOR SELECT USING (true);

-- Authenticated FULL access (untuk admin)
CREATE POLICY "Admin full kos_info" ON kos_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full rooms" ON rooms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full prices" ON prices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full promos" ON promos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full photos" ON photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- ENABLE REALTIME on rooms table
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
