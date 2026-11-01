'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sprout, Wind, Citrus, Flower2, Sparkles, HeartHandshake } from 'lucide-react';
import { CATEGORIES, PlantCategory } from '@/data/plants';

const CATEGORY_ICONS: Record<PlantCategory, any> = {
  'Microgreens': Sprout,
  'Fresh Air': Wind,
  'Fruit Plants': Citrus,
  'Flowering': Flower2,
  'Decorative': Sparkles,
  'Fresh Feel': HeartHandshake,
};

export default function CategoryStrip() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-12 sm:mb-16">
      <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto py-2 px-1 no-scrollbar">
        {CATEGORIES.map((category, idx) => {
          const Icon = CATEGORY_ICONS[category] || Sprout;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="shrink-0"
            >
              <Link
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-mint/60 border border-primary/15 text-xs sm:text-sm font-medium text-ink transition-all duration-200 hover:scale-105 active:scale-95 shadow-soft hover:shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-mint/80 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{category}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

