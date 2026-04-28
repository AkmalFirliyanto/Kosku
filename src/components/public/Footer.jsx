import Link from 'next/link'

export default function Footer({ kosInfo }) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 w-full py-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">{kosInfo?.name || "KosKu"}</span>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            © {new Date().getFullYear()} {kosInfo?.name || "KosKu"}. Manajemen Kos Mudah untuk Hunian Modern.
          </p>
        </div>
        

        
      </div>
    </footer>
  )
}
