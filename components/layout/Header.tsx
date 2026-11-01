'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShoppingBag, Menu, X, Leaf, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';
import { useCartStore } from '@/store/useCartStore';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop Plants', href: '/shop' },
  { label: 'Green Setup', href: '/green-setup' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItemsCount = useCartStore((state) => state.getItemCount());
  const bounceBadge = useCartStore((state) => state.bounceBadge);
  const resetBounceBadge = useCartStore((state) => state.resetBounceBadge);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (bounceBadge) {
      const timer = setTimeout(() => {
        resetBounceBadge();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [bounceBadge, resetBounceBadge]);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'glass-header py-3 border-b border-[#2F6B47]/10 shadow-[0_4px_20px_rgba(23,38,30,0.06)]'
            : 'bg-[#F8FAF7]/80 backdrop-blur-md py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full pr-2"
              aria-label="Blue Leaf Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                <Leaf className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-lora text-xl sm:text-2xl font-semibold tracking-tight text-ink group-hover:text-primary transition-colors">
                  Blue Leaf
                </span>
                <span className="text-xs text-muted font-normal ml-0.5">.com</span>
              </div>
            </Link>

            {/* Desktop Navigation with Sliding Active Pill */}
            <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-mint/50 border border-primary/10">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-ink/80 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActivePill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-primary/15"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Helpline Pill + Cart Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Helpline Pill (Visible on sm+) */}
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-mint/60 hover:bg-mint text-primary transition-colors border border-primary/15 group"
                aria-label={`Call Helpline ${SITE_CONFIG.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-primary transition-transform group-hover:rotate-12" />
                <span>{SITE_CONFIG.phone}</span>
              </a>

              {/* Cart Button with Count Badge */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-full bg-white hover:bg-mint/50 border border-primary/15 text-ink transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Cart with ${mounted ? cartItemsCount : 0} items`}
                id="cart-icon-btn"
              >
                <ShoppingBag className="w-5 h-5 text-ink stroke-[1.8]" />
                {mounted && cartItemsCount > 0 && (
                  <motion.span
                    animate={
                      bounceBadge
                        ? { scale: [1, 1.45, 0.9, 1.15, 1], rotate: [0, -8, 8, -4, 0] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full md:hidden bg-white border border-primary/15 text-ink hover:bg-mint/40 transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 top-[65px] z-30 bg-[#F8FAF7] flex flex-col justify-between p-6 md:hidden overflow-y-auto"
          >
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted font-semibold pl-2">Navigation</p>
                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-mint text-primary font-semibold'
                            : 'text-ink hover:bg-mint/40'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick links & categories */}
              <div className="p-4 rounded-2xl bg-white border border-primary/10 space-y-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">Direct Shop Categories</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {['Microgreens', 'Fresh Air', 'Fruit Plants', 'Flowering', 'Decorative', 'Fresh Feel'].map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${encodeURIComponent(cat)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl bg-mint/40 hover:bg-mint text-ink text-xs font-medium text-center transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Helpline and info */}
            <div className="space-y-4 pt-6 border-t border-primary/10">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-primary text-white font-medium text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Helpline: {SITE_CONFIG.phone}</span>
              </a>
              <p className="text-center text-xs text-muted">
                {SITE_CONFIG.hours} · Cash or UPI on delivery
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

