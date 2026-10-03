import React from 'react';
import { useSelector } from 'react-redux';
import { Sparkles, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CustomizerPreview({ product }) {
  const customizer = useSelector((state) => state.customizer);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const basePrice = product ? (product.salePrice || product.price) : 385000;
  const totalSurcharges = customizer.totalSurcharge || 0;
  const finalPrice = basePrice + totalSurcharges;

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const currentImg = product?.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="sticky top-28 bg-white border border-bridal-border rounded-card shadow-luxury-lg overflow-hidden flex flex-col justify-between select-none">
      {/* Visual Canvas Area */}
      <div className="relative aspect-[3/4] w-full bg-bridal-cream overflow-hidden">
        <img
          src={currentImg}
          alt={product?.name || 'Custom Lehenga Preview'}
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />

        {/* Dynamic Color Palette Swatch Pill Overlay */}
        <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md border border-bridal-border rounded-card shadow-md flex items-center gap-2">
          <div className="flex -space-x-1.5 overflow-hidden">
            <span
              style={{ backgroundColor: customizer.colors?.baseColor?.hex || '#8B0000' }}
              className="w-5 h-5 rounded-full border border-white shadow-sm inline-block"
              title={`Base: ${customizer.colors?.baseColor?.name}`}
            />
            <span
              style={{ backgroundColor: customizer.colors?.embroideryColor?.hex || '#E2E8F0' }}
              className="w-5 h-5 rounded-full border border-white shadow-sm inline-block"
              title={`Embroidery: ${customizer.colors?.embroideryColor?.name}`}
            />
            {customizer.colors?.dupattaColor?.hex !== 'matching' && (
              <span
                style={{ backgroundColor: customizer.colors?.dupattaColor?.hex || '#FFDAB9' }}
                className="w-5 h-5 rounded-full border border-white shadow-sm inline-block"
                title={`Dupatta: ${customizer.colors?.dupattaColor?.name}`}
              />
            )}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-bridal-charcoal">
            {customizer.colors?.baseColor?.name}
          </span>
        </div>

        {/* Selected Specifications Floating Badges */}
        <div className="absolute bottom-4 inset-x-4 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 bg-bridal-charcoal/85 backdrop-blur-md text-white text-[10px] font-medium rounded-sm">
            {customizer.design?.lehengaFlair}
          </span>
          <span className="px-2.5 py-1 bg-bridal-charcoal/85 backdrop-blur-md text-white text-[10px] font-medium rounded-sm">
            {customizer.fabric?.name}
          </span>
          <span className="px-2.5 py-1 bg-bridal-gold/95 backdrop-blur-md text-white text-[10px] font-bold rounded-sm">
            {customizer.embroidery?.intensity}
          </span>
          {customizer.personalization?.enabled && (
            <span className="px-2.5 py-1 bg-bridal-deepGold backdrop-blur-md text-white text-[10px] font-bold rounded-sm flex items-center gap-1">
              <Sparkles size={10} /> Monogram Active
            </span>
          )}
        </div>
      </div>

      {/* Live Financial Calculation Ticker */}
      <div className="p-5 bg-bridal-cream/60 border-t border-bridal-border space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
              Bespoke Total Configuration
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-bridal-charcoal">
                {formatPrice(finalPrice)}
              </span>
              {totalSurcharges > 0 && (
                <span className="text-xs text-bridal-mutedText">
                  (Includes +{formatPrice(totalSurcharges)} custom tailoring upgrades)
                </span>
              )}
            </div>
          </div>

          <div className="text-right text-[11px] text-bridal-mutedText">
            <span>Standard Delivery</span>
            <span className="block font-semibold text-bridal-charcoal">4–6 Weeks</span>
          </div>
        </div>

        <div className="pt-2 border-t border-bridal-border/70 flex items-center justify-between text-[11px] text-bridal-mutedText">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-green-600" />
            <span>Master Atelier Verification</span>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-bridal-gold" />
            <span>100% Fit Guarantee</span>
          </span>
        </div>
      </div>
    </div>
  );
}
