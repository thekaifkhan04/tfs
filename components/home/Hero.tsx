'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react'

export function Hero() {
  return (
    <section className="w-full px-4 md:px-8 py-4">
      <div className="relative w-full rounded-3xl md:rounded-3xl overflow-hidden bg-primary min-h-[70vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ref_hero.jpg"
            alt="Premium Fitness Gym"
            fill
            className="object-cover object-right opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Destination<br/>
              For Premium<br/>
              Fitness Gear
            </h1>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/shop" 
                className="bg-transparent border border-white text-white font-bold rounded-full px-8 py-3.5 hover:bg-white hover:text-primary transition-colors uppercase tracking-wide text-sm"
              >
                Shop Now
              </Link>
              <Link 
                href="/shop"
                className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right side floating text / details */}
        <div className="absolute bottom-12 right-12 z-10 max-w-xs text-right hidden md:block">
          <p className="text-sm text-white/90 font-medium leading-relaxed">
            The premier destination for world-class fitness equipment and supplements. From weights to apparel, we provide the best in performance and quality for athletes of all levels.
          </p>
        </div>

        {/* Social Icons floating on the right edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:scale-105 transition-transform">
            <Twitter className="w-4 h-4 fill-current" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
