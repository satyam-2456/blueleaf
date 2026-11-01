'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Check,
  Copy,
  MessageCircle,
  Truck,
  ShieldCheck,
  Wallet,
  ArrowRight,
  User,
  Phone,
  MapPin,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore, CartItem } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { SITE_CONFIG, buildWhatsAppLink } from '@/lib/site';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  address: z.string().min(6, 'Please enter your full delivery address'),
  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit Indian Pincode'),
  note: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CartView() {
  const [mounted, setMounted] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    items: CartItem[];
    subtotal: number;
    details: CheckoutFormData;
    orderId: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const { items, removeItem, updateQuantity, clearCart, getSubtotal } =
    useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
      </div>
    );
  }

  const subtotal = getSubtotal();

  const handlePlaceOrder = (details: CheckoutFormData) => {
    const orderId = `BL-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      items: [...items],
      subtotal,
      details,
      orderId,
    };

    setSubmittedOrder(orderData);

    // Confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2F6B47', '#E6F0E8', '#FBEFC7', '#88C49D'],
      });
    } catch {
      // ignore
    }

    // Build WhatsApp message
    const itemLines = items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.plant.name} (${formatPrice(it.plant.price * it.quantity)})`
      )
      .join('\n');

    const message = `🌿 *New Plant Order — Blue Leaf (#${orderId})*
----------------------------------------
*Items Ordered:*
${itemLines}

*Total Amount:* ${formatPrice(subtotal)}
*Payment Method:* Cash or UPI on delivery (COD)

----------------------------------------
*Customer Details:*
• *Name:* ${details.name}
• *Phone:* +91 ${details.phone}
• *Address:* ${details.address}
• *Pincode:* ${details.pincode}
${details.note ? `• *Note:* ${details.note}\n` : ''}----------------------------------------
_Please confirm dispatch and delivery schedule._`;

    // Open WhatsApp
    const waUrl = buildWhatsAppLink(message);
    window.open(waUrl, '_blank');

    // Clear cart in store
    clearCart();
  };

  const getCopyableOrderText = () => {
    if (!submittedOrder) return '';
    const itemsText = submittedOrder.items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.plant.name} - ${formatPrice(it.plant.price * it.quantity)}`
      )
      .join('\n');

    return `Blue Leaf Order #${submittedOrder.orderId}
Items:
${itemsText}

Total: ${formatPrice(submittedOrder.subtotal)}
Payment: Cash / UPI on Delivery

Customer:
Name: ${submittedOrder.details.name}
Phone: +91 ${submittedOrder.details.phone}
Address: ${submittedOrder.details.address}, Pincode: ${submittedOrder.details.pincode}
${submittedOrder.details.note ? `Note: ${submittedOrder.details.note}` : ''}`;
  };

  const handleCopyOrder = () => {
    const text = getCopyableOrderText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // SUCCESS / THANK YOU STATE
  if (submittedOrder) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] p-8 sm:p-12 border border-primary/15 shadow-soft text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">
                Order Sent on WhatsApp
              </span>
              <h2 className="font-lora text-3xl font-medium text-ink">
                Order #{submittedOrder.orderId} Placed!
              </h2>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Thank you, {submittedOrder.details.name}. We&apos;ve opened your order in WhatsApp. Our nursery staff will confirm dispatch to your address shortly.
              </p>
            </div>

            {/* Order Summary box */}
            <div className="p-5 rounded-2xl bg-[#F8FAF7] border border-primary/10 text-left text-xs space-y-3">
              <div className="font-semibold text-ink text-sm pb-1 border-b border-primary/10 flex justify-between">
                <span>Summary</span>
                <span className="text-primary font-bold">
                  {formatPrice(submittedOrder.subtotal)}
                </span>
              </div>
              <div className="space-y-1.5 text-muted">
                {submittedOrder.items.map((it) => (
                  <div key={it.plant.id} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.plant.name}
                    </span>
                    <span className="font-medium text-ink">
                      {formatPrice(it.plant.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-primary/10 flex justify-between text-ink">
                <span>Payment Mode:</span>
                <span className="font-medium text-emerald-700">Cash or UPI on delivery</span>
              </div>
              <div className="flex justify-between text-ink">
                <span>Delivering to:</span>
                <span className="font-medium text-right max-w-xs truncate">
                  {submittedOrder.details.address} ({submittedOrder.details.pincode})
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyOrder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mint hover:bg-mint-dark text-primary text-xs font-semibold shadow-sm transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Details Copied!' : 'Copy Order Details'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const itemLines = submittedOrder.items
                    .map(
                      (it) =>
                        `• ${it.quantity}x ${it.plant.name} (${formatPrice(it.plant.price * it.quantity)})`
                    )
                    .join('\n');
                  const message = `🌿 *Order #${submittedOrder.orderId} — Blue Leaf*\n${itemLines}\n*Total:* ${formatPrice(submittedOrder.subtotal)}\n*Delivery Address:* ${submittedOrder.details.address} (${submittedOrder.details.pincode})\n*Phone:* +91 ${submittedOrder.details.phone}`;
                  window.open(buildWhatsAppLink(message), '_blank');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </button>
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Continue browsing plants</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (items.length === 0) {
    return (
      <div className="py-20 sm:py-28">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] p-8 sm:p-12 border border-primary/15 shadow-soft space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-mint flex items-center justify-center text-primary mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.6]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-lora text-2xl sm:text-3xl font-medium text-ink">
                Your cart is empty
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Find a plant you love — we&apos;ll deliver and even set it up for you.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-lift transition-all hover:scale-105 active:scale-95"
            >
              <span>Browse plants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // FILLED CART STATE
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest text-muted uppercase">
            CHECKOUT
          </span>
          <h1 className="font-lora text-3xl sm:text-4xl font-medium text-ink mt-1">
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.plant.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-primary/10 shadow-soft flex items-center gap-4"
                >
                  {/* Plant thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-mint/30 shrink-0">
                    <Image
                      src={item.plant.image}
                      alt={item.plant.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-mint px-2 py-0.5 rounded-full">
                      {item.plant.category}
                    </span>
                    <h3 className="font-lora text-base sm:text-lg font-medium text-ink mt-1 truncate">
                      {item.plant.name}
                    </h3>
                    <p className="text-xs text-muted italic truncate">
                      {item.plant.latin}
                    </p>

                    <div className="font-lora font-bold text-sm text-ink mt-2">
                      {formatPrice(item.plant.price * item.quantity)}
                      {item.quantity > 1 && (
                        <span className="text-xs text-muted font-normal ml-1">
                          ({formatPrice(item.plant.price)} each)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stepper & Remove */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeItem(item.plant.id)}
                      className="p-1.5 rounded-full text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      aria-label={`Remove ${item.plant.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-primary/20 rounded-full bg-[#F8FAF7] p-0.5">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.plant.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.plant.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full flex items-center justify-center text-ink hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-2 flex justify-between items-center text-xs text-muted">
              <Link
                href="/shop"
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                ← Add more plants
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="hover:text-rose-600 underline"
              >
                Clear all items
              </button>
            </div>
          </div>

          {/* Right Column: Checkout Details Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/15 shadow-soft space-y-6 sticky top-24">
              <div>
                <h2 className="font-lora text-xl font-medium text-ink">
                  Delivery Details
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  We deliver, pot, and set up your plants right at your doorstep.
                </p>
              </div>

              <form onSubmit={handleSubmit(handlePlaceOrder)} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>Mobile Number</span>
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
                      className="w-full pl-12 pr-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Delivery Address</span>
                  </label>
                  <textarea
                    rows={2}
                    {...register('address')}
                    placeholder="House/Flat No, Apartment, Street name, Area"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-600">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Pincode</span>
                  </label>
                  <input
                    type="text"
                    {...register('pincode')}
                    placeholder="6-digit Pincode (e.g. 560038)"
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-rose-600">{errors.pincode.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-ink flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span>Delivery note (optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register('note')}
                    placeholder="e.g. Ring doorbell, deliver on Saturday morning"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAF7] border border-primary/15 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {/* Payment method badge */}
                <div className="p-3.5 rounded-2xl bg-mint/50 border border-primary/15 flex items-start gap-2.5">
                  <Wallet className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-ink block">
                      Cash or UPI on delivery (COD)
                    </span>
                    <span className="text-muted leading-relaxed">
                      Zero online payment required now. Inspect your plants and pay the delivery staff via cash or any UPI app.
                    </span>
                  </div>
                </div>

                {/* Subtotal & Total */}
                <div className="pt-3 border-t border-primary/10 space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Plants Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Doorstep Setup &amp; Delivery</span>
                    <span className="text-primary font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-primary/10">
                    <span>Total Pay on Delivery</span>
                    <span className="font-lora text-xl text-primary font-bold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm shadow-lift transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Place Order via WhatsApp — {formatPrice(subtotal)}</span>
                </button>

                <p className="text-[11px] text-center text-muted">
                  Order details will open in WhatsApp so you can confirm with our team directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

