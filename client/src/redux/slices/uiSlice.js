import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearchOpen: false,
  isMobileMenuOpen: false,
  quickViewProduct: null,
  currency: 'PKR', // PKR or USD
  currencyRate: 1, // PKR = 1, USD = 0.0036
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSearchModal: (state, action) => {
      state.isSearchOpen = action.payload !== undefined ? action.payload : !state.isSearchOpen;
    },
    toggleMobileMenu: (state, action) => {
      state.isMobileMenuOpen = action.payload !== undefined ? action.payload : !state.isMobileMenuOpen;
    },
    openQuickView: (state, action) => {
      state.quickViewProduct = action.payload;
    },
    closeQuickView: (state) => {
      state.quickViewProduct = null;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      state.currencyRate = action.payload === 'USD' ? 0.0036 : 1;
    },
  },
});

export const {
  toggleSearchModal,
  toggleMobileMenu,
  openQuickView,
  closeQuickView,
  setCurrency,
} = uiSlice.actions;

export default uiSlice.reducer;
