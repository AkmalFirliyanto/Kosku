'use client'

import { Wifi, Shield, Users, Sparkles, Coffee, Shirt } from 'lucide-react'

const facilities = [
  { icon: Wifi, title: "WiFi Kecepatan Tinggi", desc: "Koneksi internet ngebut untuk kerja & streaming", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Shield, title: "Keamanan Pintar", desc: "Akses kartu pintar dan CCTV 24/7", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Users, title: "Ruang Kerja Bersama", desc: "Area nyaman untuk produktivitas maksimal", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: Sparkles, title: "Pembersihan Mingguan", desc: "Layanan bersih-bersih kamar terjadwal", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Coffee, title: "Dapur Modern", desc: "Dapur bersama lengkap dengan peralatan", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Shirt, title: "Layanan Laundry", desc: "Layanan cuci setrika berbayar di tempat", color: "text-rose-500", bg: "bg-rose-50" }
]

export default function FacilitiesSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Fasilitas Premium</h2>
          <p className="text-lg text-slate-500">Semua yang Anda butuhkan untuk hidup nyaman dan fokus pada hal yang penting.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon
            return (
              <div key={idx} className="glass-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${fac.bg} ${fac.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{fac.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{fac.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
