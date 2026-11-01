'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Plant } from '@/data/plants';

export interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  lastAddedId: string | null;
  bounceBadge: boolean;
  addItem: (plant: Plant, quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  resetBounceBadge: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastAddedId: null,
      bounceBadge: false,

      addItem: (plant, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.plant.id === plant.id);
          let newItems: CartItem[];
          if (existing) {
            newItems = state.items.map((item) =>
              item.plant.id === plant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { plant, quantity }];
          }
          return {
            items: newItems,
            lastAddedId: plant.id,
            bounceBadge: true,
          };
        });
      },

      removeItem: (plantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.plant.id !== plantId),
        }));
      },

      updateQuantity: (plantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(plantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.plant.id === plantId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.plant.price * item.quantity,
          0
        );
      },

      resetBounceBadge: () => {
        set({ bounceBadge: false });
      },
    }),
    {
      name: 'blue-leaf-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

