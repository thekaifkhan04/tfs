'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ScrollReveal({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode, 
  delay?: number,
  className?: string 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
