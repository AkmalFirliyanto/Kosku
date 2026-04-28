'use client'

import { ShieldCheck, Users } from 'lucide-react'

export default function HeroSection({ kosInfo, roomTypes }) {
  const residentCount = roomTypes?.reduce((acc, room) => acc + (room.total_count - room.available_count), 0) || 0;

  return (
    <section className="relative min-h-screen pt-32 pb-24 lg:py-0 lg:min-h-[819px] flex items-center overflow-x-hidden">
      <div className="absolute inset-0 hero-pattern"></div>
      <div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center mt-12 lg:mt-0">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Pengalaman Kos Premium
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]">
            Hunian Modern,<br/>
            <span className="text-indigo-600">Manajemen Mudah.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
            {kosInfo?.description || "Temukan hunian yang dirancang untuk fokus dan kenyamanan. KosKu memadukan fasilitas premium dengan manajemen yang mudah bagi penghuni urban modern."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#rooms" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
              Lihat Kamar
            </a>
            <a href="#pricing" className="px-8 py-4 rounded-2xl font-bold border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all">
              Cek Harga
            </a>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-3">
            <img 
              className="w-full h-full object-cover" 
              alt="minimalist interior" 
              src={kosInfo?.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCPDvH6dhUxt3G4z3agMGmUOCRpJyo7Fvh7pn0cOlEw1ZqkvyPQZWIxt_d3So9sAv414hXf7b6Ea7gO7Q3vZEqLTLJg9jwWMXC9S-dNmBsAl53ptVkPJawx4CkVYXxJLf439zPCQxv7IV4tWJ_cQvtEBbxGo1QqSOrB5f1OI-AtG2-GS6T7YYhDw4F5RM0ob7zFdHkJEFQ8cOcOx_9d3RO5IAPhlqyw-vV20HNbWyR4eP4q2oNfrASTvDSGYfUwT9a062x7ZGAQsYA"}
            />
          </div>
          <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-3xl shadow-xl max-w-xs -rotate-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{residentCount > 0 ? residentCount : 0} Penghuni</p>
                <p className="text-xs text-slate-500">Menikmati hunian nyaman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
