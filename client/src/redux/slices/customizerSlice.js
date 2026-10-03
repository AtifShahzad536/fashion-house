import { createSlice } from '@reduxjs/toolkit';

const initialCustomizerState = {
  activeStep: 1, // 1: Design, 2: Colors, 3: Fabric, 4: Embroidery, 5: Dupatta, 6: Personalization, 7: Measurements, 8: Review
  selectedProduct: null,
  
  // Customization Configuration
  design: {
    lehengaFlair: 'Royal Kalidar (24 Kalis)',
    choliStyle: 'Classic Sweetheart',
    neckline: 'Deep Royal Sweetheart',
    sleeves: 'Elbow Length',
    backDesign: 'Deep V-Tassels',
  },
  colors: {
    baseColor: { name: 'Deep Crimson Red', hex: '#8B0000', surcharge: 0 },
    embroideryColor: { name: 'Royal Silver & Pearl Bullion', hex: '#E2E8F0', surcharge: 0 },
    borderColor: { name: 'Deep Velvet Crimson', hex: '#991B1B', surcharge: 0 },
    dupattaColor: { name: 'Soft Peach Blush Contrast', hex: '#FFDAB9', surcharge: 1500 },
  },
  fabric: {
    name: 'Pure Raw Silk (80g)',
    surcharge: 8000,
    description: 'Structured rich lustrous silk with heavy drape, perfect for majestic bridal flares.',
  },
  embroidery: {
    intensity: 'Royal Heavy Zardozi',
    style: 'Dabka, Naqshi, Sequins & French Knots',
    surcharge: 25000,
  },
  dupatta: {
    style: 'Double Bridal Dupatta (Head Drape + Shoulder Veil)',
    surcharge: 12000,
    borderWidth: 'Broad 4-inch Handworked Scalloped Border',
  },
  personalization: {
    enabled: false,
    text: '',
    placement: 'Waist Belt Embroidery',
    surcharge: 3000,
  },
  measurements: {
    type: 'custom', // 'standard' or 'custom'
    standardSize: 'M',
    customData: {
      bust: 36,
      underBust: 31,
      waist: 30,
      hips: 40,
      shoulder: 14.5,
      armHole: 16,
      sleeveLength: 12,
      lehengaLength: 42,
      choliLength: 15,
      notes: '',
    },
  },
  totalSurcharge: 46500,
  savedDesigns: [],
};

const calculateCustomizerSurcharges = (state) => {
  let surcharge = 0;
  if (state.colors?.dupattaColor?.surcharge) surcharge += state.colors.dupattaColor.surcharge;
  if (state.fabric?.surcharge) surcharge += state.fabric.surcharge;
  if (state.embroidery?.surcharge) surcharge += state.embroidery.surcharge;
  if (state.dupatta?.surcharge) surcharge += state.dupatta.surcharge;
  if (state.personalization?.enabled && state.personalization?.surcharge) surcharge += state.personalization.surcharge;
  state.totalSurcharge = surcharge;
};

const customizerSlice = createSlice({
  name: 'customizer',
  initialState: initialCustomizerState,
  reducers: {
    setCustomizerProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    nextStep: (state) => {
      if (state.activeStep < 8) state.activeStep += 1;
    },
    prevStep: (state) => {
      if (state.activeStep > 1) state.activeStep -= 1;
    },
    updateDesign: (state, action) => {
      state.design = { ...state.design, ...action.payload };
    },
    updateColors: (state, action) => {
      state.colors = { ...state.colors, ...action.payload };
      calculateCustomizerSurcharges(state);
    },
    updateFabric: (state, action) => {
      state.fabric = action.payload;
      calculateCustomizerSurcharges(state);
    },
    updateEmbroidery: (state, action) => {
      state.embroidery = action.payload;
      calculateCustomizerSurcharges(state);
    },
    updateDupatta: (state, action) => {
      state.dupatta = action.payload;
      calculateCustomizerSurcharges(state);
    },
    updatePersonalization: (state, action) => {
      state.personalization = { ...state.personalization, ...action.payload };
      calculateCustomizerSurcharges(state);
    },
    updateMeasurements: (state, action) => {
      state.measurements = { ...state.measurements, ...action.payload };
    },
    resetCustomizer: (state) => {
      const product = state.selectedProduct;
      Object.assign(state, initialCustomizerState);
      state.selectedProduct = product;
    },
    saveDesignToState: (state, action) => {
      state.savedDesigns.push(action.payload);
    }
  },
});

export const {
  setCustomizerProduct,
  setActiveStep,
  nextStep,
  prevStep,
  updateDesign,
  updateColors,
  updateFabric,
  updateEmbroidery,
  updateDupatta,
  updatePersonalization,
  updateMeasurements,
  resetCustomizer,
  saveDesignToState,
} = customizerSlice.actions;

export default customizerSlice.reducer;
