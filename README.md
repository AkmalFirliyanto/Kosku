# KosKu - Manajemen Kos Modern

KosKu adalah platform website profil dan manajemen kos-kosan modern yang dirancang khusus sebagai bagian dari **Tugas Capstone Project**. Aplikasi ini memberikan kemudahan bagi pemilik kos (Admin) dalam mengelola ketersediaan kamar, mengatur harga, dan membuat promo, sekaligus memberikan pengalaman (*UI/UX*) terbaik bagi calon penghuni yang sedang mencari kamar.

## ✨ Fitur Utama

### 🏢 Halaman Publik (Calon Penghuni)
- **Desain Modern & Responsif:** Tampilan elegan (menggunakan *Tailwind CSS*) yang beradaptasi sempurna di perangkat laptop maupun *smartphone* (HP).
- **Cek Ketersediaan Real-Time:** Menampilkan jumlah kamar yang masih kosong langsung secara presisi.
- **Pemesanan Mudah:** Terintegrasi langsung dengan WhatsApp Admin untuk *booking* kamar.
- **Informasi Transparan:** Calon penghuni bisa melihat detail harga, promo yang berlaku, foto galeri kamar, lokasi Maps, hingga FAQ dengan jelas.

### 🔐 Halaman Admin (Pemilik Kos)
- **Manajemen Tipe Kamar:** Menambah, mengedit, menghapus, serta mengatur sisa ketersediaan unit kamar.
- **Upload Galeri Foto:** Terintegrasi dengan *Supabase Storage* untuk menyimpan foto-foto kamar.
- **Manajemen Harga & Promo:** Mengatur paket harga (harian/bulanan/tahunan) dan diskon secara dinamis.
- **Sistem Keamanan Berlapis:** Melindungi halaman dashboard dengan Supabase Authentication & *Middleware* Next.js, sehingga hanya yang memiliki *password* yang bisa masuk.
- **Tampilan Khusus Mobile:** Admin tetap bisa mengedit data kos dengan nyaman hanya melalui HP berkat layout *Card Responsive*.

## 🛠️ Teknologi yang Digunakan
- **Frontend Framework:** Next.js 14 (App Router), React
- **Styling:** Vanilla CSS, Tailwind CSS, Lucide Icons
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)
- **Deployment:** Vercel

## 🚀 Cara Menjalankan Project

1. *Clone repository* ini:
   ```bash
   git clone https://github.com/AkmalFirliyanto/Kosku.git
   ```
2. Instal *library/dependencies*:
   ```bash
   npm install
   ```
3. Atur variabel lingkungan. Buat file bernama `.env.local` dan isi dengan:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=url_supabase_kamu
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_supabase_kamu
   ```
4. Jalankan server lokal:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda. Akses `/admin` untuk masuk ke halaman pengelola.

---
**Dikembangkan oleh Akmal Firliyanto untuk keperluan Capstone Project.**
