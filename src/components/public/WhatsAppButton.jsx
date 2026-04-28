'use client'

import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function WhatsAppButton() {
  const [waNumber, setWaNumber] = useState('')

  useEffect(() => {
    const fetchWa = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('kos_info').select('wa_number').limit(1).single()
      if (data?.wa_number) setWaNumber(data.wa_number)
    }
    fetchWa()
  }, [])

  if (!waNumber) return null

  return (
    <a
      href={`https://wa.me/${waNumber}?text=Halo%20admin%20KosKu%2C%20saya%20ingin%20bertanya%20tentang%20kamar%20kos.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
        {/* Button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-all duration-300">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-dark-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat via WhatsApp
      </div>
    </a>
  )
}
