'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Edit2, Plus, Trash2, X } from 'lucide-react'

export default function FAQsTab() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '', is_active: true, sort_order: 0 })

  const supabase = createClient()

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    setLoading(true)
    const { data } = await supabase.from('faqs').select('*').order('sort_order')
    if (data) setFaqs(data)
    setLoading(false)
  }

  const openModal = (faq = null) => {
    if (faq) {
      setForm(faq)
      setEditingId(faq.id)
    } else {
      setForm({ question: '', answer: '', is_active: true, sort_order: faqs.length + 1 })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, created_at, updated_at, ...payload } = form
    if (editingId) {
      await supabase.from('faqs').update(payload).eq('id', editingId)
    } else {
      await supabase.from('faqs').insert([payload])
    }
    setIsModalOpen(false)
    fetchFaqs()
  }

  const handleDelete = async (id) => {
    if (confirm('Hapus FAQ ini?')) {
      await supabase.from('faqs').delete().eq('id', id)
      fetchFaqs()
    }
  }

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('faqs').update({ is_active: !currentStatus }).eq('id', id)
    fetchFaqs()
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat FAQ...</div>

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Manajemen FAQ</h2>
          <p className="text-slate-500 mt-2 text-lg">Atur pertanyaan yang sering diajukan pelanggan.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md hover:bg-indigo-700 active:scale-95 transition-all">
          <Plus className="w-5 h-5" /> Tambah Pertanyaan
        </button>
      </header>

      <section className="glass-card rounded-3xl p-8 shadow-sm overflow-hidden border border-white/50">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Pertanyaan & Jawaban</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-center">Status Tampil</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {faqs.map((faq) => (
                <tr key={faq.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6">
                    <p className="font-bold text-slate-900 mb-1">{faq.question}</p>
                    <p className="text-sm text-slate-500 max-w-2xl">{faq.answer}</p>
                  </td>
                  <td className="py-6 text-center align-top">
                    <button 
                      onClick={() => toggleActive(faq.id, faq.is_active)}
                      className={faq.is_active ? 'toggle-switch-on' : 'toggle-switch-off'}
                    >
                      <span className={faq.is_active ? 'toggle-dot-on' : 'toggle-dot-off'} />
                    </button>
                  </td>
                  <td className="py-6 text-right align-top">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openModal(faq)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(faq.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-500">Belum ada FAQ.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm relative">
              <div className="flex justify-between items-start mb-3">
                <div className="pr-12">
                  <p className="font-bold text-slate-900 leading-snug">{faq.question}</p>
                </div>
                <button 
                  onClick={() => toggleActive(faq.id, faq.is_active)}
                  className={`absolute top-5 right-5 ${faq.is_active ? 'toggle-switch-on scale-75 origin-top-right' : 'toggle-switch-off scale-75 origin-top-right'}`}
                >
                  <span className={faq.is_active ? 'toggle-dot-on' : 'toggle-dot-off'} />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4 line-clamp-3">{faq.answer}</p>
              
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button onClick={() => openModal(faq)} className="flex-1 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => handleDelete(faq.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="text-center py-8 text-slate-500">Belum ada FAQ.</div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card bg-white/90 w-full max-w-2xl rounded-[2rem] p-10 shadow-2xl transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900">{editingId ? 'Edit FAQ' : 'Tambah FAQ'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-6 h-6"/>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Pertanyaan (Q)</label>
                <input required type="text" value={form.question} onChange={e => setForm({...form, question: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none font-bold text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Jawaban (A)</label>
                <textarea required rows={4} value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} className="w-full bg-slate-100 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all outline-none resize-none leading-relaxed" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-lg mt-4">
                Simpan Pertanyaan
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
