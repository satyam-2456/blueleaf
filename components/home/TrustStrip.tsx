'use client';

import React from 'react';
import { Wallet, MessageSquare, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';

const TRUST_ITEMS = [
  {
    icon: Wallet,
    title: 'Cash or UPI on delivery',
    desc: 'No online payment needed',
  },
  {
    icon: MessageSquare,
    title: 'Free expert guidance',
    desc: 'Chat before you buy',
  },
  {
    icon: PhoneCall,
    title: 'Real helpline, real people',
    desc: SITE_CONFIG.hours,
  },
];

export default function TrustStrip() {
  return (
    <section className="py-12 border-t border-primary/10 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-white hover:shadow-soft"
              >
                <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

