import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop Plants — The Blue Leaf Catalog',
  description:
    'Fresh air, food, fragrance or just quiet beauty — pick a category and add to cart. Cash or UPI on delivery.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-muted mt-3">Loading catalog...</p>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}

