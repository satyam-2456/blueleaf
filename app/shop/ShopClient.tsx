'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { PLANTS, CATEGORIES, Plant, PlantCategory } from '@/data/plants';
import PlantCard from '@/components/plants/PlantCard';
import QuickViewModal from '@/components/plants/QuickViewModal';

const ALL_CATEGORIES = ['All Plants', ...CATEGORIES] as const;

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory && CATEGORIES.includes(initialCategory as PlantCategory)
      ? initialCategory
      : 'All Plants'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);

  // Sync category if URL param changes
  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory as PlantCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filtered plants
  const filteredPlants = useMemo(() => {
    return PLANTS.filter((plant) => {
      const matchesCategory =
        activeCategory === 'All Plants' || plant.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        plant.name.toLowerCase().includes(q) ||
        plant.latin.toLowerCase().includes(q) ||
        plant.description.toLowerCase().includes(q) ||
        plant.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold tracking-widest text-muted uppercase font-sans">
            THE BLUE LEAF CATALOG
          </span>
          <h1 className="font-lora text-4xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
            Shop Plants
          </h1>
          <p className="text-muted text-base sm:text-lg mt-3 leading-relaxed">
            Fresh air, food, fragrance or just quiet beauty — pick a category and add to cart. Pay cash or UPI when it arrives.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-6 mb-10">
          {/* Category Pills Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {ALL_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'text-white'
                      : 'bg-white hover:bg-mint/50 text-ink/80 border border-primary/15'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeShopCategory"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-primary rounded-full shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Item Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants by name, variety or room..."
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-white border border-primary/15 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-soft transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs uppercase tracking-wider font-semibold text-muted flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
              <span>
                {filteredPlants.length}{' '}
                {filteredPlants.length === 1 ? 'PLANT' : 'PLANTS'}
              </span>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPlants.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onQuickView={(p) => setQuickViewPlant(p)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center max-w-md mx-auto bg-white rounded-3xl p-8 border border-primary/15 shadow-soft"
            >
              <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-lora text-xl font-medium text-ink">No plants found</h3>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                We couldn&apos;t find any plants matching &ldquo;{searchQuery}&rdquo;. Try another term or clear the filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Plants');
                }}
                className="mt-4 px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-sm transition-all"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        plant={quickViewPlant}
        onClose={() => setQuickViewPlant(null)}
      />
    </div>
  );
}

