import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDupatta } from '../../redux/slices/customizerSlice.js';
import { Layers, Check } from 'lucide-react';

const dupattaStyles = [
  {
    style: 'Signature Single Dupatta (2.75m)',
    surcharge: 0,
    borderWidth: '2.5-inch Scalloped Zardozi Border',
    desc: 'One broad border dupatta draped over the shoulder or head, perfect for lightweight ease.',
  },
  {
    style: 'Double Bridal Dupatta (Head Drape + Velvet Shoulder Shawl)',
    surcharge: 14000,
    borderWidth: 'Broad 4-inch Scalloped Border with Pearl Drops',
    desc: 'Includes an airy sheer organza head veil + a heavily worked second shoulder dupatta for the full royal Maharani look.',
    tag: 'Flagship Bridal Trend',
  },
];

const borderOptions = [
  'Broad 4-inch Handworked Scalloped Border',
  'Classic 2.5-inch Geometric Architectural Border',
  'Delicate 1.5-inch Pearl & Kiran Tassel Edge',
];

export default function StepDupatta() {
  const dispatch = useDispatch();
  const { dupatta } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Layers size={18} className="text-bridal-gold" />
          <span>Step 5: Bridal Dupatta Configuration & Veil Draping</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Choose single drape convenience or double dupatta splendor (sheer head veil + heavy shoulder drape).
        </p>
      </div>

      {/* 1. Dupatta Style */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          A. Dupatta Ensemble Count
        </label>
        <div className="space-y-3">
          {dupattaStyles.map((item) => {
            const isSelected = dupatta?.style === item.style;
            return (
              <div
                key={item.style}
                onClick={() => dispatch(updateDupatta({ ...dupatta, style: item.style, surcharge: item.surcharge }))}
                className={`p-4 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-md ring-1 ring-bridal-gold'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">{item.style}</h4>
                      {item.tag && (
                        <span className="px-2 py-0.5 bg-bridal-gold/15 text-bridal-deepGold text-[10px] font-semibold rounded">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-bridal-mutedText mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 ml-3 flex items-center justify-center ${
                      isSelected ? 'bg-bridal-gold border-bridal-gold text-white' : 'border-bridal-border'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-bridal-border/70 flex items-center justify-between text-xs">
                  <span className="text-bridal-mutedText">Drape Option Surcharge</span>
                  <span className="font-semibold text-bridal-deepGold">
                    {item.surcharge === 0 ? 'Included' : `+PKR ${item.surcharge.toLocaleString()}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Border Width Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          B. Scalloped Dupatta Border Design
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {borderOptions.map((opt) => {
            const isSelected = dupatta?.borderWidth === opt;
            return (
              <div
                key={opt}
                onClick={() => dispatch(updateDupatta({ ...dupatta, borderWidth: opt }))}
                className={`p-3 rounded-card border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <span className="text-xs font-medium text-bridal-charcoal">{opt}</span>
                {isSelected && <Check size={12} className="text-bridal-gold" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
