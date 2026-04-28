-- ============================================
-- MIGRATION SCRIPT: Aturan Keamanan Storage
-- ============================================

-- 1. Buat bucket 'photos' jika belum ada (dan pastikan public = true)
insert into storage.buckets (id, name, public) 
values ('photos', 'photos', true) 
on conflict (id) do update set public = true;

-- 2. Beri izin untuk BACA (Melihat gambar) ke siapa saja
create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'photos' );

-- 3. Beri izin untuk UPLOAD/INSERT ke pengguna yang sudah login (admin)
create policy "Admin Upload Access" 
on storage.objects for insert 
with check ( bucket_id = 'photos' AND auth.role() = 'authenticated' );

-- 4. Beri izin untuk UPDATE ke admin
create policy "Admin Update Access" 
on storage.objects for update 
using ( bucket_id = 'photos' AND auth.role() = 'authenticated' );

-- 5. Beri izin untuk DELETE ke admin
create policy "Admin Delete Access" 
on storage.objects for delete 
using ( bucket_id = 'photos' AND auth.role() = 'authenticated' );
