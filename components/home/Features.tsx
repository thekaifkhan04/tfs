'use client'

import { useRef } from 'react'
import { ShieldCheck, Zap, Truck, RotateCcw } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function Features() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    gsap.from(".feature-item", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
  }, { scope: container })

  const features = [
    { icon: ShieldCheck, title: "Genuine Gear", desc: "100% authentic products sourced directly from brands." },
    { icon: Zap, title: "Performance First", desc: "Curated selection for the highest tier of athletes." },
    { icon: Truck, title: "Fast Delivery", desc: "Express shipping right to your doorstep." },
    { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy on apparel." },
  ]

  return (
    <section ref={container} className="py-10 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-item flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <feat.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 uppercase tracking-wider">{feat.title}</h3>
              <p className="text-muted-foreground font-medium">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
