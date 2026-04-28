'use client'

import { Tag } from 'lucide-react'

export default function PromoSection({ promos }) {
  if (!promos || promos.length === 0) return null

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-white md:w-2/3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Tag className="w-4 h-4" />
              Penawaran Spesial
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{promos[0].title}</h2>
            <p className="text-indigo-100 text-lg max-w-lg mb-6 leading-relaxed">
              {promos[0].description} Dapatkan sebelum masa berlaku habis!
            </p>
            <div className="flex items-center gap-4 text-sm font-bold bg-white/10 backdrop-blur-md w-fit px-6 py-3 rounded-2xl border border-white/20">
              <span className="text-4xl font-black">{promos[0].discount_pct}%</span>
              <div className="flex flex-col">
                <span className="text-indigo-200 uppercase tracking-widest text-[10px]">DISKON</span>
                <span>Berlaku sampai {new Date(promos[0].valid_until).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 md:w-1/3 flex justify-end w-full">
            <a href="#location" className="bg-white text-indigo-600 px-8 py-5 rounded-2xl font-bold hover:shadow-xl transition-all active:scale-95 w-full md:w-auto text-center text-lg shadow-lg">
              Klaim Promo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
