'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  LayoutDashboard, 
  BedDouble, 
  Tags, 
  CreditCard, 
  Gift, 
  MessageSquare, 
  Mail, 
  Settings, 
  LogOut,
  User
} from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dasbor', icon: LayoutDashboard },
    { id: 'rooms', label: 'Tipe Kamar', icon: BedDouble },
    { id: 'prices', label: 'Harga', icon: CreditCard },
    { id: 'promos', label: 'Promo', icon: Gift },
    { id: 'faqs', label: 'FAQ', icon: MessageSquare },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ]

  return (
    <aside className="h-full w-full bg-white md:bg-slate-50/80 backdrop-blur-md border-r border-slate-200 flex flex-col p-6 gap-2">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tighter">Admin KosKu</h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Property Manager</p>
      </div>

      <nav className="flex flex-col gap-2 overflow-y-auto flex-1 pb-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left font-semibold text-sm ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-100 hover:translate-x-1'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-200 space-y-2">
        <div className="flex items-center gap-3 px-4 py-4 bg-white/40 rounded-2xl border border-white/50 mb-4">
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center bg-indigo-100 text-indigo-600 overflow-hidden">
             <User className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Administrator</p>
            <p className="text-xs text-slate-500 truncate">Manager Kos</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-semibold text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  )
}
