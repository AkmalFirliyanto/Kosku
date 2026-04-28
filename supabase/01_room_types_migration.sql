-- ============================================
-- MIGRATION SCRIPT: Perubahan Struktur Kamar
-- ============================================

-- 1. Hapus tabel rooms yang lama
DROP TABLE IF EXISTS rooms;

-- 2. Buat tabel room_types yang baru
CREATE TABLE room_types (
  id bigint primary key generated always as identity,
  name text not null,
  total_count integer default 0,
  available_count integer default 0,
  size_m2 text,
  description text,
  image_urls text[] default array[]::text[],
  updated_at timestamptz default now()
);

-- 3. Aktifkan RLS
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;

-- 4. Buat Policy (Keamanan Data)
CREATE POLICY "Public can view room types" ON room_types FOR SELECT USING (true);
CREATE POLICY "Admin can insert room types" ON room_types FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin can update room types" ON room_types FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can delete room types" ON room_types FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Aktifkan Realtime untuk tabel baru ini
ALTER PUBLICATION supabase_realtime ADD TABLE room_types;

-- 6. Masukkan Data Awal (Dummy)
INSERT INTO room_types (name, total_count, available_count, size_m2, description) VALUES
('Tipe A', 10, 2, '3x4', 'Kamar luas dengan AC, kamar mandi dalam, WiFi, lemari, meja belajar, dan kasur spring bed.'),
('Tipe B', 5, 0, '3x3', 'Kamar standar dengan kipas angin, kamar mandi dalam, WiFi, lemari, dan meja belajar.'),
('Tipe C', 3, 3, '4x4', 'Kamar premium ekstra luas dengan AC, kamar mandi dalam, WiFi, lemari besar, meja kerja, sofa kecil, dan balkon.');
