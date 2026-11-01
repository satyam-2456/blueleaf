'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function GreenSetupBanner() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden min-h-[360px] sm:min-h-[420px] flex items-center shadow-lift">
          {/* Background Image with parallax feeling */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/setup-banner.jpg"
              alt="Lush green garden setup by Blue Leaf gardeners"
              fill
              className="object-cover scale-105"
              sizes="100vw"
            />
            {/* Deep Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-footer/95 via-footer/80 to-footer/60" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl p-8 sm:p-14 text-white space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Service Green Installations</span>
            </div>

            <h2 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Let our gardeners set it up for you.
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
              Our staff visits your home, office or garden — picks the right plants, pots them with nutritious soil and leaves everything thriving.
            </p>

            <div className="pt-2">
              <Link
                href="/green-setup"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-mint text-ink text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span>Book a setup visit</span>
                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

