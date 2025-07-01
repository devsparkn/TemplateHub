import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Template {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number | 'Free';
  thumbnailUrls: string[];
  demoUrl: string;
  features: string[];
  techStack: string[];
  featured: boolean;
  isActive: boolean;
}

interface CartItem extends Template {
  id: string | null | undefined;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Template>) => {
      if (action.payload.price === 'Free') {
        return;
      }
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload, quantity: 1,
          id: undefined
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }): CartItem[] => state.cart.items;
export const selectCartTotalAmount = (state: { cart: CartState }): number => state.cart.items.reduce((total, item) => {
  return total + (item.price === 'Free' ? 0 : Number(item.price) * item.quantity);
}, 0);
export const selectCartTotalItems = (state: { cart: CartState }): number => state.cart.items.reduce((total, item) => total + item.quantity, 0); 