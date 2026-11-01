'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, MessageCircle, Calendar, MapPin, Phone, User, Home, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_CONFIG, buildWhatsAppLink } from '@/lib/site';

const setupSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number (e.g. 9876543210)'),
  area: z.string().min(3, 'Please enter your city/neighborhood (e.g. Indiranagar, Bengaluru)'),
  spaceType: z.enum(['Home', 'Office', 'Garden'], {
    errorMap: () => ({ message: 'Please select your space type' }),
  }),
  approxSize: z.string().min(2, 'Please specify approximate size (e.g. Balcony 80 sq ft)'),
  preferredDate: z.string().min(1, 'Please choose a preferred date'),
  notes: z.string().optional(),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function SetupForm() {
  const [submittedData, setSubmittedData] = useState<SetupFormData | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      spaceType: 'Home',
    },
  });

  const selectedSpaceType = watch('spaceType');

  const onSubmit = (data: SetupFormData) => {
    setSubmittedData(data);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2F6B47', '#E6F0E8', '#FBEFC7', '#88C49D'],
      });
    } catch {
      // ignore
    }

    // Format WhatsApp message
    const message = `🌿 *New Green Setup Visit Request — Blue Leaf*
----------------------------------------
*Name:* ${data.name}
*Phone:* +91 ${data.phone}
*City/Area:* ${data.area}
*Space Type:* ${data.spaceType}
*Approx Size:* ${data.approxSize}
*Preferred Date:* ${data.preferredDate}
${data.notes ? `*Special Notes:* ${data.notes}\n` : ''}----------------------------------------
_Please confirm the time slot with me._`;

    // Open WhatsApp in new tab
    const waUrl = buildWhatsAppLink(message);
    window.open(waUrl, '_blank');
  };

  const getCopyableText = () => {
    if (!submittedData) return '';
    return `Green Setup Visit Request — Blue Leaf:
Name: ${submittedData.name}
Phone: +91 ${submittedData.phone}
Area: ${submittedData.area}
Space Type: ${submittedData.spaceType}
Size: ${submittedData.approxSize}
Preferred Date: ${submittedData.preferredDate}
${submittedData.notes ? `Notes: ${submittedData.notes}` : ''}`;
  };

  const handleCopy = () => {
    const text = getCopyableText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-primary/15 shadow-soft max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!submittedData ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint text-primary text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Advance · Free Initial Consultation</span>
              </div>
              <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink">
                Book a setup visit
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
                Tell us where and when — our coordinator will call to fix the exact slot. The visit and consultation are free within the city.
              </p>
            </div>

            {/* Space Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                1. Space Type
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Home', 'Office', 'Garden'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue('spaceType', type)}
                    className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border text-center ${
                      selectedSpaceType === type
                        ? 'bg-mint text-primary border-primary ring-2 ring-primary/20 scale-[1.02]'
                        : 'bg-[#F8FAF7] hover:bg-mint/40 text-ink/80 border-primary/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.spaceType && (
                <p className="text-xs text-rose-600">{errors.spaceType.message}</p>
              )}
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Ramesh Iyer"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.name && (
                  <p className="text-xs text-rose-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>Phone Number</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted">
                    +91
                  </span>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* City/Area and Approx Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>City / Area</span>
                </label>
                <input
                  type="text"
                  {...register('area')}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.area && (
                  <p className="text-xs text-rose-600">{errors.area.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-primary" />
                  <span>Approximate Space Size</span>
                </label>
                <input
                  type="text"
                  {...register('approxSize')}
                  placeholder="e.g. Balcony (80 sq ft) or 4 desks"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.approxSize && (
                  <p className="text-xs text-rose-600">{errors.approxSize.message}</p>
                )}
              </div>
            </div>

            {/* Preferred Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Preferred Date for Setup Visit</span>
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {errors.preferredDate && (
                <p className="text-xs text-rose-600">{errors.preferredDate.message}</p>
              )}
            </div>

            {/* Optional Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink block">
                Special requirements or plant wishes (optional)
              </label>
              <textarea
                rows={2}
                {...register('notes')}
                placeholder="e.g. Looking for pet-friendly plants or low-light balcony greenery..."
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-lift transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Confirm &amp; Send on WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[11px] text-center text-muted">
              Submitting opens a pre-filled WhatsApp message directly with Blue Leaf. No data is stored on any server.
            </p>
          </motion.form>
        ) : (
          /* Animated Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">
                Booking Sent!
              </span>
              <h3 className="font-lora text-2xl sm:text-3xl font-medium text-ink">
                Thank you, {submittedData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
                Your setup request has been opened in WhatsApp. Our coordinator will contact you at{' '}
                <strong className="text-ink">+91 {submittedData.phone}</strong> to confirm the exact time slot for {submittedData.preferredDate}.
              </p>
            </div>

            {/* Summary card */}
            <div className="p-4 rounded-2xl bg-[#F8FAF7] border border-primary/10 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-muted">Space:</span>
                <span className="font-medium text-ink">{submittedData.spaceType} ({submittedData.approxSize})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Location:</span>
                <span className="font-medium text-ink">{submittedData.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Date:</span>
                <span className="font-medium text-ink">{submittedData.preferredDate}</span>
              </div>
            </div>

            {/* Backup copy button and reopen button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-mint hover:bg-mint-dark text-primary text-xs font-semibold transition-all shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Details Copied!' : 'Copy Details as Backup'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const message = `🌿 *New Green Setup Visit Request — Blue Leaf*
----------------------------------------
*Name:* ${submittedData.name}
*Phone:* +91 ${submittedData.phone}
*City/Area:* ${submittedData.area}
*Space Type:* ${submittedData.spaceType}
*Approx Size:* ${submittedData.approxSize}
*Preferred Date:* ${submittedData.preferredDate}
${submittedData.notes ? `*Special Notes:* ${submittedData.notes}\n` : ''}----------------------------------------`;
                  window.open(buildWhatsAppLink(message), '_blank');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="text-xs text-muted hover:text-ink underline"
              >
                Book another visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

