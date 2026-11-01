'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const STATS = [
  { target: 500, suffix: '+', label: 'Spaces Greened', sub: 'Homes, offices & terraces' },
  { target: 16, suffix: '+', label: 'Selected Varieties', sub: 'Hardened for Indian weather' },
  { target: 4.9, suffix: '★', isFloat: true, label: 'Customer Rating', sub: 'From 320+ verified reviews' },
  { target: 100, suffix: '%', label: 'Doorstep Potting', sub: 'Done by our own team' },
];

const TESTIMONIALS = [
  {
    quote:
      'Blue Leaf transformed our dull apartment balcony into a vibrant green oasis! Their gardeners brought the pots, rich soil mix, and potted every plant right in front of us. No mess left behind.',
    author: 'Ananya Sharma',
    location: 'Indiranagar, Bengaluru',
    tag: 'Home Balcony Setup',
  },
  {
    quote:
      'Ordering was so refreshingly simple — zero advance payments, pay when the team sets it up. The Snake Plant and Areca Palms in our office lobby look so fresh and healthy.',
    author: 'Vikramaditya Roy',
    location: 'HSR Layout, Bengaluru',
    tag: 'Office Space Setup',
  },
  {
    quote:
      'The sunflower microgreens are crisp and delicious! Plus the gardener gave us clear watering instructions. Love supporting a team that actually cares about plant longevity.',
    author: 'Pooja Iyer',
    location: 'Koramangala, Bengaluru',
    tag: 'Kitchen Herb & Greens',
  },
];

export default function StatsAndTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 sm:py-20 bg-mint/30 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Animated Count-up Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-primary/10 shadow-soft text-center"
            >
              <div className="font-lora text-3xl sm:text-4xl font-bold text-primary">
                {stat.target}
                {stat.suffix}
              </div>
              <div className="font-medium text-sm text-ink mt-2">{stat.label}</div>
              <div className="text-xs text-muted mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-mint px-3 py-1 rounded-full">
              Real Experiences
            </span>
            <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink mt-2">
              Words from fellow green lovers
            </h3>
          </div>

          <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-primary/10 shadow-soft overflow-hidden">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />

            <div className="min-h-[160px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-ink/90 italic leading-relaxed">
                    &ldquo;{TESTIMONIALS[currentIdx].quote}&rdquo;
                  </p>

                  <div className="pt-2">
                    <div className="font-lora font-semibold text-ink">
                      {TESTIMONIALS[currentIdx].author}
                    </div>
                    <div className="text-xs text-muted">
                      {TESTIMONIALS[currentIdx].location} ·{' '}
                      <span className="text-primary font-medium">
                        {TESTIMONIALS[currentIdx].tag}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-primary/10 mt-6">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIdx ? 'w-6 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-mint/50 hover:bg-mint text-primary transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-mint/50 hover:bg-mint text-primary transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

