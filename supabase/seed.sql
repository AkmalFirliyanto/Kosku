-- ============================================
-- KosKu Seed Data (Data Dummy untuk Testing)
-- ============================================
-- Jalankan SQL ini SETELAH schema.sql
-- ============================================

-- Info Kos
INSERT INTO kos_info (name, address, description, rules, maps_url, wa_number) VALUES (
  'KosKu',
  'Jl. HR. Soebrantas No. 123, Pekanbaru, Riau',
  'Kos nyaman dan strategis di pusat kota Pekanbaru. Dekat dengan kampus, pusat perbelanjaan, dan akses transportasi umum. Lingkungan aman dan tenang.',
  '1. Tamu lawan jenis dilarang masuk kamar\n2. Jam malam pukul 23:00 WIB\n3. Dilarang membawa hewan peliharaan\n4. Wajib menjaga kebersihan\n5. Pembayaran dilakukan di awal bulan',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6914!2d101.4484!3d0.5071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMjUuNiJOIDEwMcKwMjYnNTQuNCJF!5e0!3m2!1sid!2sid!4v1',
  '6281234567890'
);

-- Kamar
INSERT INTO rooms (room_name, type, is_available, size_m2, description) VALUES
  ('Kamar 101', 'Tipe A', TRUE, '3x4', 'Kamar luas dengan AC, kamar mandi dalam, WiFi, lemari, meja belajar, dan kasur spring bed.'),
  ('Kamar 102', 'Tipe A', TRUE, '3x4', 'Kamar luas dengan AC, kamar mandi dalam, WiFi, lemari, meja belajar, dan kasur spring bed.'),
  ('Kamar 103', 'Tipe A', FALSE, '3x4', 'Kamar luas dengan AC, kamar mandi dalam, WiFi, lemari, meja belajar, dan kasur spring bed.'),
  ('Kamar 201', 'Tipe B', TRUE, '3x3', 'Kamar standar dengan kipas angin, kamar mandi dalam, WiFi, lemari, dan meja belajar.'),
  ('Kamar 202', 'Tipe B', FALSE, '3x3', 'Kamar standar dengan kipas angin, kamar mandi dalam, WiFi, lemari, dan meja belajar.'),
  ('Kamar 203', 'Tipe B', TRUE, '3x3', 'Kamar standar dengan kipas angin, kamar mandi dalam, WiFi, lemari, dan meja belajar.'),
  ('Kamar 301', 'Tipe C', TRUE, '4x4', 'Kamar premium ekstra luas dengan AC, kamar mandi dalam, WiFi, lemari besar, meja kerja, sofa kecil, dan balkon.'),
  ('Kamar 302', 'Tipe C', FALSE, '4x4', 'Kamar premium ekstra luas dengan AC, kamar mandi dalam, WiFi, lemari besar, meja kerja, sofa kecil, dan balkon.'),
  ('Kamar 303', 'Tipe C', TRUE, '4x4', 'Kamar premium ekstra luas dengan AC, kamar mandi dalam, WiFi, lemari besar, meja kerja, sofa kecil, dan balkon.');

-- Harga
INSERT INTO prices (room_type, daily, monthly, yearly, is_active) VALUES
  ('Tipe A', 50000, 800000, 8500000, TRUE),
  ('Tipe B', 35000, 550000, 5500000, TRUE),
  ('Tipe C', 75000, 1200000, 12000000, TRUE);

-- Promo aktif
INSERT INTO promos (title, description, discount_pct, valid_from, valid_until, is_active) VALUES
  ('Promo Spesial Ramadhan 🎉', 'Dapatkan diskon spesial untuk penyewa baru! Berlaku untuk semua tipe kamar. Segera hubungi admin untuk info lebih lanjut.', 20, '2026-04-01', '2026-06-30', TRUE);

-- FAQ
INSERT INTO faqs (question, answer, sort_order, is_active) VALUES
  ('Apakah bisa sewa harian?', 'Ya, kami menyediakan opsi sewa harian, bulanan, dan tahunan. Silakan cek tabel harga untuk detail.', 1, TRUE),
  ('Fasilitas apa saja yang tersedia?', 'Setiap kamar dilengkapi WiFi, kamar mandi dalam, lemari, dan meja belajar. Fasilitas bersama meliputi dapur, ruang tamu, parkir motor, dan laundry.', 2, TRUE),
  ('Bagaimana cara booking kamar?', 'Anda bisa mengisi form inquiry di website ini atau langsung hubungi admin via WhatsApp. Setelah konfirmasi, silakan datang untuk survey lokasi.', 3, TRUE),
  ('Apakah ada deposit?', 'Ya, deposit sebesar 1 bulan sewa yang akan dikembalikan saat checkout dengan kondisi kamar baik.', 4, TRUE),
  ('Apakah boleh bawa kendaraan?', 'Tersedia parkir motor gratis. Untuk parkir mobil, silakan hubungi admin untuk ketersediaan slot.', 5, TRUE);
