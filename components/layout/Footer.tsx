'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site';
import { CATEGORIES } from '@/data/plants';

export default function Footer() {
  return (
    <footer className="bg-footer text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                <Leaf className="w-5 h-5 fill-white/20 stroke-white stroke-[2.2]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-lora text-2xl font-semibold tracking-tight text-white group-hover:text-[#88C49D] transition-colors">
                  Blue Leaf
                </span>
                <span className="text-xs text-white/50 ml-0.5">.com</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Plants for homes, offices and gardens — delivered, potted and set up by our own team of green experts. Cash or UPI on delivery.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-white/50">
              <span>{SITE_CONFIG.address}</span>
            </div>
          </div>

          {/* Col 2: Explore Links & Categories */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold font-sans">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Shop Plants</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/green-setup"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Green Setup Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Your Cart</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <p className="text-xs text-white/40 mb-2">Plant Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors border border-white/5"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Customer Helpline */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/50 font-semibold font-sans">
              CUSTOMER HELPLINE
            </h3>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-full bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-all duration-200 hover:scale-[1.02] shadow-md border border-white/10"
            >
              <Phone className="w-4 h-4 fill-white/20" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <div className="space-y-1.5 text-xs text-white/60 pt-1">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-white/40" />
                <span>{SITE_CONFIG.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/40" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white underline">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Blue Leaf Nursery. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Handcrafted with care for Indian plant lovers · No online payment needed
          </p>
        </div>
      </div>
    </footer>
  );
}

