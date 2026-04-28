'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2, Info } from 'lucide-react'

export default function SettingsTab() {
  const [info, setInfo] = useState({
    name: '',
    address: '',
    wa_number: '',
    description: '',
    maps_url: '',
    rules: '',
    hero_image_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchInfo()
  }, [])

  const fetchInfo = async () => {
    setLoading(true)
    const { data } = await supabase.from('kos_info').select('*').limit(1).single()
    if (data) setInfo(data)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const { id, created_at, updated_at, ...payload } = info
    if (info.id) {
      await supabase.from('kos_info').update(payload).eq('id', info.id)
    } else {
      await supabase.from('kos_info').insert([payload])
    }
    setSaving(false)
    alert('Pengaturan berhasil disimpan!')
    fetchInfo()
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat pengaturan...</div>

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Pengaturan Properti</h2>
        <p className="text-slate-500 mt-2 text-lg">Kelola informasi publik dan data kontak KosKu.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <section className="glass-card rounded-3xl p-8 md:p-10 shadow-sm border border-white/50">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Informasi Umum</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nama Kos</label>
                <input required type="text" value={info.name} onChange={e => setInfo({...info, name: e.target.value})} className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Nomor WhatsApp (628...)</label>
                <input required type="text" value={info.wa_number} onChange={e => setInfo({...info, wa_number: e.target.value})} className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-700" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Alamat Lengkap</label>
              <textarea required rows={2} value={info.address} onChange={e => setInfo({...info, address: e.target.value})} className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none font-medium text-slate-700" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Link Google Maps (URL iframe src)</label>
              <input type="text" value={info.maps_url} onChange={e => setInfo({...info, maps_url: e.target.value})} placeholder="https://www.google.com/maps/embed?..." className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-700" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Singkat (Hero Section)</label>
              <textarea rows={3} value={info.description} onChange={e => setInfo({...info, description: e.target.value})} className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none font-medium text-slate-700" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Link Gambar Hero (URL)</label>
              <input type="text" value={info.hero_image_url} onChange={e => setInfo({...info, hero_image_url: e.target.value})} placeholder="https://..." className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none font-medium text-slate-700" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Peraturan Kos</label>
              <textarea rows={4} value={info.rules} onChange={e => setInfo({...info, rules: e.target.value})} className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none font-medium text-slate-700" placeholder="1. Dilarang membawa hewan peliharaan&#10;2. Jam malam pukul 22.00" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg">
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  )
}
