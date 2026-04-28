'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar({ kosInfo }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-slate-900 tracking-tighter">
          {kosInfo?.name || "KosKu"}
        </Link>
        
        <div className="hidden md:flex gap-8 items-center bg-white/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/60 shadow-sm">
          <Link href="#rooms" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Kamar</Link>
          <Link href="#pricing" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Harga</Link>
          <Link href="#location" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Lokasi</Link>
        </div>
      </div>
    </nav>
  )
}
