'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PLANTS, Plant } from '@/data/plants';
import PlantCard from '@/components/plants/PlantCard';
import QuickViewModal from '@/components/plants/QuickViewModal';

export default function PopularPlants() {
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);

  // Popular plants
  const popularPlants = PLANTS.filter((p) => p.popular).slice(0, 6);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-semibold">
              CUSTOMER FAVOURITES
            </span>
            <h2 className="font-lora text-3xl sm:text-4xl font-medium text-ink mt-1">
              Loved by our customers
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover group"
          >
            <span>View all plants</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onQuickView={(p) => setQuickViewPlant(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        plant={quickViewPlant}
        onClose={() => setQuickViewPlant(null)}
      />
    </section>
  );
}

