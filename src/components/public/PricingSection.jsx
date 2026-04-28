'use client'

import { Check } from 'lucide-react'

export default function PricingSection({ prices, kosInfo, roomTypes }) {
  if (!prices || prices.length === 0) return null;

  const formatPrice = (amount) => {
    if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(1)} jt`;
    if (amount >= 1000) return `Rp ${(amount / 1000).toFixed(0)} rb`;
    return `Rp ${amount}`;
  }

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Harga Transparan</h2>
          <p className="text-lg text-slate-500">Tanpa biaya tersembunyi. Pilih paket yang sesuai untuk Anda.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {prices.map((price, idx) => {
            const isPopular = idx === 1; // Highlight the middle plan usually
            const matchedRoom = roomTypes?.find(r => r.name.toLowerCase() === price.room_type.toLowerCase());
            const isAvailable = matchedRoom ? matchedRoom.available_count > 0 : true; // Default true if room type doesn't exist in room_types table
            
            return (
              <div 
                key={price.id} 
                className={`relative rounded-[2.5rem] p-8 transition-all duration-300 ${
                  isPopular 
                    ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 py-12 border border-slate-800' 
                    : 'glass-card border-slate-200 hover:shadow-xl'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    Paling Populer
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-slate-900'}`}>{price.room_type}</h3>
                
                <div className="mb-8 flex items-end gap-1">
                  <span className={`text-5xl font-black tracking-tight ${isPopular ? 'text-white' : 'text-slate-900'}`}>
                    {formatPrice(price.monthly).replace('Rp ', '')}
                  </span>
                  <span className={`text-sm mb-1 ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>/bln</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 ${isPopular ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={isPopular ? 'text-slate-300' : 'text-slate-600'}>Harian: {formatPrice(price.daily)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 ${isPopular ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={isPopular ? 'text-slate-300' : 'text-slate-600'}>Tahunan: {formatPrice(price.yearly)}</span>
                  </div>
                </div>
                
                {isAvailable ? (
                  <a 
                    href={`https://wa.me/${kosInfo?.wa_number?.replace(/\D/g, '')}?text=Halo,%20saya%20tertarik%20dengan%20paket%20${price.room_type}`}
                    target="_blank" rel="noreferrer"
                    className={`block text-center w-full py-4 rounded-2xl font-bold transition-all ${
                    isPopular 
                      ? 'bg-indigo-500 text-white hover:bg-indigo-400' 
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}>
                    Booking
                  </a>
                ) : (
                  <button disabled className={`w-full py-4 rounded-2xl font-bold cursor-not-allowed ${
                    isPopular
                      ? 'bg-slate-700 text-slate-400 border border-slate-600'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    Kamar Penuh
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
