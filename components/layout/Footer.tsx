'use client'

import Link from 'next/link'
import { ArrowRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-muted/30 pt-24 pb-12 border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Main Massive Logo */}
          <div className="lg:col-span-7">
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-foreground mb-4"
            >
              TFS.
            </motion.h2>
          </div>

          {/* Contact / Newsletter / Links */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
            <div className="flex flex-col space-y-4 text-sm font-medium text-muted-foreground">
              <p className="text-foreground font-bold mb-2 uppercase tracking-wider text-xs">Contact</p>
              <a href="mailto:support@thefitnessstore.com" className="hover:text-primary transition-colors">Email / support@thefitnessstore.com</a>
              <a href="tel:+919876543210" className="hover:text-primary transition-colors">Phone / +91 98765 43210</a>
              <p>Head Quarter / 39, New Delhi, India</p>
            </div>

            <div className="flex flex-col space-y-4">
               <p className="text-foreground font-bold mb-2 uppercase tracking-wider text-xs">Newsletter</p>
               <p className="text-sm font-medium text-muted-foreground">Sign up to receive 10% off and get the latest news and exclusive content.</p>
               <div className="relative mt-2">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="w-full bg-background border border-border rounded-full px-6 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
                 />
                 <button className="absolute right-2 top-2 bottom-2 bg-foreground text-background px-6 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
                   Subscribe
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <ul className="flex items-center gap-4 text-sm font-bold text-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home <ArrowRight className="w-3 h-3" /></Link></li>
            <li><Link href="/shop" className="hover:text-primary transition-colors flex items-center gap-1">Services <ArrowRight className="w-3 h-3" /></Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">About <ArrowRight className="w-3 h-3" /></Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors flex items-center gap-1">FAQ <ArrowRight className="w-3 h-3" /></Link></li>
          </ul>

          <div className="flex items-center gap-4 text-foreground">
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover:scale-105"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
