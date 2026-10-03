import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateColors } from '../../redux/slices/customizerSlice.js';
import { Palette, Check } from 'lucide-react';

const baseColors = [
  { name: 'Royal Crimson Red', hex: '#991B1B', surcharge: 0 },
  { name: 'Deep Maroon Wine', hex: '#4A0E17', surcharge: 0 },
  { name: 'Imperial Rose Bordeaux', hex: '#881337', surcharge: 0 },
  { name: 'Rich Emerald Green', hex: '#0B6623', surcharge: 0 },
  { name: 'Saffron Sunshine Amber', hex: '#E6A100', surcharge: 0 },
  { name: 'Dusty Rose Pastel', hex: '#C99E94', surcharge: 0 },
  { name: 'Ivory Pearl White', hex: '#FDFBF7', surcharge: 0 },
  { name: 'Midnight Navy Blue', hex: '#0A192F', surcharge: 0 },
];

const embroideryTints = [
  { name: 'Royal Silver & Pearl Bullion', hex: '#E2E8F0', surcharge: 0 },
  { name: 'Deep Velvet Crimson Zari', hex: '#991B1B', surcharge: 0 },
  { name: 'Dull Copper Antique Marodi', hex: '#B87333', surcharge: 0 },
  { name: 'Vintage Rose Metallic', hex: '#B76E79', surcharge: 0 },
];

const dupattaColors = [
  { name: 'Tone-on-Tone (Matching Base)', hex: 'matching', surcharge: 0 },
  { name: 'Soft Peach Blush Contrast', hex: '#FFDAB9', surcharge: 1500 },
  { name: 'Pistachio Mint Contrast', hex: '#98FF98', surcharge: 1500 },
  { name: 'Rani Hot Pink Contrast', hex: '#FF1493', surcharge: 1500 },
  { name: 'Icy Silver Tulle Contrast', hex: '#F0F8FF', surcharge: 1500 },
];

export default function StepColors() {
  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Palette size={18} className="text-bridal-gold" />
          <span>Step 2: Royal Color Swatches & Contrast Harmonization</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Select master dye tones for the base lehenga, metallic embroidery wire, and secondary dupatta veil.
        </p>
      </div>

      {/* 1. Base Silk Color */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal">
            A. Base Fabric Color
          </label>
          <span className="text-xs font-semibold text-bridal-deepGold">
            Selected: {colors.baseColor?.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {baseColors.map((col) => {
            const isSelected = colors.baseColor?.name === col.name;
            return (
              <div
                key={col.name}
                onClick={() => dispatch(updateColors({ baseColor: col }))}
                className={`p-2.5 rounded-card border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <span
                  style={{ backgroundColor: col.hex }}
                  className="w-6 h-6 rounded-full border border-black/20 flex-shrink-0 flex items-center justify-center shadow-inner"
                >
                  {isSelected && (
                    <Check
                      size={12}
                      className={col.name.includes('Ivory') ? 'text-black' : 'text-white'}
                    />
                  )}
                </span>
                <span className="text-[11px] font-medium text-bridal-charcoal truncate">
                  {col.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Zari & Embroidery Wire Tint */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal">
            B. Zari & Hand-Embroidery Thread Metallic Tint
          </label>
          <span className="text-xs font-semibold text-bridal-deepGold">
            {colors.embroideryColor?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {embroideryTints.map((col) => {
            const isSelected = colors.embroideryColor?.name === col.name;
            return (
              <div
                key={col.name}
                onClick={() => dispatch(updateColors({ embroideryColor: col }))}
                className={`p-3 rounded-card border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    style={{ backgroundColor: col.hex }}
                    className="w-6 h-6 rounded-full border border-black/20 flex-shrink-0 flex items-center justify-center"
                  >
                    {isSelected && <Check size={12} className="text-black" />}
                  </span>
                  <span className="text-xs font-medium text-bridal-charcoal">{col.name}</span>
                </div>
                <span className="text-[11px] text-bridal-mutedText">Included</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dupatta Contrast Drape */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal">
            C. Bridal Dupatta Color Harmony
          </label>
          <span className="text-xs font-semibold text-bridal-deepGold">
            {colors.dupattaColor?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {dupattaColors.map((col) => {
            const isSelected = colors.dupattaColor?.name === col.name;
            return (
              <div
                key={col.name}
                onClick={() => dispatch(updateColors({ dupattaColor: col }))}
                className={`p-3 rounded-card border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    style={{
                      backgroundColor: col.hex === 'matching' ? colors.baseColor?.hex || '#8B0000' : col.hex,
                    }}
                    className="w-6 h-6 rounded-full border border-black/20 flex-shrink-0 flex items-center justify-center"
                  >
                    {isSelected && <Check size={12} className="text-white" />}
                  </span>
                  <span className="text-xs font-medium text-bridal-charcoal">{col.name}</span>
                </div>
                <span className="text-[11px] font-semibold text-bridal-deepGold">
                  {col.surcharge === 0 ? 'Included' : `+PKR ${col.surcharge.toLocaleString()}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
