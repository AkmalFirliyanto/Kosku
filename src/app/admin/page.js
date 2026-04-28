'use client'

import { useState } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import DashboardTab from '@/components/admin/DashboardTab'
import RoomsTab from '@/components/admin/RoomsTab'
import PricesTab from '@/components/admin/PricesTab'
import PromosTab from '@/components/admin/PromosTab'
import FAQsTab from '@/components/admin/FAQsTab'
import SettingsTab from '@/components/admin/SettingsTab'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

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
    <div className="flex h-screen overflow-hidden bg-slate-50 font-body text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 overflow-y-auto">
        <div className="p-8 max-w-[1440px] mx-auto min-h-full flex flex-col">
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
