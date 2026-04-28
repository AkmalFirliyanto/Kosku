'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, CheckCircle, Mail, MessageSquareWarning } from 'lucide-react'

export default function InquiriesTab() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (data) setInquiries(data)
    setLoading(false)
  }

  const markAsRead = async (id, currentStatus) => {
    await supabase.from('inquiries').update({ is_read: !currentStatus }).eq('id', id)
    fetchInquiries()
  }

  const handleDelete = async (id) => {
    if (confirm('Hapus pesan ini permanen?')) {
      await supabase.from('inquiries').delete().eq('id', id)
      fetchInquiries()
    }
  }

  if (loading) return <div className="text-slate-500 font-medium animate-pulse">Memuat pesan...</div>

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Kotak Masuk</h2>
          <p className="text-slate-500 mt-2 text-lg">Lihat pesan dan pertanyaan dari pengunjung website.</p>
        </div>
      </header>

      <section className="glass-card rounded-3xl p-8 shadow-sm overflow-hidden border border-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Pengirim</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Isi Pesan</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Tanggal</th>
                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inquiries.map((inq) => (
                <tr key={inq.id} className={`group hover:bg-slate-50/50 transition-colors ${!inq.is_read ? 'bg-indigo-50/30' : ''}`}>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      {!inq.is_read && <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>}
                      <div>
                        <p className={`font-bold ${!inq.is_read ? 'text-indigo-900' : 'text-slate-900'}`}>{inq.name}</p>
                        <a href={`mailto:${inq.email}`} className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </a>
                        <p className="text-xs text-slate-400 mt-0.5">{inq.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <p className={`text-sm max-w-md ${!inq.is_read ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                      {inq.message}
                    </p>
                  </td>
                  <td className="py-6 font-medium text-slate-500 text-sm">
                    {new Date(inq.created_at).toLocaleString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => markAsRead(inq.id, inq.is_read)} 
                        title={inq.is_read ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                        className={`p-2 rounded-xl transition-colors ${inq.is_read ? 'text-slate-400 hover:bg-slate-100 hover:text-indigo-600' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'}`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(inq.id)} 
                        className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquareWarning className="w-12 h-12 text-slate-300 mb-4" />
                      <p className="font-medium text-lg">Belum ada pesan masuk.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
