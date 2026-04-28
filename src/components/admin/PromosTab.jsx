'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit2, Plus, Trash2, X } from 'lucide-react'

export default function PromosTab() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [form, setForm] = useState({
    title: '', description: '', discount_pct: 0, valid_until: '', is_active: true
  })

  const supabase = createClient()

  useEffect(() => {
    fetchPromos()
  }, [])

  const fetchPromos = async () => {
    setLoading(true)
    const { data } = await supabase.from('promos').select('*').order('id', { ascending: false })
    if (data) setPromos(data)
    setLoading(false)
  }

  const openModal = (promo = null) => {
    if (promo) {
      setForm({
        ...promo,
        valid_until: promo.valid_until ? promo.valid_until.split('T')[0] : ''
      })
      setEditingId(promo.id)
    } else {
      setForm({ title: '', description: '', discount_pct: 0, valid_until: '', is_active: true })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, created_at, updated_at, ...payload } = form
    if (editingId) {
      await supabase.from('promos').update(payload).eq('id', editingId)
    } else {
      await supabase.from('promos').insert([payload])
    }
    setIsModalOpen(false)
    fetchPromos()
  }

  const handleDelete = async (id) => {
    if (confirm('Hapus promo ini?')) {
      await supabase.from('promos').delete().eq('id', id)
      fetchPromos()
    }
  }

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('promos').update({ is_active: !currentStatus }).eq('id', id)
    fetchPromos()
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat data promo...</div>

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Manajemen Promo</h2>
          <p className="text-slate-500 mt-2 text-lg">Kelola penawaran spesial dan diskon.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md hover:bg-indigo-700 active:scale-95 transition-all">
          <Plus className="w-5 h-5" /> Tambah Promo
        </button>
      </header>

      <section className="glass-card rounded-3xl p-8 shadow-sm overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Judul Promo</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Diskon</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Berlaku Sampai</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {promos.map((promo) => (
                <tr key={promo.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6">
                    <p className="font-bold text-slate-900">{promo.title}</p>
                    <p className="text-xs text-slate-400 max-w-xs truncate">{promo.description}</p>
                  </td>
                  <td className="py-6 font-bold text-indigo-600">{promo.discount_pct}%</td>
                  <td className="py-6 font-medium text-slate-600">
                    {promo.valid_until ? new Date(promo.valid_until).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="py-6 text-center">
                    <button 
                      onClick={() => toggleActive(promo.id, promo.is_active)}
                      className={promo.is_active ? 'toggle-switch-on' : 'toggle-switch-off'}
                    >
                      <span className={promo.is_active ? 'toggle-dot-on' : 'toggle-dot-off'} />
                    </button>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(promo)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(promo.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {promos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">Belum ada promo.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-white/90 w-full max-w-lg rounded-[2rem] p-10 shadow-2xl transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900">{editingId ? 'Edit Promo' : 'Tambah Promo'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-6 h-6"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Judul Promo (Misal: Diskon Merdeka)</label>
                <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Diskon (%)</label>
                  <input required type="number" min="0" max="100" value={form.discount_pct} onChange={e => setForm({...form, discount_pct: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Berlaku Sampai</label>
                  <input required type="date" value={form.valid_until} onChange={e => setForm({...form, valid_until: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Singkat</label>
                <textarea required rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-lg mt-4">
                Simpan Promo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
