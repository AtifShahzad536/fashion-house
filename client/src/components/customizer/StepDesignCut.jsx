import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDesign } from '../../redux/slices/customizerSlice.js';
import { Scissors, Sparkles, Check } from 'lucide-react';

const gheraOptions = [
  {
    id: 'Royal 24-Kali Flared Ghera',
    name: 'Royal 24-Kali Flared Ghera',
    surcharge: 0,
    desc: 'Sweeping 6-meter circumference with internal multi-tiered structured cancan for maximum royal flare.',
    tag: 'Atelier Signature',
  },
  {
    id: 'Maharani Box-Pleated Ghera',
    name: 'Maharani Box-Pleated Ghera',
    surcharge: 5000,
    desc: 'Traditional architectural box pleats at the waist with structured horsehair hemline drape.',
    tag: 'Royal Heritage',
  },
  {
    id: 'Paneled Mermaid Fluted Cut',
    name: 'Paneled Mermaid Fluted Cut',
    surcharge: 4000,
    desc: 'Sculpted fit at the hips gently cascading into an elongated flared bridal floor train.',
    tag: 'Modern Couture',
  },
];

const choliOptions = [
  {
    id: 'Classic Sweetheart Choli',
    name: 'Classic Sweetheart Choli',
    surcharge: 0,
    desc: 'Flattering royal sweetheart neckline with built-in padded cups and side zipper closure.',
  },
  {
    id: 'Corset Structured Peplum Blouse',
    name: 'Corset Structured Peplum Blouse',
    surcharge: 7000,
    desc: 'Internal boning reinforcement with delicate scalloped waist peplum detailing.',
  },
  {
    id: 'Angrakha Wrap Royal Blouse',
    name: 'Angrakha Wrap Royal Blouse',
    surcharge: 6000,
    desc: 'Regal overlapping crossover silhouette with gold cord tie-ups and pearl tassel drops.',
  },
];

const sleeveOptions = [
  {
    id: 'Elbow-Length Fitted Sleeves',
    name: 'Elbow-Length Fitted Sleeves (11")',
    surcharge: 0,
    desc: 'Classic royal cut finished with a 2.5-inch embellished cuff border.',
  },
  {
    id: 'Full Sheer Embellished Sleeves',
    name: 'Full Sheer Embellished Sleeves (22")',
    surcharge: 4500,
    desc: 'Intricate zardozi climber motifs crafted on transparent sheer illusion net.',
  },
  {
    id: 'Cap Sleeves with Tassel Drops',
    name: 'Cap Sleeves with Tassel Drops (5")',
    surcharge: 3000,
    desc: 'Contemporary modern cap sleeve finished with delicate micro-pearl droplet tassels.',
  },
];

export default function StepDesignCut() {
  const dispatch = useDispatch();
  const { design } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Scissors size={18} className="text-bridal-gold" />
          <span>Step 1: Choose Silhouette & Cut Architecture</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Select the base structural silhouettes for your lehenga skirt, choli blouse, and sleeves.
        </p>
      </div>

      {/* 1. Lehenga Ghera (Skirt Cut) */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          A. Lehenga Skirt Ghera & Flare
        </label>
        <div className="space-y-2.5">
          {gheraOptions.map((opt) => {
            const isSelected = design.lehengaFlair === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => dispatch(updateDesign({ lehengaFlair: opt.id }))}
                className={`p-4 rounded-card border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-md'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-bridal-charcoal">{opt.name}</span>
                    {opt.tag && (
                      <span className="px-2 py-0.5 bg-bridal-gold/15 text-bridal-deepGold text-[10px] font-semibold rounded">
                        {opt.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-bridal-charcoal">
                      {opt.surcharge === 0 ? 'Included' : `+PKR ${opt.surcharge.toLocaleString()}`}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-bridal-gold border-bridal-gold text-white' : 'border-bridal-border'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-bridal-mutedText mt-1 leading-relaxed">{opt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Choli Silhouette */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          B. Choli Blouse Silhouette
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {choliOptions.map((opt) => {
            const isSelected = design.choliStyle === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => dispatch(updateDesign({ choliStyle: opt.id }))}
                className={`p-3.5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-md'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-bridal-charcoal">{opt.name}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-bridal-gold border-bridal-gold text-white' : 'border-bridal-border'
                      }`}
                    >
                      {isSelected && <Check size={10} />}
                    </div>
                  </div>
                  <p className="text-[11px] text-bridal-mutedText leading-relaxed">{opt.desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-bridal-deepGold mt-2 block">
                  {opt.surcharge === 0 ? 'Included' : `+PKR ${opt.surcharge.toLocaleString()}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Sleeves Architecture */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          C. Sleeves Architecture & Length
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sleeveOptions.map((opt) => {
            const isSelected = design.sleeves === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => dispatch(updateDesign({ sleeves: opt.id }))}
                className={`p-3.5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-bridal-gold bg-bridal-cream/60 shadow-md'
                    : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-bridal-charcoal">{opt.name}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-bridal-gold border-bridal-gold text-white' : 'border-bridal-border'
                      }`}
                    >
                      {isSelected && <Check size={10} />}
                    </div>
                  </div>
                  <p className="text-[11px] text-bridal-mutedText leading-relaxed">{opt.desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-bridal-deepGold mt-2 block">
                  {opt.surcharge === 0 ? 'Included' : `+PKR ${opt.surcharge.toLocaleString()}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
