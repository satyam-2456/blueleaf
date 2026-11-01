'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Phone, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';

const headlineWords = ['Bring', 'home', 'a', 'greener', 'corner.'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24">
      {/* Decorative SVG Leaves Drifting and Swaying */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -4, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-12 left-4 md:left-16 text-primary/15"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 22, 0],
            rotate: [0, -10, 6, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          className="absolute bottom-20 right-8 md:right-28 text-primary/10"
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.4 19,16.5 17.3,18C15.9,16.8 14.1,16 12,16C9.9,16 8.1,16.8 6.7,18C5,16.5 4,14.4 4,12A8,8 0 0,1 12,4Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint text-primary text-xs font-semibold border border-primary/15 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.domain} — nursery &amp; green setup experts</span>
            </motion.div>

            {/* Word by word headline reveal */}
            <h1 className="font-lora text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.12]">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + idx * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block mr-2.5 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
            >
              Hand-picked plants for homes, offices and gardens — delivered, potted and set up by our own team. Cash or UPI on delivery.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/shop"
                className="group relative px-6 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lift transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Shop Plants</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/green-setup"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-mint/40 text-ink text-sm font-semibold border border-primary/20 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Book Green Setup
              </Link>
            </motion.div>

            {/* Helpline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="pt-2"
            >
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs font-medium text-ink border border-primary/15 shadow-soft transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>Helpline: {SITE_CONFIG.phone}</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Floating Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame */}
              <div className="relative aspect-[4/3.8] rounded-[32px] overflow-hidden shadow-lift border border-primary/10 bg-mint/30">
                <Image
                  src="/images/hero-shelf.jpg"
                  alt="Indoor plant shelf with lush green plants"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>

              {/* Floating Glass Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.85,
                }}
                className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs glass-card rounded-2xl p-4 sm:p-5 shadow-glass border border-white/60"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                  <span className="font-lora text-lg font-bold text-ink">
                    500+ spaces greened
                  </span>
                </div>
                <p className="text-xs text-muted leading-tight">
                  Homes · Offices · Gardens, set up by our staff
                </p>
                <div className="mt-2.5 pt-2 border-t border-primary/10 flex items-center gap-1.5 text-[11px] font-medium text-primary">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Doorstep potting &amp; free initial feed</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

