# Blue Leaf (blueleaf.com) — Plant Nursery & Green Setup Service

A high-performance, front-end only website for **Blue Leaf**, an artisanal plant nursery and green setup service in India. Designed with organic minimalism, soothing botanical aesthetics, and rich motion design.

---

## Highlights & Features

- **Front-end Only (Zero Backend / Zero Database)**: No authentication, no admin logins, no environment secrets, no serverless functions required.
- **WhatsApp Direct Ordering & Booking**: Orders and setup visits open pre-filled messages on `wa.me` directly to the business helpline with backup "Copy details" functionality.
- **Client-Side Cart**: Stored locally in the user's browser using `Zustand` (`localStorage` persistence).
- **Motion & Micro-interactions**:
  - Lenis smooth inertial scrolling
  - Word-by-word headline reveals
  - Interactive "Find your plants" 2-step mini quiz
  - Add-to-cart button morph + flying particle animation + cart count badge bounce
  - Parallax imagery and floating ambient leaves
  - Sliding active pill navigation and category tabs
  - Quick-view plant modals with care guides (sunlight & water)
  - Floating WhatsApp coordinator assistant with gentle pulse
  - Responsive animated mobile navigation drawer
- **Static Export Ready**: Built using Next.js 14 App Router with `output: 'export'`. Fully deployable for free on Vercel, Netlify, or GitHub Pages.

---

## Quick Start (Run Locally)

### 1. Requirements
- Node.js 18+ or 20+ LTS
- npm, pnpm, or yarn

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build static export
```bash
npm run build
```
This produces an optimized static export in the `out/` directory ready for any static web host.

---

## Customization Guide

### 1. Editing Phone, WhatsApp Number, Email & Business Hours
All contact information is centralized in a single file:  
`lib/site.ts`

```typescript
export const SITE_CONFIG = {
  name: "Blue Leaf",
  domain: "blueleaf.com",
  phone: "+91 98765 43210",              // Customer display phone
  whatsappNumber: "919876543210",        // International format (no spaces or '+')
  email: "hello@blueleaf.com",            // Helpline email
  hours: "Mon–Sat, 9 am – 7 pm",         // Operating hours
  address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038",
  tagline: "Hand-picked plants for homes, offices and gardens...",
};
```
Updating this file immediately changes all phone links, WhatsApp prefilled messages, and footer/header contact pills across the entire site.

---

### 2. Editing Plants, Prices, Care Info & Categories
All catalog data lives in:  
`data/plants.ts`

To change a price, rename a plant, or add new varieties:
```typescript
{
  id: 'snake-plant',
  name: 'Snake Plant',
  latin: 'Dracaena trifasciata',
  category: 'Fresh Air',                 // Must match PlantCategory
  price: 399,                            // Price in Indian Rupees (₹)
  light: 'Low to bright, any corner',
  water: 'Every 2–3 weeks',
  image: '/images/plants/snake-plant.jpg', // Path in public folder
  popular: true,                         // Shows 'Popular' badge & home feature
  description: 'Indestructible and architectural...',
  idealSpace: ['Home', 'Office'],        // Used by quiz matcher
  lightLevel: ['Low', 'Medium', 'Bright'],
}
```

### 3. Adding New Plant Images
Place optimized JPEG/PNG/WebP photos into:
```
public/images/plants/<filename>.jpg
```
Reference them in `data/plants.ts` as `/images/plants/<filename>.jpg`.

---

## Free Deployment Guide

### Option 1: Deploy to Vercel (Recommended)

#### Method A: Via GitHub (Continuous Deployment)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Blue Leaf website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/blue-leaf.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New** → **Project**.
4. Select the `blue-leaf` repository.
5. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `out` (or default Next.js build)
6. Click **Deploy**. Your site will be live on a `*.vercel.app` domain within 60 seconds!

#### Method B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
# For production deploy:
vercel --prod
```

---

### Connecting Your Custom Domain (`blueleaf.com`) on Vercel
1. In your Vercel Project Dashboard, go to **Settings** → **Domains**.
2. Type `blueleaf.com` and click **Add**.
3. Choose whether to redirect `blueleaf.com` to `www.blueleaf.com` (recommended) or vice-versa.
4. Log into your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains):
   - **A Record**:
     - **Name / Host**: `@`
     - **Value / Destination**: `76.76.21.21`
   - **CNAME Record**:
     - **Name / Host**: `www`
     - **Value / Destination**: `cname.vercel-dns.com`
5. Vercel will automatically provision a free SSL certificate within a few minutes.

---

### Option 2: Deploy to Netlify
1. Log into [netlify.com](https://netlify.com).
2. Click **Add new site** → **Import an existing project** (or drag and drop the `out` folder).
3. Set **Build command**: `npm run build` and **Publish directory**: `out`.
4. Click **Deploy**.

---

## Project Structure

```
├── app/
│   ├── cart/                 # Cart review & WhatsApp order placement
│   ├── green-setup/          # Green setup visit booking form & process
│   ├── shop/                 # Catalog with search, filters & quick-view
│   ├── globals.css           # Tailwind + glass effects & font variables
│   ├── layout.tsx            # Header, footer, Lenis, progress bar
│   └── page.tsx              # Homepage
├── components/
│   ├── cart/CartView.tsx     # Animated cart line items & COD form
│   ├── green-setup/SetupForm # Validated booking form + confetti + WhatsApp
│   ├── home/                 # Hero, CategoryStrip, PlantQuiz, Popular, Trust
│   ├── layout/               # Header (with bounce badge) & Footer
│   ├── plants/               # PlantCard, QuickViewModal
│   ├── providers/            # Lenis smooth scroll provider
│   └── ui/                   # ScrollProgress, FloatingContact
├── data/
│   └── plants.ts             # 16 plants catalog seed data
├── lib/
│   ├── site.ts               # Helpline, WhatsApp number, email, address
│   └── utils.ts              # Styling and currency formatters
├── public/
│   └── images/               # High-resolution license-free plant photos
├── store/
│   └── useCartStore.ts       # Zustand cart store with localStorage sync
└── tailwind.config.ts        # Design tokens: palette, typography, shadows
```

---

## License & Credits
- Built for Blue Leaf Nursery & Green Setup Service.
- Royalty-free photography sourced via Unsplash under the Unsplash Free License.

