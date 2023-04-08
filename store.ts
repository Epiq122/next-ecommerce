import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from './types/AddCartType';

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  // clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  // removeProduct: (item: AddCartType) => void;
  // paymentIntent: string;
  // onCheckout: string;
  // setPaymentIntent: (val: string) => void;
  // setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id,
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                const quantity = cartItem.quantity ?? 0;
                return { ...cartItem, quantity: quantity + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
    }),
    { name: 'cart-store' },
  ),
);
