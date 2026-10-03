import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeasurements } from '../../redux/slices/customizerSlice.js';
import { Ruler, Info, HelpCircle } from 'lucide-react';
import SizeChartModal from '../shop/SizeChartModal.jsx';

export default function StepMeasurements() {
  const dispatch = useDispatch();
  const { measurements } = useSelector((state) => state.customizer);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const customData = measurements?.customData || {
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
  };

  const handleCustomFieldChange = (field, value) => {
    dispatch(
      updateMeasurements({
        customData: {
          ...customData,
          [field]: value,
        },
      })
    );
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-serif text-lg text-bridal-charcoal font-semibold flex items-center gap-2">
            <Ruler size={18} className="text-bridal-gold" />
            <span>Step 7: Sizing & Made-To-Measure Fitting Profile</span>
          </h3>
          <p className="text-xs text-bridal-mutedText">
            Choose standard ready-to-wear sizing or enter custom body measurements for bespoke atelier tailoring.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsChartOpen(true)}
          className="text-xs text-bridal-gold hover:text-bridal-deepGold font-semibold flex items-center gap-1 hover:underline"
        >
          <Info size={13} />
          <span>Size Chart Guide</span>
        </button>
      </div>

      {/* Choice: Standard vs Custom */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => dispatch(updateMeasurements({ type: 'standard' }))}
          className={`p-4 rounded-card border-2 text-center transition ${
            measurements?.type === 'standard'
              ? 'border-bridal-gold bg-bridal-cream/60 shadow-md font-semibold'
              : 'border-bridal-border bg-white text-bridal-mutedText hover:border-bridal-gold/60'
          }`}
        >
          <span className="text-xs uppercase tracking-wider block">Standard Ready Sizing</span>
          <span className="text-[11px] text-bridal-mutedText mt-0.5 block">Select standard size (XS - XXL)</span>
        </button>

        <button
          type="button"
          onClick={() => dispatch(updateMeasurements({ type: 'custom' }))}
          className={`p-4 rounded-card border-2 text-center transition ${
            measurements?.type === 'custom'
              ? 'border-bridal-gold bg-bridal-cream/60 shadow-md font-semibold'
              : 'border-bridal-border bg-white text-bridal-mutedText hover:border-bridal-gold/60'
          }`}
        >
          <span className="text-xs uppercase tracking-wider text-bridal-deepGold block">
            ✨ Custom Made-to-Measure (Free)
          </span>
          <span className="text-[11px] text-bridal-mutedText mt-0.5 block">Tailored to your exact inch measurements</span>
        </button>
      </div>

      {/* Standard Selector */}
      {measurements?.type === 'standard' ? (
        <div className="p-5 bg-white border border-bridal-border rounded-card space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
            Select Your Standard Size
          </label>
          <div className="grid grid-cols-6 gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => dispatch(updateMeasurements({ standardSize: sz }))}
                className={`py-3 text-xs font-semibold rounded-btn border transition ${
                  measurements.standardSize === sz
                    ? 'bg-bridal-charcoal text-white border-bridal-charcoal shadow-sm'
                    : 'bg-bridal-cream/30 text-bridal-charcoal border-bridal-border hover:border-bridal-gold'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Custom Measurement Form */
        <div className="p-5 bg-white border border-bridal-border rounded-card space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-bridal-border">
            <span className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal">
              Enter Body Measurements in Inches (")
            </span>
            <span className="text-[11px] text-bridal-gold font-medium">All pieces include 2" seam margins</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Full Bust (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.bust || ''}
                onChange={(e) => handleCustomFieldChange('bust', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Under-Bust (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.underBust || ''}
                onChange={(e) => handleCustomFieldChange('underBust', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Waist at Navel (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.waist || ''}
                onChange={(e) => handleCustomFieldChange('waist', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                High Hips (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.hips || ''}
                onChange={(e) => handleCustomFieldChange('hips', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Shoulder Width (Inches)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.shoulder || ''}
                onChange={(e) => handleCustomFieldChange('shoulder', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Armhole Circumference
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.armHole || ''}
                onChange={(e) => handleCustomFieldChange('armHole', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Desired Choli Length
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.choliLength || ''}
                onChange={(e) => handleCustomFieldChange('choliLength', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Lehenga Skirt Length (with heels)
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.lehengaLength || ''}
                onChange={(e) => handleCustomFieldChange('lehengaLength', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-bridal-charcoal block mb-1">
                Sleeve Length
              </label>
              <input
                type="number"
                step="0.5"
                value={customData.sleeveLength || ''}
                onChange={(e) => handleCustomFieldChange('sleeveLength', parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-bridal-charcoal block">
              Special Fitting Instructions or Comfort Notes
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Slightly higher neckline coverage, extra cancan layer, or specific heel height..."
              value={customData.notes || ''}
              onChange={(e) => handleCustomFieldChange('notes', e.target.value)}
              className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs focus:outline-none focus:border-bridal-gold"
            />
          </div>
        </div>
      )}

      <SizeChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </div>
  );
}
