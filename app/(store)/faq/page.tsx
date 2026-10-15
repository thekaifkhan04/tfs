'use client'

import { useState } from "react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { Plus, Minus } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    { q: "Do you offer international shipping?", a: "Yes, we provide international shipping for most of our products. Shipping costs and delivery times vary based on the destination." },
    { q: "Can I return or exchange an item?", a: "Absolutely. We offer a hassle-free 30-day return and exchange policy on all unused apparel and gear in original packaging." },
    { q: "Do you offer personalized golf equipment?", a: "While we specialize in fitness, we do offer personalized branding on specific bulk gym equipment orders." },
    { q: "Are there any membership benefits for frequent shoppers?", a: "Yes! Our TFS Club and Memberships offer massive discounts, early access to drops, and free shipping." },
  ]

  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="bg-background min-h-screen pb-32">
      <section className="bg-muted py-12 px-4 md:px-12 rounded-b-[3rem] mb-24 text-center">
        <ScrollReveal>
          <h1 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-6">
            FAQ
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl mx-auto leading-relaxed">
            Frequently Asked Questions
          </p>
        </ScrollReveal>
      </section>

      <section className="container mx-auto px-4 md:px-12 max-w-3xl">
        <ScrollReveal className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-3xl overflow-hidden transition-colors ${openIdx === idx ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-muted-foreground/30'}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-8 text-left focus:outline-none"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                {openIdx === idx ? (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Minus className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4" />
                  </div>
                )}
              </button>
              
              <div 
                className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-40 pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>
    </div>
  )
}
