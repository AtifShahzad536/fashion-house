import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Bookmark,
  Check,
  Eye,
  Sliders,
} from 'lucide-react';
import api from '../services/api.js';
import {
  setCustomizerProduct,
  setActiveStep,
  nextStep,
  prevStep,
  resetCustomizer,
  saveDesignToState,
} from '../redux/slices/customizerSlice.js';

// Steps
import StepDesignCut from '../components/customizer/StepDesignCut.jsx';
import StepColors from '../components/customizer/StepColors.jsx';
import StepFabric from '../components/customizer/StepFabric.jsx';
import StepEmbroidery from '../components/customizer/StepEmbroidery.jsx';
import StepDupatta from '../components/customizer/StepDupatta.jsx';
import StepPersonalization from '../components/customizer/StepPersonalization.jsx';
import StepMeasurements from '../components/customizer/StepMeasurements.jsx';
import StepReview from '../components/customizer/StepReview.jsx';
import CustomizerPreview from '../components/customizer/CustomizerPreview.jsx';
import toast from 'react-hot-toast';

const stepNames = [
  '1. Cut & Ghera',
  '2. Royal Colors',
  '3. Pure Fabric',
  '4. Embroidery',
  '5. Dupatta Veil',
  '6. Monogram',
  '7. Measurements',
  '8. Commission',
];

export default function CustomizerPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState('controls'); // 'controls' | 'preview'

  const customizer = useSelector((state) => state.customizer);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      if (id && id !== 'atelier') {
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.data);
          dispatch(setCustomizerProduct(data.data));
        }
      } else {
        // Default flagship bridal piece
        const { data } = await api.get('/products?limit=1');
        if (data.success && data.products.length > 0) {
          setProduct(data.products[0]);
          dispatch(setCustomizerProduct(data.products[0]));
        }
      }
    } catch (err) {
      console.error('Error fetching customizer product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDesign = async () => {
    if (!userInfo) {
      toast.error('Please sign in to save this bespoke design to your bridal profile!');
      return;
    }

    try {
      const payload = {
        baseProduct: product?._id,
        designTitle: `${product?.name || 'Bridal Lehenga'} - Bespoke Commission`,
        design: customizer.design,
        colors: customizer.colors,
        fabric: customizer.fabric,
        embroidery: customizer.embroidery,
        dupatta: customizer.dupatta,
        personalization: customizer.personalization,
        measurements: customizer.measurements,
        totalSurcharge: customizer.totalSurcharge,
        finalPrice: (product?.salePrice || product?.price || 385000) + customizer.totalSurcharge,
        previewImage: product?.images?.[0]?.url,
      };

      const { data } = await api.post('/customizer/save-design', payload);
      if (data.success) {
        dispatch(saveDesignToState(data.data));
        toast.success('Bespoke design saved to your Atelier Account!');
      }
    } catch (err) {
      console.error('Save design error:', err);
      toast.error('Could not save design. Please try again.');
    }
  };

  const renderActiveStep = () => {
    switch (customizer.activeStep) {
      case 1:
        return <StepDesignCut />;
      case 2:
        return <StepColors />;
      case 3:
        return <StepFabric />;
      case 4:
        return <StepEmbroidery />;
      case 5:
        return <StepDupatta />;
      case 6:
        return <StepPersonalization />;
      case 7:
        return <StepMeasurements />;
      case 8:
        return <StepReview product={product} onSaveDesign={handleSaveDesign} />;
      default:
        return <StepDesignCut />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Interactive 3D Bespoke Lehenga Customizer | ZURIELLE ATELIER</title>
        <meta
          name="description"
          content="Design your dream bridal lehenga with our interactive customizer. Select pure silks, zardozi intensity, dupatta styles, and made-to-measure fitting."
        />
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen pb-24">
        {/* Customizer Studio Header */}
        <div className="bg-bridal-charcoal text-[#FDFBF7] py-6 border-b border-[#2E2A27]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-bridal-gold">
                <Sparkles size={12} />
                <span>Bespoke Couture Studio</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {product ? product.name : 'Royal Bespoke Lehenga Configurator'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  dispatch(resetCustomizer());
                  toast('Customizer options reset to defaults', { icon: '🔄' });
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-btn text-xs font-medium text-white transition"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleSaveDesign}
                className="flex items-center gap-1.5 px-4 py-2 bg-bridal-gold hover:bg-bridal-goldHover text-white rounded-btn text-xs font-semibold uppercase tracking-wider transition shadow-sm"
              >
                <Bookmark size={13} />
                <span>Save Design</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-bridal-cream/60 border-b border-bridal-border overflow-x-auto py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-w-[700px]">
            {stepNames.map((name, idx) => {
              const stepNum = idx + 1;
              const isActive = customizer.activeStep === stepNum;
              const isDone = customizer.activeStep > stepNum;
              return (
                <button
                  key={name}
                  onClick={() => dispatch(setActiveStep(stepNum))}
                  className={`flex items-center gap-2 text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'text-bridal-charcoal font-bold'
                      : isDone
                      ? 'text-bridal-deepGold'
                      : 'text-bridal-mutedText hover:text-bridal-charcoal'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-bridal-charcoal text-white shadow-sm'
                        : isDone
                        ? 'bg-bridal-gold text-white'
                        : 'bg-white border border-bridal-border'
                    }`}
                  >
                    {isDone ? <Check size={12} /> : stepNum}
                  </div>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View Toggle Switcher (Controls vs Live Preview) */}
        <div className="lg:hidden p-3 bg-white border-b border-bridal-border flex justify-center gap-2">
          <button
            onClick={() => setMobileView('controls')}
            className={`flex-1 py-2 text-xs font-semibold rounded-btn border flex items-center justify-center gap-1.5 ${
              mobileView === 'controls'
                ? 'bg-bridal-charcoal text-white border-bridal-charcoal'
                : 'bg-bridal-cream text-bridal-charcoal border-bridal-border'
            }`}
          >
            <Sliders size={13} />
            <span>Customizer Controls (Step {customizer.activeStep}/8)</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-btn border flex items-center justify-center gap-1.5 ${
              mobileView === 'preview'
                ? 'bg-bridal-charcoal text-white border-bridal-charcoal'
                : 'bg-bridal-cream text-bridal-charcoal border-bridal-border'
            }`}
          >
            <Eye size={13} />
            <span>Live Visual Preview</span>
          </button>
        </div>

        {/* Main Split Layout: Left Controls + Right Live Canvas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: 8-Step Wizard Content (7 Cols) */}
            <div className={`lg:col-span-7 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white border border-bridal-border rounded-card p-6 sm:p-8 shadow-luxury-sm space-y-8">
                {/* Step Content */}
                {renderActiveStep()}

                {/* Bottom Wizard Navigation Buttons */}
                <div className="pt-6 border-t border-bridal-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => dispatch(prevStep())}
                    disabled={customizer.activeStep === 1}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-bridal-cream border border-bridal-border text-bridal-charcoal text-xs font-semibold uppercase tracking-wider rounded-btn disabled:opacity-30 transition"
                  >
                    <ArrowLeft size={14} />
                    <span>Previous Step</span>
                  </button>

                  <span className="text-xs text-bridal-mutedText font-mono">
                    Step {customizer.activeStep} of 8
                  </span>

                  {customizer.activeStep < 8 ? (
                    <button
                      type="button"
                      onClick={() => dispatch(nextStep())}
                      className="flex items-center gap-1.5 px-6 py-2.5 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition"
                    >
                      <span>Next Step</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => dispatch(setActiveStep(1))}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-bridal-cream border border-bridal-border text-bridal-charcoal text-xs font-semibold uppercase tracking-wider rounded-btn hover:bg-bridal-sand transition"
                    >
                      <span>Edit From Step 1</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Live Visual Preview & Dynamic Price Ticker (5 Cols) */}
            <div className={`lg:col-span-5 ${mobileView === 'controls' ? 'hidden lg:block' : 'block'}`}>
              <CustomizerPreview product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
