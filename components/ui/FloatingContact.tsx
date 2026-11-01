'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppLink } from '@/lib/site';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = 'Hi Blue Leaf! I need guidance picking plants for my space.';
  const waUrl = buildWhatsAppLink(defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 bg-white rounded-3xl p-4 shadow-xl border border-primary/15 space-y-3 mb-2"
          >
            <div className="flex items-center justify-between pb-2 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-ink">Plant Care Coordinator</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-ink p-1 rounded-full hover:bg-mint/40"
                aria-label="Close contact options"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Have questions about light, watering, or need help choosing? Chat or call us directly!
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-full bg-mint hover:bg-mint-dark text-primary text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>
            </div>

            <div className="text-[10px] text-center text-muted/80">
              Available {SITE_CONFIG.hours}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button with gentle pulse */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-lg transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        aria-label="Contact Blue Leaf on WhatsApp or Phone"
      >
        <span className="absolute -inset-1 rounded-full bg-primary/25 animate-ping opacity-60 pointer-events-none" />
        <MessageCircle className="w-6 h-6 fill-white/20 transition-transform duration-300 group-hover:scale-110" />
      </motion.button>
    </div>
  );
}

