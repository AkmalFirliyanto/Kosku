'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs || faqs.length === 0) return null

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-12">Pertanyaan Umum</h2>
        
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            
            return (
              <div 
                key={faq.id} 
                className={`glass-card p-6 rounded-3xl border transition-all ${isOpen ? 'border-indigo-200 shadow-md bg-slate-50/50' : 'border-transparent hover:border-indigo-100 shadow-sm'}`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <h4 className="font-bold text-slate-900 pr-4">{faq.question}</h4>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </div>
                
                {isOpen && (
                  <p className="mt-4 text-slate-500 text-sm leading-relaxed animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
