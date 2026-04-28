'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit2, Plus, Trash2, X, Image as ImageIcon, Upload, Loader2, Search } from 'lucide-react'

export default function RoomsTab() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [form, setForm] = useState({
    name: '', total_count: 0, available_count: 0, size_m2: '', description: '', image_urls: []
  })
  const [uploading, setUploading] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    setLoading(true)
    const { data } = await supabase.from('room_types').select('*').order('id')
    if (data) setRooms(data)
    setLoading(false)
  }

  const openModal = (room = null) => {
    if (room) {
      setForm(room)
      setEditingId(room.id)
    } else {
      setForm({ name: '', total_count: 0, available_count: 0, size_m2: '', description: '', image_urls: [] })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, created_at, updated_at, ...payload } = form
    if (editingId) {
      await supabase.from('room_types').update({...payload, updated_at: new Date().toISOString()}).eq('id', editingId)
    } else {
      await supabase.from('room_types').insert([payload])
    }
    setIsModalOpen(false)
    fetchRooms()
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus tipe kamar ini beserta semua fotonya?')) {
      await supabase.from('room_types').delete().eq('id', id)
      fetchRooms()
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `room_types/${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)

      setForm((prev) => ({
        ...prev,
        image_urls: [...prev.image_urls, publicUrl]
      }))
    } catch (error) {
      alert('Gagal mengupload gambar: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, idx) => idx !== indexToRemove)
    }))
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat data kamar...</div>

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Manajemen Tipe Kamar</h2>
          <p className="text-slate-500 mt-2 text-lg">Kelola kategori kamar, jumlah unit, dan galeri foto.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          Tambah Tipe Kamar
        </button>
      </header>

      <section className="glass-card rounded-3xl p-8 shadow-sm overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Kategori Kamar</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Total Unit</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Tersedia</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Ukuran</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Status</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {rooms.map((room) => {
                const availabilityRatio = room.total_count > 0 ? room.available_count / room.total_count : 0;
                let statusBadge = null;
                
                if (room.available_count === 0) {
                  statusBadge = <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">Penuh</span>;
                } else if (availabilityRatio < 0.3) {
                  statusBadge = <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">Sisa Sedikit</span>;
                } else {
                  statusBadge = <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Tersedia</span>;
                }

                return (
                  <tr key={room.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center">
                          {room.image_urls && room.image_urls.length > 0 ? (
                            <img src={room.image_urls[0]} alt={room.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{room.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[150px]">{room.description || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 font-medium text-slate-600">{room.total_count} Unit</td>
                    <td className="py-6 font-medium text-slate-600">{room.available_count} Unit</td>
                    <td className="py-6 font-bold text-indigo-600">{room.size_m2}m</td>
                    <td className="py-6">{statusBadge}</td>
                    <td className="py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openModal(room)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(room.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Belum ada tipe kamar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-white/90 w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl transition-transform duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-extrabold text-slate-900">{editingId ? 'Edit Tipe Kamar' : 'Tambah Tipe Kamar'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nama Tipe (Misal: Tipe A)</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Ukuran (Misal: 3x4)</label>
                  <input required type="text" value={form.size_m2} onChange={e => setForm({...form, size_m2: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Total Kamar</label>
                  <input required type="number" min="0" value={form.total_count} onChange={e => setForm({...form, total_count: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Kamar Kosong (Tersedia)</label>
                  <input required type="number" min="0" max={form.total_count} value={form.available_count} onChange={e => setForm({...form, available_count: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Kamar</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none" />
              </div>

              {/* Upload Gambar Section */}
              <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50/50">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Galeri Foto Tipe Ini</label>
                
                <div className="flex flex-wrap gap-4">
                  {form.image_urls.map((url, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
                      <img src={url} alt="Foto Kamar" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <button 
                        type="button" 
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer bg-white">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6 mb-1" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-lg">
                  {editingId ? 'Simpan Perubahan' : 'Buat Tipe Kamar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
