import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata = {
  title: 'KosKu — Kos Nyaman & Strategis di Pekanbaru',
  description: 'Temukan kamar kos terbaik di Pekanbaru. Fasilitas lengkap, harga terjangkau, lokasi strategis. Cek ketersediaan kamar secara realtime!',
  keywords: ['kos', 'kost', 'pekanbaru', 'sewa kamar', 'kamar kos', 'kosku'],
  openGraph: {
    title: 'KosKu — Kos Nyaman & Strategis di Pekanbaru',
    description: 'Temukan kamar kos terbaik di Pekanbaru dengan fasilitas lengkap dan harga terjangkau.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`min-h-screen font-body text-on-surface bg-surface ${manrope.variable}`}>
        {children}
      </body>
    </html>
  )
}
