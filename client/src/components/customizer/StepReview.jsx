import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, Bookmark, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { addToCart } from '../../redux/slices/cartSlice.js';
import { saveDesignToState } from '../../redux/slices/customizerSlice.js';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

export default function StepReview({ product, onSaveDesign }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customizer = useSelector((state) => state.customizer);
  const { userInfo } = useSelector((state) => state.auth);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const basePrice = product ? (product.salePrice || product.price) : 385000;
  const totalSurcharges = customizer.totalSurcharge || 0;
  const finalPrice = basePrice + totalSurcharges;

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const handleAddToCart = () => {
    const customHash = `custom_${Date.now()}`;
    dispatch(
      addToCart({
        _id: product?._id || 'bespoke_lehenga',
        name: product ? `${product.name} (Bespoke Atelier Commission)` : 'Custom Haute Couture Bridal Lehenga',
        price: basePrice,
        customizationCharge: totalSurcharges,
        image: product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
        size: customizer.measurements.type === 'custom' ? 'Custom Tailored' : customizer.measurements.standardSize,
        qty: 1,
        isCustomized: true,
        customizationId: customHash,
        customizationDetails: {
          design: customizer.design,
          colors: customizer.colors,
          fabric: customizer.fabric,
          embroidery: customizer.embroidery,
          dupatta: customizer.dupatta,
          personalization: customizer.personalization,
          measurements: customizer.measurements,
          customizationCharge: totalSurcharges,
        },
      })
    );
    toast.success('Your customized bespoke bridal piece has been added to your shopping bag!');
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Sparkles size={18} className="text-bridal-gold" />
          <span>Step 8: Review Your Bespoke Commission & Pricing</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Please review your personalized tailoring specifications before commissioning this heirloom masterpiece.
        </p>
      </div>

      {/* Itemized Specifications Box */}
      <div className="bg-white border border-bridal-border rounded-card p-5 space-y-4 shadow-luxury-sm">
        <h4 className="font-serif text-base font-semibold text-bridal-charcoal border-b border-bridal-border pb-2">
          Atelier Specification Sheet
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <p className="text-bridal-mutedText">
              <strong>Base Silhouette:</strong> {customizer.design.lehengaFlair}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Choli & Sleeves:</strong> {customizer.design.choliStyle} • {customizer.design.sleeves}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Fabric Ground:</strong> {customizer.fabric?.name}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Embroidery Work:</strong> {customizer.embroidery?.intensity}
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-bridal-mutedText">
              <strong>Color Palette:</strong> {customizer.colors?.baseColor?.name} & {customizer.colors?.embroideryColor?.name}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Dupatta Drape:</strong> {customizer.dupatta?.style}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Personalization:</strong>{' '}
              {customizer.personalization?.enabled ? customizer.personalization.text : 'None requested'}
            </p>
            <p className="text-bridal-mutedText">
              <strong>Fitting Profile:</strong>{' '}
              {customizer.measurements?.type === 'custom'
                ? `Custom Body Fit (Bust: ${customizer.measurements.customData.bust}", Waist: ${customizer.measurements.customData.waist}")`
                : `Standard Size ${customizer.measurements?.standardSize}`}
            </p>
          </div>
        </div>

        {/* Financial Calculation Breakdown */}
        <div className="pt-4 border-t border-bridal-border space-y-2 text-xs">
          <div className="flex justify-between text-bridal-mutedText">
            <span>Base Couture Ensemble</span>
            <span>{formatPrice(basePrice)}</span>
          </div>
          {customizer.fabric?.surcharge > 0 && (
            <div className="flex justify-between text-bridal-mutedText">
              <span>Fabric Upgrade ({customizer.fabric.name})</span>
              <span>+{formatPrice(customizer.fabric.surcharge)}</span>
            </div>
          )}
          {customizer.embroidery?.surcharge > 0 && (
            <div className="flex justify-between text-bridal-mutedText">
              <span>Embroidery Density ({customizer.embroidery.intensity})</span>
              <span>+{formatPrice(customizer.embroidery.surcharge)}</span>
            </div>
          )}
          {customizer.dupatta?.surcharge > 0 && (
            <div className="flex justify-between text-bridal-mutedText">
              <span>Dupatta Drape Upgrade</span>
              <span>+{formatPrice(customizer.dupatta.surcharge)}</span>
            </div>
          )}
          {customizer.personalization?.enabled && (
            <div className="flex justify-between text-bridal-mutedText">
              <span>Couple Calligraphy Monogram</span>
              <span>+{formatPrice(customizer.personalization.surcharge)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-semibold text-bridal-charcoal pt-2 border-t border-bridal-border">
            <span>Total Bespoke Price</span>
            <span className="text-bridal-deepGold text-base">{formatPrice(finalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-btn shadow-luxury transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          <ShoppingBag size={16} />
          <span>Add Bespoke Lehenga to Bridal Bag & Proceed</span>
        </button>

        <button
          onClick={onSaveDesign}
          className="w-full py-3 bg-white hover:bg-bridal-cream border border-bridal-border text-bridal-charcoal text-xs font-semibold uppercase tracking-wider rounded-btn transition flex items-center justify-center gap-2"
        >
          <Bookmark size={15} className="text-bridal-gold" />
          <span>Save Bespoke Design to My Bridal Account</span>
        </button>
      </div>

      {/* Trust Guarantee */}
      <div className="p-4 bg-bridal-cream/40 border border-bridal-border rounded-card flex items-center justify-between text-xs text-bridal-mutedText">
        <span className="flex items-center gap-1.5">
          <Truck size={14} className="text-bridal-gold" />
          <span>Insured Express Global Dispatch in 4–6 Weeks</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-bridal-gold" />
          <span>100% Fit Guarantee</span>
        </span>
      </div>
    </div>
  );
}
