'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Building2, CheckCircle2, Users, MessageSquareWarning } from 'lucide-react'

export default function DashboardTab({ setActiveTab }) {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()
      
      const { data: roomTypes } = await supabase.from('room_types').select('total_count, available_count')

      if (roomTypes) {
        const total = roomTypes.reduce((acc, curr) => acc + (curr.total_count || 0), 0)
        const available = roomTypes.reduce((acc, curr) => acc + (curr.available_count || 0), 0)
        
        setStats({
          total: total,
          available: available,
          occupied: total - available
        })
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Selamat datang, Admin</h1>
          <p className="text-slate-500 mt-2 text-lg">Berikut ringkasan status properti Anda hari ini.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Rooms */}
        <div className="glass-card p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Unit</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900">{stats.total}</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">Kamar terdaftar</p>
        </div>

        {/* Available Rooms */}
        <div className="glass-card p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest">Tersedia</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900">{stats.available}</h3>
          <div className="mt-2">
            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Siap Huni</span>
          </div>
        </div>

        {/* Occupied */}
        <div className="glass-card p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-indigo-600/60 uppercase tracking-widest">Terisi</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900">{stats.occupied}</h3>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${stats.total > 0 ? (stats.occupied / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </section>

    </div>
  )
}
