'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useRef, useState } from 'react'
import gsap from 'gsap'

export function Header() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Club', href: '/club' },
    { name: 'Shop', href: '/shop' },
    { name: 'Membership', href: '/membership' },
  ]

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>) => {
    if (!targetRef.current) return
    const { left, top, width, height } = targetRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * 0.3
    const y = (e.clientY - top - height / 2) * 0.3
    gsap.to(targetRef.current, { x, y, duration: 0.5, ease: "power3.out" })
  }

  const handleMouseLeave = (targetRef: React.RefObject<HTMLDivElement>) => {
    if (!targetRef.current) return
    gsap.to(targetRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" })
  }

  return (
    <>
      <header className="w-full bg-background pt-4 px-4 md:px-8 z-50 sticky top-0">
        <div className="container mx-auto h-16 flex items-center justify-between">
          
          {/* LEFT - Logo */}
          <Link href="/" className="flex items-center shrink-0 relative z-[60]">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-3xl font-black tracking-tighter transition-colors ${isMenuOpen ? 'text-primary-foreground' : 'text-foreground'}`}
            >
              TFS.
            </motion.div>
          </Link>

          {/* CENTER - Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 px-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="relative text-[13px] font-bold uppercase tracking-wider transition-colors py-4"
                  onMouseEnter={() => setIsHovered(link.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className={isActive ? "text-primary" : "text-foreground hover:text-primary transition-colors"}>
                    {link.name}
                  </span>
                  <AnimatePresence>
                    {(isActive || isHovered === link.name) && (
                      <motion.div
                        layoutId="header-active-underline"
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </nav>

          {/* RIGHT - Actions */}
          <div className="flex items-center gap-4 shrink-0 relative z-[60]">
            <ThemeToggle />
            
            <MagneticButton>
              <Link href="/cart" className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${isMenuOpen ? 'border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10' : 'border-border text-foreground hover:bg-muted'}`}>
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold">Cart(0)</span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition-all ${isMenuOpen ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}`}
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <span className={`absolute h-[2px] w-full bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                  <span className={`absolute h-[2px] w-full bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute h-[2px] w-full bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
                </div>
              </button>
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)', transition: { delay: 0.3, duration: 0.5 } }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-primary flex flex-col justify-center px-6 md:px-20"
          >
            <nav className="flex flex-col gap-4 md:gap-8">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.5, delay: isMenuOpen ? 0.3 + (idx * 0.1) : 0, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <StaggerLink href={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.name}
                    </StaggerLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-6 md:left-20 flex gap-4 text-primary-foreground font-bold uppercase tracking-widest text-sm"
            >
              <a href="#" className="hover:text-background transition-colors">Instagram</a>
              <a href="#" className="hover:text-background transition-colors">Twitter</a>
              <a href="#" className="hover:text-background transition-colors">Facebook</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const x = (e.clientX - left - width / 2) * 0.3
        const y = (e.clientY - top - height / 2) * 0.3
        gsap.to(ref.current, { x, y, duration: 0.5, ease: "power3.out" })
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" })
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  )
}

function StaggerLink({ href, onClick, children }: { href: string, onClick: () => void, children: string }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="relative flex overflow-hidden text-3xl md:text-3xl font-black uppercase tracking-tighter text-primary-foreground group"
    >
      <div className="flex">
        {children.split('').map((char, i) => (
          <motion.span
            key={`visible-${i}`}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 0.03}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex text-background">
        {children.split('').map((char, i) => (
          <motion.span
            key={`hidden-${i}`}
            className="inline-block translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 0.03}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </Link>
  )
}
