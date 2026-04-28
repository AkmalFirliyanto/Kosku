'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MoveLeft, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react'

function RoomCard({ room }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const type = room.name
  const availableCount = room.available_count || 0
  const images = room.image_urls && room.image_urls.length > 0 ? room.image_urls : [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0QNJCR3DW6dZMYKrZHi3wNQ1l303UQstWlTPNDrUJw-YAPGkwVZuOKbSYXa3QsngYGmVLHCw7TjBJk0tYEPejGEhcaPnR_chdk9Aj1eMYugltX1RM3c9S63E59JbgBH1G1COLgUVks6RghaflhSua1e5wjq4TPBC1u26WSP_GnNpDu9oT5CjX-hPFWLhNp4IFlrUmUkzW020btBWTYbWQ9k3Hkd5iqUKf6sk3O40Fur0pPBkJOdo_WrRhkpnrDuvfJGBSyheYOzQ"
  ]

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="glass-card rounded-[2rem] overflow-hidden group hover:translate-y-[-4px] transition-all duration-300 flex flex-col relative">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt={`Foto ${type}`} 
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          {availableCount > 0 ? (
            <span className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span> 
              Sisa {availableCount} Kamar
            </span>
          ) : (
            <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Penuh
            </span>
          )}
        </div>

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-slate-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-slate-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-slate-900">{type}</h3>
          <span className="text-indigo-600 font-bold text-xl">{room.size_m2}m</span>
        </div>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">
          {room.description}
        </p>
        
        {availableCount > 0 ? (
          <a href="#pricing" className="block text-center w-full py-4 rounded-2xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all">
            Lihat Harga
          </a>
        ) : (
          <button disabled className="w-full py-4 rounded-2xl border border-slate-200 text-slate-400 font-bold cursor-not-allowed">
            Masuk Daftar Tunggu
          </button>
        )}
      </div>
    </div>
  )
}

export default function RoomStatusSection({ roomTypes }) {
  const [rooms, setRooms] = useState(roomTypes || [])

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('room_types_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_types' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setRooms((prev) =>
              prev.map((room) =>
                room.id === payload.new.id ? { ...room, ...payload.new } : room
              )
            )
          } else if (payload.eventType === 'INSERT') {
            setRooms((prev) => [...prev, payload.new])
          } else if (payload.eventType === 'DELETE') {
            setRooms((prev) => prev.filter((room) => room.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <section id="rooms" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Ketersediaan Kamar</h2>
            <p className="text-slate-500 mt-2">Pilih tipe kamar yang sesuai dengan gaya hidup Anda.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
          {rooms.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 font-medium">
              Belum ada data kamar.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
