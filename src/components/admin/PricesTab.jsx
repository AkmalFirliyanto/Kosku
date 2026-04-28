'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit2, Plus, Trash2, X } from 'lucide-react'

export default function PricesTab() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ room_type: '', daily: 0, monthly: 0, yearly: 0, is_active: true })

  const supabase = createClient()

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    setLoading(true)
    const { data } = await supabase.from('prices').select('*').order('monthly')
    if (data) setPrices(data)
    setLoading(false)
  }

  const openModal = (price = null) => {
    if (price) {
      setForm(price)
      setEditingId(price.id)
    } else {
      setForm({ room_type: '', daily: 0, monthly: 0, yearly: 0, is_active: true })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, created_at, updated_at, ...payload } = form
    if (editingId) {
      await supabase.from('prices').update(payload).eq('id', editingId)
    } else {
      await supabase.from('prices').insert([payload])
    }
    setIsModalOpen(false)
    fetchPrices()
  }

  const handleDelete = async (id) => {
    if (confirm('Hapus harga ini?')) {
      await supabase.from('prices').delete().eq('id', id)
      fetchPrices()
    }
  }

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('prices').update({ is_active: !currentStatus }).eq('id', id)
    fetchPrices()
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat data harga...</div>

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Manajemen Harga</h2>
          <p className="text-slate-500 mt-2 text-lg">Atur paket harga harian, bulanan, dan tahunan.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md hover:bg-indigo-700 active:scale-95 transition-all">
          <Plus className="w-5 h-5" /> Tambah Paket Harga
        </button>
      </header>

      <section className="glass-card rounded-3xl p-8 shadow-sm overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Tipe Paket</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Harian</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Bulanan</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Tahunan</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prices.map((price) => (
                <tr key={price.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 font-bold text-slate-900">{price.room_type}</td>
                  <td className="py-6 font-medium text-slate-600">Rp {price.daily.toLocaleString('id-ID')}</td>
                  <td className="py-6 font-bold text-indigo-600">Rp {price.monthly.toLocaleString('id-ID')}</td>
                  <td className="py-6 font-medium text-slate-600">Rp {price.yearly.toLocaleString('id-ID')}</td>
                  <td className="py-6 text-center">
                    <button 
                      onClick={() => toggleActive(price.id, price.is_active)}
                      className={price.is_active ? 'toggle-switch-on' : 'toggle-switch-off'}
                    >
                      <span className={price.is_active ? 'toggle-dot-on' : 'toggle-dot-off'} />
                    </button>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(price)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(price.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {prices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Belum ada data harga.</td>
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
              <h3 className="text-2xl font-extrabold text-slate-900">{editingId ? 'Edit Harga' : 'Tambah Harga'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-6 h-6"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nama Tipe / Paket (Misal: Kamar AC)</label>
                <input required type="text" value={form.room_type} onChange={e => setForm({...form, room_type: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Harian (Rp)</label>
                  <input required type="number" min="0" value={form.daily} onChange={e => setForm({...form, daily: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Bulanan (Rp)</label>
                  <input required type="number" min="0" value={form.monthly} onChange={e => setForm({...form, monthly: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Tahunan (Rp)</label>
                  <input required type="number" min="0" value={form.yearly} onChange={e => setForm({...form, yearly: parseInt(e.target.value) || 0})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-lg mt-4">
                Simpan Harga
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
