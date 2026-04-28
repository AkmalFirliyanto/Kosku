import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/public/Navbar'
import HeroSection from '@/components/public/HeroSection'
import RoomStatusSection from '@/components/public/RoomStatusSection'
import FacilitiesSection from '@/components/public/FacilitiesSection'
import PricingSection from '@/components/public/PricingSection'
import PromoSection from '@/components/public/PromoSection'
import LocationSection from '@/components/public/LocationSection'
import FAQSection from '@/components/public/FAQSection'
import WhatsAppButton from '@/components/public/WhatsAppButton'
import Footer from '@/components/public/Footer'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch semua data dari Supabase (server-side)
  const [kosRes, roomsRes, pricesRes, promosRes, faqsRes] = await Promise.all([
    supabase.from('kos_info').select('*').limit(1).single(),
    supabase.from('room_types').select('*').order('id'),
    supabase.from('prices').select('*').eq('is_active', true).order('monthly'),
    supabase.from('promos').select('*').eq('is_active', true),
    supabase.from('faqs').select('*').eq('is_active', true).order('sort_order'),
  ])

  const kosInfo = kosRes.data
  const roomTypes = roomsRes.data || []
  const prices = pricesRes.data || []
  const promos = promosRes.data || []
  const faqs = faqsRes.data || []

  return (
    <main className="relative">
      <Navbar kosInfo={kosInfo} />
      <HeroSection kosInfo={kosInfo} roomTypes={roomTypes} />
      <RoomStatusSection roomTypes={roomTypes} />
      <FacilitiesSection />
      <PricingSection prices={prices} promos={promos} kosInfo={kosInfo} roomTypes={roomTypes} />
      <PromoSection promos={promos} />
      <LocationSection kosInfo={kosInfo} />
      <FAQSection faqs={faqs} />
      <Footer kosInfo={kosInfo} />
      <WhatsAppButton />
    </main>
  )
}
