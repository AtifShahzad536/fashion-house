import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('zurielle_cart')
  ? JSON.parse(localStorage.getItem('zurielle_cart'))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: localStorage.getItem('zurielle_shipping')
    ? JSON.parse(localStorage.getItem('zurielle_shipping'))
    : {},
  coupon: null,
  isCartOpen: false,
};

const calculateTotals = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + (item.price + (item.customizationCharge || 0)) * item.qty,
    0
  );
  const discount = state.coupon ? (itemsPrice * state.coupon.discountPercent) / 100 : 0;
  const shippingPrice = itemsPrice > 50000 || itemsPrice === 0 ? 0 : 2500; // Free shipping above 50,000 PKR
  const taxPrice = Math.round(itemsPrice * 0.05); // 5% luxury tax
  const totalPrice = itemsPrice - discount + shippingPrice + taxPrice;

  return { itemsPrice, discount, shippingPrice, taxPrice, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Unique key considering custom configuration & size
      const customKey = item.customizationId || item.customSpecsHash || '';
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.size === item.size && (x.customizationId || '') === customKey
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.size === existItem.size && (x.customizationId || '') === customKey
            ? { ...x, qty: x.qty + (item.qty || 1) }
            : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('zurielle_cart', JSON.stringify(state.cartItems));
      state.isCartOpen = true;
    },
    removeFromCart: (state, action) => {
      const { id, size, customizationId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => !(x._id === id && x.size === size && (x.customizationId || '') === (customizationId || ''))
      );
      localStorage.setItem('zurielle_cart', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, size, customizationId, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) => {
        if (x._id === id && x.size === size && (x.customizationId || '') === (customizationId || '')) {
          return { ...x, qty: Math.max(1, qty) };
        }
        return x;
      });
      localStorage.setItem('zurielle_cart', JSON.stringify(state.cartItems));
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    removeCoupon: (state) => {
      state.coupon = null;
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('zurielle_shipping', JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.coupon = null;
      localStorage.removeItem('zurielle_cart');
    },
    toggleCartDrawer: (state, action) => {
      state.isCartOpen = action.payload !== undefined ? action.payload : !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  saveShippingAddress,
  clearCart,
  toggleCartDrawer,
} = cartSlice.actions;

export { calculateTotals };
export default cartSlice.reducer;
