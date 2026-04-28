'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/admin/Sidebar'
import DashboardTab from '@/components/admin/DashboardTab'
import RoomsTab from '@/components/admin/RoomsTab'
import PricesTab from '@/components/admin/PricesTab'
import PromosTab from '@/components/admin/PromosTab'
import FAQsTab from '@/components/admin/FAQsTab'
import SettingsTab from '@/components/admin/SettingsTab'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab setActiveTab={setActiveTab} />
      case 'rooms': return <RoomsTab />
      case 'prices': return <PricesTab />
      case 'promos': return <PromosTab />
      case 'faqs': return <FAQsTab />
      case 'settings': return <SettingsTab />
      default: return <DashboardTab />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-body text-slate-900 relative">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar wrapper */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} />
      </div>
      
      <main className="flex-1 md:ml-64 overflow-y-auto w-full">
        {/* Mobile Header with Hamburger */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
          <h1 className="font-bold text-slate-900">Admin KosKu</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 md:p-8 max-w-[1440px] mx-auto min-h-full flex flex-col">
          {renderTab()}
          
          <footer className="mt-auto pt-12 pb-8 border-t border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-lg font-bold text-slate-900">KosKu</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">© {new Date().getFullYear()} KosKu. Manajemen Kos Modern.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
