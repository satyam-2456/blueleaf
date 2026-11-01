'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Droplets, Check, Plus, Minus, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Plant } from '@/data/plants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

interface QuickViewModalProps {
  plant: Plant | null;
  onClose: () => void;
}

export default function QuickViewModal({ plant, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!plant) return null;

  const handleAddToCart = () => {
    addItem(plant, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-white rounded-[28px] shadow-2xl overflow-hidden z-10 border border-primary/10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-ink shadow-sm hover:scale-105 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative h-64 md:h-full min-h-[300px] bg-mint/30 overflow-hidden">
              <Image
                src={plant.image}
                alt={plant.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              {plant.popular && (
                <div className="absolute top-4 left-4 bg-popular text-popular-text text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Popular Choice
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-mint text-primary mb-2">
                  {plant.category}
                </span>

                <h2 className="font-lora text-2xl sm:text-3xl font-medium text-ink">
                  {plant.name}
                </h2>
                <p className="italic text-sm text-muted mt-0.5 mb-3">{plant.latin}</p>

                <p className="text-sm text-ink/80 leading-relaxed">
                  {plant.description}
                </p>

                {/* Care details */}
                <div className="mt-4 pt-4 border-t border-primary/10 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-ink/90">
                    <div className="p-1.5 rounded-full bg-amber-50 text-amber-600">
                      <Sun className="w-4 h-4" />
                    </div>
                    <span>
                      <strong className="font-medium text-ink">Sunlight:</strong> {plant.light}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-ink/90">
                    <div className="p-1.5 rounded-full bg-sky-50 text-sky-600">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <span>
                      <strong className="font-medium text-ink">Watering:</strong> {plant.water}
                    </span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                    <span>Free doorstep setup</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Hardened healthy stock</span>
                  </div>
                </div>
              </div>

              {/* Price & Action row */}
              <div className="pt-4 border-t border-primary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted block">Price</span>
                    <span className="font-lora text-2xl font-bold text-ink">
                      {formatPrice(plant.price)}
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-primary/20 rounded-full bg-[#F8FAF7] p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-ink">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
                    added
                      ? 'bg-emerald-600 text-white scale-[0.99]'
                      : 'bg-primary hover:bg-primary-hover text-white hover:shadow-lift'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to cart!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add {quantity > 1 ? `${quantity} Plants` : 'to Cart'} — {formatPrice(plant.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

