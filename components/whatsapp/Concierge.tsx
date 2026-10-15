'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, X, MessageCircle, FileQuestion } from 'lucide-react'
import Link from 'next/link'

export function Concierge() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 bg-tfs-panel border border-white/10 hover:border-white/30 rounded-full shadow-lg transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HelpCircle className="w-5 h-5 text-white" />
      </motion.button>

      {/* Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-6 right-6 w-[340px] bg-tfs-panel border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-tfs-dark to-tfs-panel p-4 border-b border-white/5 relative">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-tfs-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-xl text-white mb-2">Fitness Concierge</h3>
                <p className="text-sm text-tfs-muted leading-relaxed">
                  Tell us your goal and we will suggest the right stack, gear, and offers.
                </p>
              </div>
              
              <div className="p-4 flex flex-col gap-3">
                <a 
                  href="https://wa.me/919876543210?text=Hi, I need help selecting the right fitness gear/supplements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 rounded-lg bg-tfs-dark border border-white/5 hover:border-tfs-green hover:bg-tfs-green/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-tfs-green" />
                    <span className="font-semibold text-sm text-white group-hover:text-tfs-green transition-colors">Quick Inquiry</span>
                  </div>
                </a>

                <Link 
                  href="/faq"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between w-full p-4 rounded-lg bg-tfs-dark border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FileQuestion className="w-5 h-5 text-tfs-muted group-hover:text-white" />
                    <span className="font-semibold text-sm text-tfs-muted group-hover:text-white transition-colors">View FAQ</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
