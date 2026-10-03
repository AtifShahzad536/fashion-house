import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmbroidery } from '../../redux/slices/customizerSlice.js';
import { Sparkles, Check } from 'lucide-react';

const embroideryStyles = [
  {
    intensity: 'Imperial Heavy Zardozi & Dabka',
    style: 'Dabka, Naqshi, Real Cut-Glass Sequins & French Knots',
    surcharge: 25000,
    hours: '350+ Hours Handcrafted',
    desc: 'Dense full-coverage Mughal jaal with 3D raised floral motifs and heirloom gold bullion on all 24 kalis.',
    tag: 'Bridal Barat Choice',
  },
  {
    intensity: 'Refined Medium Resham & Gotapatti',
    style: 'Silk Resham Jaal, Delicate Gotapatti & Sequins',
    surcharge: 15000,
    hours: '200+ Hours Handcrafted',
    desc: 'Balanced floral vines with colorful resham threadwork, antique marodi borders, and gilded leaf gota work.',
    tag: 'Walima & Mehndi',
  },
  {
    intensity: 'Minimalist Starlight & Mirror Sparkle',
    style: 'Micro Mirrors, Cutdana & Fine Antique Wire',
    surcharge: 9000,
    hours: '120+ Hours Handcrafted',
    desc: 'Contemporary modern scattering of crystals and micro mirrors for brides seeking lightweight fluidity.',
    tag: 'Contemporary Chic',
  },
];

export default function StepEmbroidery() {
  const dispatch = useDispatch();
  const { embroidery } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Sparkles size={18} className="text-bridal-gold" />
          <span>Step 4: Artisanal Hand-Embroidery Intensity</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Select the density of handwork, gold bullion weight, and craftsmanship technique for your bridal skirt.
        </p>
      </div>

      <div className="space-y-3.5">
        {embroideryStyles.map((item) => {
          const isSelected = embroidery?.intensity === item.intensity;
          return (
            <div
              key={item.intensity}
              onClick={() => dispatch(updateEmbroidery(item))}
              className={`p-5 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-bridal-gold bg-bridal-cream/60 shadow-md ring-1 ring-bridal-gold'
                  : 'border-bridal-border bg-white hover:border-bridal-gold/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">{item.intensity}</h4>
                    <span className="px-2 py-0.5 bg-bridal-gold/15 text-bridal-deepGold text-[10px] font-semibold rounded">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-bridal-gold font-medium mt-0.5">{item.style} • {item.hours}</p>
                  <p className="text-[11px] text-bridal-mutedText mt-1.5 leading-relaxed">{item.desc}</p>
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
                <span className="text-bridal-mutedText">Handcrafting Surcharge</span>
                <span className="font-semibold text-bridal-deepGold">+PKR {item.surcharge.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
