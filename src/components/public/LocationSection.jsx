'use client'

import { MapPin, Phone, AlertCircle } from 'lucide-react'

export default function LocationSection({ kosInfo }) {
  if (!kosInfo) return null

  // Ekstrak URL src dari iframe string jika ada
  let mapsUrl = kosInfo.maps_url
  if (mapsUrl && mapsUrl.includes('<iframe')) {
    const match = mapsUrl.match(/src="([^"]+)"/)
    if (match) mapsUrl = match[1]
  }

  return (
    <section id="location" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Lokasi Kami</h2>
          <p className="text-lg text-slate-500">Berlokasi strategis untuk kemudahan mobilitas Anda.</p>
        </div>

        <div className="glass-card rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row border border-white">
          {/* Map Area */}
          <div className="lg:w-3/5 h-[400px] lg:h-auto relative bg-slate-200">
            {mapsUrl ? (
              <iframe 
                src={mapsUrl} 
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">Peta belum diatur</div>
            )}
          </div>

          {/* Info Area */}
          <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center bg-white/80">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">{kosInfo.name}</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Alamat Lengkap</p>
                  <p className="text-slate-700 font-medium leading-relaxed">{kosInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Hubungi Kami</p>
                  <a href={`https://wa.me/${kosInfo.wa_number?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-slate-700 font-bold hover:text-indigo-600 transition-colors">
                    +{kosInfo.wa_number}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Peraturan Kos</p>
                  <div className="text-slate-600 text-sm whitespace-pre-wrap">{kosInfo.rules}</div>
                </div>
              </div>
            </div>

            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(kosInfo.address)}`} 
              target="_blank" 
              rel="noreferrer"
              className="mt-12 bg-slate-900 text-white w-full py-4 rounded-2xl font-bold text-center hover:bg-indigo-600 hover:shadow-lg transition-all active:scale-95"
            >
              Dapatkan Arah
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
