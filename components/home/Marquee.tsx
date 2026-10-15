'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function Marquee() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    gsap.to(".marquee-content", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    })
  }, { scope: container })

  return (
    <section ref={container} className="py-12 border-t border-b border-border bg-background overflow-hidden relative">
      <div className="flex whitespace-nowrap marquee-content">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground/10 shrink-0">
            <span className="mx-8">Performance Perfected</span>
            <span className="mx-8 text-primary/40">·</span>
            <span className="mx-8">Push Your Limits</span>
            <span className="mx-8 text-primary/40">·</span>
            <span className="mx-8">Unstoppable</span>
            <span className="mx-8 text-primary/40">·</span>
          </div>
        ))}
      </div>
    </section>
  )
}
