import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalization } from '../../redux/slices/customizerSlice.js';
import { Heart, Sparkles, Check } from 'lucide-react';

const placementOptions = [
  'Waist Belt Embroidery (Centered)',
  'Dupatta Pallu Corner Embellishment',
  'Internal Muslin Hem Heirloom Label',
];

export default function StepPersonalization() {
  const dispatch = useDispatch();
  const { personalization } = useSelector((state) => state.customizer);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
          <Heart size={18} className="text-bridal-gold" />
          <span>Step 6: Bespoke Personalization & Couple Monogram</span>
        </h3>
        <p className="text-xs text-bridal-mutedText">
          Immortalize your wedding date and names with custom zari calligraphy stitched into your bridal ensemble.
        </p>
      </div>

      {/* Enable Toggle Card */}
      <div
        onClick={() =>
          dispatch(
            updatePersonalization({
              enabled: !personalization?.enabled,
              surcharge: !personalization?.enabled ? 3500 : 0,
            })
          )
        }
        className={`p-5 rounded-card border-2 cursor-pointer transition-all flex items-center justify-between ${
          personalization?.enabled
            ? 'border-bridal-gold bg-bridal-cream/60 shadow-md ring-1 ring-bridal-gold'
            : 'border-bridal-border bg-white hover:border-bridal-gold/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bridal-cream border border-bridal-border flex items-center justify-center text-bridal-gold">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">
              Add Hand-Embroidered Couple Monogram
            </h4>
            <p className="text-[11px] text-bridal-mutedText">
              Embroidered using real metallic gold zari wire in English or Urdu calligraphy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-bridal-deepGold">+PKR 3,500</span>
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              personalization?.enabled
                ? 'bg-bridal-gold border-bridal-gold text-white'
                : 'border-bridal-border'
            }`}
          >
            {personalization?.enabled && <Check size={12} />}
          </div>
        </div>
      </div>

      {/* Text & Placement Inputs if Enabled */}
      {personalization?.enabled && (
        <div className="p-5 bg-white border border-bridal-border rounded-card space-y-4 animate-in fade-in">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
              Enter Inscription / Names & Wedding Date
            </label>
            <input
              type="text"
              placeholder="e.g. Ayesha & Daniyal • 24.12.2026"
              value={personalization.text || ''}
              onChange={(e) => dispatch(updatePersonalization({ text: e.target.value }))}
              className="w-full p-3 bg-bridal-cream/40 border border-bridal-border rounded-input text-xs font-medium text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
            />
            <p className="text-[10px] text-bridal-mutedText">
              Our calligraphy master will send a preview proof via WhatsApp prior to artisan stitching.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
              Monogram Placement
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {placementOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => dispatch(updatePersonalization({ placement: opt }))}
                  className={`p-2.5 text-xs rounded-md border text-left transition ${
                    personalization.placement === opt
                      ? 'bg-bridal-charcoal text-white font-semibold'
                      : 'bg-bridal-cream/40 text-bridal-charcoal border-bridal-border hover:border-bridal-gold'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
