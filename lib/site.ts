/**
 * Global site configuration
 * Edit phone number, WhatsApp number, email, and social details here.
 */
export const SITE_CONFIG = {
  name: "Blue Leaf",
  domain: "blueleaf.com",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // International format without + or spaces
  email: "hello@blueleaf.com",
  hours: "Mon–Sat, 9 am – 7 pm",
  address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038",
  tagline: "Hand-picked plants for homes, offices and gardens — delivered, potted and set up by our own team.",
  usp: "Cash or UPI on delivery · Free expert guidance · Real helpline, real people",
};

/**
 * Builds a WhatsApp wa.me link with encoded text
 */
export function buildWhatsAppLink(message: string): string {
  const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

