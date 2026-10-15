'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function Showcase() {
  const container = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinType: "transform",
        anticipatePin: 1,
        scrub: 1,
      }
    })

    tl.to(".showcase-image", {
      scale: 1,
      width: "100%",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut"
    }, 0)

    tl.to(".showcase-text", {
      y: -100,
      opacity: 0,
      ease: "power2.inOut"
    }, 0)

    tl.fromTo(".showcase-overlay-text", 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, ease: "power2.out" },
      0.5
    )

  }, { scope: container })

  return (
    <section ref={container} className="relative w-full h-screen bg-background flex items-center justify-center overflow-hidden py-12">
      
      <div className="absolute top-20 text-center showcase-text z-10 w-full px-6">
        <h2 className="text-3xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-4">
          Redefine <span className="text-primary">Power</span>
        </h2>
        <p className="text-muted-foreground font-medium max-w-lg mx-auto">
          The ultimate training experience demands the ultimate gear. Built to last.
        </p>
      </div>

      <div className="showcase-image relative w-[80vw] md:w-[60vw] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden z-0 mt-32 md:mt-20">
        <Image
          src="/images/showcase_bg.jpg"
          alt="Athlete Training"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h2 className="showcase-overlay-text text-3xl md:text-3xl lg:text-[120px] font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          Unleash
        </h2>
      </div>

    </section>
  )
}
