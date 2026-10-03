import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFabric } from '../../redux/slices/customizerSlice.js';
import { Gem, Check } from 'lucide-react';

const fabrics = [
  {
    name: 'Pure Raw Silk (80g Heavy)',
    surcharge: 8000,
    description: 'Structured rich lustrous silk with heavy drape, giving majestic architecture to 24-kali flared skirts.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    tag: 'Recommended for Barat',
  },
  {
    name: 'Italian Micro Velvet (9000-Grade)',
    surcharge: 12000,
    description: 'Ultra-luxurious dense micro-velvet with deep jewel luster, supple warmth, and supreme zardozi support.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=400&q=80',
    tag: 'Winter Royalty',
  },
  {
    name: 'Handspun Tissue Organza',
    surcharge: 6000,
    description: 'Airy shimmering metallic sheen fabric creating dreamy lightness and ethereal volume for receptions.',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=400&q=80',
    tag: 'Walima Favorite',
  },
  {
    name: 'French Chantilly Tulle Net',
    surcharge: 5000,
    description: 'Soft imported tulle net ideal for transparent sheer sleeves, layered skirts, and cascading head veils.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    tag: 'Ethereal Veil',
  },
];

export default function StepFabric() {
  const dispatch = useDispatch();
  const { fabric } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Gem size={18} className="text-bridal-gold" />
          <span>Step 3: Certified Pure Fabric Ground</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Choose from certified pure raw silks, royal Italian micro-velvet, or metallic organza.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fabrics.map((item) => {
          const isSelected = fabric?.name === item.name;
          return (
            <div
              key={item.name}
              onClick={() => dispatch(updateFabric(item))}
              className={`p-4 rounded-card border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-bridal-gold bg-bridal-cream/60 shadow-md ring-1 ring-bridal-gold'
                  : 'border-bridal-border bg-white hover:border-bridal-gold/60'
              }`}
            >
              <div className="space-y-3">
                <div className="aspect-[16/9] w-full rounded-md overflow-hidden bg-bridal-sand relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.tag && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-bridal-charcoal/80 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium">
                      {item.tag}
                    </span>
                  )}
                  <div
                    className={`absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-bridal-gold border-bridal-gold text-white' : 'bg-white/80 border-bridal-border'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">{item.name}</h4>
                  <p className="text-[11px] text-bridal-mutedText leading-relaxed mt-1">{item.description}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-bridal-border/70 flex items-center justify-between">
                <span className="text-[10px] text-bridal-mutedText uppercase tracking-wider font-medium">
                  Atelier Surcharge
                </span>
                <span className="text-xs font-semibold text-bridal-deepGold">
                  +PKR {item.surcharge.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
