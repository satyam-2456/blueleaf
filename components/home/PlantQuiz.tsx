'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Trees, Sun, CloudSun, Sunset, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { PLANTS, Plant, SpaceType, LightLevel } from '@/data/plants';
import PlantCard from '@/components/plants/PlantCard';
import QuickViewModal from '@/components/plants/QuickViewModal';

export default function PlantQuiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSpace, setSelectedSpace] = useState<SpaceType | null>(null);
  const [selectedLight, setSelectedLight] = useState<LightLevel | null>(null);
  const [quickViewPlant, setQuickViewPlant] = useState<Plant | null>(null);

  const spaces: { id: SpaceType; label: string; sub: string; icon: any }[] = [
    {
      id: 'Home',
      label: 'Home',
      sub: 'Living rooms, bedrooms & balconies',
      icon: Home,
    },
    {
      id: 'Office',
      label: 'Office',
      sub: 'Desks, cabins & reception lobbies',
      icon: Briefcase,
    },
    {
      id: 'Garden',
      label: 'Garden',
      sub: 'Terraces, patios & outdoor corners',
      icon: Trees,
    },
  ];

  const lights: { id: LightLevel; label: string; sub: string; icon: any }[] = [
    {
      id: 'Low',
      label: 'Low Light',
      sub: 'Indirect corners, hallways, fluorescent office lighting',
      icon: Sunset,
    },
    {
      id: 'Medium',
      label: 'Medium Light',
      sub: 'Bright filtered rooms, near east or north windows',
      icon: CloudSun,
    },
    {
      id: 'Bright',
      label: 'Bright Sun',
      sub: 'Sunny balconies, direct morning or afternoon rays',
      icon: Sun,
    },
  ];

  const handleSpaceSelect = (space: SpaceType) => {
    setSelectedSpace(space);
    setTimeout(() => {
      setStep(2);
    }, 280);
  };

  const handleLightSelect = (light: LightLevel) => {
    setSelectedLight(light);
    setTimeout(() => {
      setStep(3);
    }, 280);
  };

  const resetQuiz = () => {
    setSelectedSpace(null);
    setSelectedLight(null);
    setStep(1);
  };

  // Find 3 best matching plants based on selections
  const matchingPlants = PLANTS.filter((p) => {
    if (!selectedSpace || !selectedLight) return false;
    const matchesSpace = p.idealSpace.includes(selectedSpace);
    const matchesLight = p.lightLevel.includes(selectedLight);
    return matchesSpace && matchesLight;
  }).slice(0, 3);

  // Fallback if less than 3
  const finalMatches =
    matchingPlants.length >= 3
      ? matchingPlants
      : [
          ...matchingPlants,
          ...PLANTS.filter((p) => !matchingPlants.includes(p)),
        ].slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-[#F4F8F4]/60 border-y border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-mint px-3 py-1 rounded-full">
            Plant Finder Quiz
          </span>
          <h2 className="font-lora text-3xl sm:text-4xl font-medium text-ink mt-3">
            Find your plants in 30 seconds
          </h2>
          <p className="text-sm sm:text-base text-muted mt-2 leading-relaxed">
            Two quick questions and we&apos;ll suggest the right plants for your space. No endless scrolling.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-8 flex items-center justify-between text-xs font-medium text-muted">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                step >= 1 ? 'bg-primary text-white' : 'bg-mint text-primary'
              }`}
            >
              1
            </span>
            <span className={step === 1 ? 'text-ink font-semibold' : ''}>Space</span>
          </div>

          <div className="h-0.5 w-12 bg-primary/20" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                step >= 2 ? 'bg-primary text-white' : 'bg-mint text-primary'
              }`}
            >
              2
            </span>
            <span className={step === 2 ? 'text-ink font-semibold' : ''}>Light</span>
          </div>

          <div className="h-0.5 w-12 bg-primary/20" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                step === 3 ? 'bg-primary text-white' : 'bg-mint text-primary'
              }`}
            >
              ✓
            </span>
            <span className={step === 3 ? 'text-ink font-semibold' : ''}>Matches</span>
          </div>
        </div>

        {/* Quiz Steps Box */}
        <div className="min-h-[340px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-xs uppercase font-semibold text-primary tracking-wide">
                    Step 1 of 2
                  </p>
                  <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink mt-1">
                    Where will your plants live?
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
                  {spaces.map((s) => {
                    const Icon = s.icon;
                    const isSelected = selectedSpace === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSpaceSelect(s.id)}
                        className={`group relative text-left p-6 rounded-3xl bg-white transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-soft hover:shadow-lift ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/40 scale-[1.02]'
                            : 'border-primary/15 hover:border-primary/40 hover:-translate-y-1'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-lora text-xl font-medium text-ink group-hover:text-primary transition-colors">
                          {s.label}
                        </h4>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{s.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-xs uppercase font-semibold text-primary tracking-wide">
                    Step 2 of 2
                  </p>
                  <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink mt-1">
                    How much sunlight does that spot get?
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2">
                  {lights.map((l) => {
                    const Icon = l.icon;
                    const isSelected = selectedLight === l.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => handleLightSelect(l.id)}
                        className={`group relative text-left p-6 rounded-3xl bg-white transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-soft hover:shadow-lift ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/40 scale-[1.02]'
                            : 'border-primary/15 hover:border-primary/40 hover:-translate-y-1'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-lora text-xl font-medium text-ink group-hover:text-primary transition-colors">
                          {l.label}
                        </h4>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{l.sub}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-muted hover:text-ink underline"
                  >
                    ← Back to step 1
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-mint px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        Curated for {selectedSpace} · {selectedLight} Light
                      </span>
                    </div>
                    <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink mt-2">
                      Your perfect green matches
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-mint text-xs font-medium text-ink border border-primary/20 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                {/* 3 Matched Plant Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto pt-2">
                  {finalMatches.map((plant) => (
                    <PlantCard
                      key={plant.id}
                      plant={plant}
                      onQuickView={(p) => setQuickViewPlant(p)}
                    />
                  ))}
                </div>

                <div className="text-center pt-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
                  >
                    <span>Explore All 16 Plants in Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

