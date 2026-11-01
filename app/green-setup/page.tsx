import React from 'react';
import Image from 'next/image';
import { Phone, CheckCircle, Sparkles, MessageSquare, Truck, Flower } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';
import SetupForm from '@/components/green-setup/SetupForm';

export const metadata = {
  title: 'Green Setup Service — Blue Leaf Nursery',
  description:
    'Book a visit and Blue Leaf staff will set up plants at your home, office or garden — from picking the right greens to potting and placement.',
};

const STEPS = [
  {
    step: '01',
    title: 'Tell us about your space',
    desc: 'Share your home, office or garden size and its lighting — a two-minute form is all we need to get started.',
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'We pick & deliver',
    desc: 'Our team selects hardened, healthy plants matched to your space and style, and brings them right to your doorstep.',
    icon: Truck,
  },
  {
    step: '03',
    title: 'On-site setup & potting',
    desc: 'Our staff visits your premises, arranges the pots, feeds initial nutrition — and leaves everything thriving.',
    icon: Flower,
  },
];

export default function GreenSetupPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-mint text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Service Botanical Transformations</span>
            </div>

            <h1 className="font-lora text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.15]">
              Let our gardeners set it up for you.
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              Book a visit and Blue Leaf staff will set up plants at your home, office or garden — from picking the right greens to potting and placement.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-mint text-ink text-xs sm:text-sm font-semibold border border-primary/20 shadow-soft transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Questions? {SITE_CONFIG.phone}</span>
              </a>
              <span className="text-xs text-muted">
                Zero advance · Consultation is 100% free
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lift border border-primary/10 bg-mint/30">
              <Image
                src="/images/green-setup-hero.jpg"
                alt="Green setup visit by Blue Leaf staff"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </div>
          </div>
        </div>

        {/* 3 Step Cards with Connector Line */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-semibold text-primary tracking-widest bg-mint px-3 py-1 rounded-full">
              HOW IT WORKS
            </span>
            <h2 className="font-lora text-3xl sm:text-4xl font-medium text-ink mt-3">
              Three simple steps to lush living
            </h2>
            <p className="text-sm text-muted mt-2">
              From our nursery beds straight to your personal sanctuary.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Self-drawing Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-8 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {STEPS.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.step}
                    className="relative bg-white rounded-3xl p-7 border border-primary/15 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-mint flex items-center justify-center text-primary shadow-sm">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                        <span className="font-lora text-2xl font-bold text-primary/30">
                          {s.step}
                        </span>
                      </div>

                      <h3 className="font-lora text-xl font-medium text-ink mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-primary/10 flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span>Blue Leaf Coordinator Managed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Booking Form */}
        <div className="pt-6">
          <SetupForm />
        </div>
      </div>
    </div>
  );
}

