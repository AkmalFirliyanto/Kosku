'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message === 'Invalid login credentials' ? 'Email atau password salah' : authError.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="bg-[#f8fafc] font-body min-h-screen flex flex-col text-slate-900">
      {/* Hero Background Texture (Subtle) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-400/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Branding Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tighter mb-2">KosKu</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manajemen Mudah & Cerdas</p>
          </div>

          {/* Login Card */}
          <div className="glass-card shadow-md rounded-3xl p-10 md:p-12 bg-white/70">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold mb-2">Portal Admin</h2>
              <p className="text-sm text-slate-500">Akses dashboard manajemen properti Anda</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1" htmlFor="email">
                  Alamat Email
                </label>
                <div className="relative group">
                  <input 
                    className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 text-base focus:ring-2 focus:ring-indigo-600/50 transition-all outline-none" 
                    id="email" 
                    name="email" 
                    placeholder="admin@kosku.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider" htmlFor="password">
                    Kata Sandi
                  </label>
                </div>
                <div className="relative group">
                  <input 
                    className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 text-base focus:ring-2 focus:ring-indigo-600/50 transition-all outline-none" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4">
                <button 
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-sm hover:bg-indigo-700 hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-70 flex justify-center items-center" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Masuk'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Back to Public Site */}
          <div className="mt-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke beranda
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Segment */}
      <footer className="w-full py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center">
            © {new Date().getFullYear()} KosKu. Manajemen Kos Modern.
          </p>
        </div>
      </footer>
    </div>
  )
}
