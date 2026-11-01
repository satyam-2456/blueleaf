'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Droplets, Plus, Check, Eye } from 'lucide-react';
import { Plant } from '@/data/plants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

interface PlantCardProps {
  plant: Plant;
  onQuickView?: (plant: Plant) => void;
}

export default function PlantCard({ plant, onQuickView }: PlantCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [flyEffect, setFlyEffect] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding) return;

    // Trigger fly-to-cart animation coordinates
    const cartEl = document.getElementById('cart-icon-btn');
    if (buttonRef.current && cartEl) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const cartRect = cartEl.getBoundingClientRect();

      const deltaX = cartRect.left - btnRect.left;
      const deltaY = cartRect.top - btnRect.top;

      setFlyEffect({ x: deltaX, y: deltaY });
    }

    setIsAdding(true);
    addItem(plant, 1);

    setTimeout(() => {
      setFlyEffect(null);
    }, 850);

    setTimeout(() => {
      setIsAdding(false);
    }, 1600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-white rounded-3xl p-3 sm:p-3.5 border border-primary/10 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-mint-light">
        {/* Skeleton Shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-shimmer z-0" />
        )}

        <Image
          src={plant.image}
          alt={plant.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-ink shadow-sm">
            {plant.category}
          </span>

          {plant.popular && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-popular text-popular-text shadow-sm">
              Popular
            </span>
          )}
        </div>

        {/* Quick View Eye Button */}
        <button
          type="button"
          onClick={() => onQuickView?.(plant)}
          className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-ink shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Quick view ${plant.name}`}
        >
          <Eye className="w-4 h-4 text-ink" />
        </button>
      </div>

      {/* Content Container */}
      <div className="pt-3.5 pb-1 px-1 flex-grow flex flex-col justify-between">
        <div>
          {/* Plant Names */}
          <h3 className="font-lora text-lg sm:text-xl font-medium text-ink group-hover:text-primary transition-colors line-clamp-1">
            {plant.name}
          </h3>
          <p className="italic text-xs text-muted font-normal mt-0.5 line-clamp-1">
            {plant.latin}
          </p>

          {/* Care Specs */}
          <div className="mt-3 space-y-1.5 text-[11px] text-muted">
            <div className="flex items-center gap-1.5 line-clamp-1">
              <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{plant.light}</span>
            </div>
            <div className="flex items-center gap-1.5 line-clamp-1">
              <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">{plant.water}</span>
            </div>
          </div>
        </div>

        {/* Price & Add Button */}
        <div className="mt-4 pt-3 border-t border-primary/10 flex items-center justify-between relative">
          <div className="font-lora text-xl font-bold text-ink">
            {formatPrice(plant.price)}
          </div>

          {/* Add to Cart button with morphing animation */}
          <button
            ref={buttonRef}
            type="button"
            onClick={handleAdd}
            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isAdding
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-primary hover:bg-primary-hover text-white hover:scale-105 active:scale-95'
            }`}
            aria-label={`Add ${plant.name} to cart`}
          >
            <motion.div
              key={isAdding ? 'check' : 'plus'}
              initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              {isAdding ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </motion.div>
          </button>

          {/* Flying particle to cart */}
          <AnimatePresence>
            {flyEffect && (
              <motion.div
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 0.9, 0],
                  scale: [1, 1.2, 0.4],
                  x: flyEffect.x,
                  y: flyEffect.y,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="fixed z-50 pointer-events-none w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shadow-lg text-[10px]"
              >
                🌱
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

