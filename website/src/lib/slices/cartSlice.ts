import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template } from '@/utils/template';

export interface CartItem {
  templateId: string;
  id: string;
  title: string;
  price: number | 'Free';
  thumbnailUrls: string[];
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Template>) => {
      const template = action.payload;
      const existingItem = state.items.find(item => item.templateId === template.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          templateId: template.id,
          id: template.id,
          title: template.title,
          price: template.price,
          thumbnailUrls: template.thumbnailUrls,
          category: template.category,
          quantity: 1,
        });
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => {
        return total + (item.price === 'Free' ? 0 : Number(item.price) * item.quantity);
      }, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const templateId = action.payload;
      state.items = state.items.filter(item => item.templateId !== templateId);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => {
        return total + (item.price === 'Free' ? 0 : Number(item.price) * item.quantity);
      }, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ templateId: string; quantity: number }>) => {
      const { templateId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.templateId === templateId);
      
      if (existingItem) {
        existingItem.quantity = quantity;
        
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.templateId !== templateId);
        }
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => {
        return total + (item.price === 'Free' ? 0 : Number(item.price) * item.quantity);
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Default export for the reducer
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }): CartItem[] => state.cart.items;
export const selectCartTotalAmount = (state: { cart: CartState }): number => state.cart.totalAmount;
export const selectCartTotalItems = (state: { cart: CartState }): number => state.cart.totalItems; 