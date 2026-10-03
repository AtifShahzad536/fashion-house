import React from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

export default function SizeChartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const standardSizes = [
    { size: 'XS', bust: '32 - 33', underBust: '27 - 28', waist: '26 - 27', hips: '35 - 36', choliLength: '14', lehengaLength: '42' },
    { size: 'S', bust: '34 - 35', underBust: '29 - 30', waist: '28 - 29', hips: '37 - 38', choliLength: '14.5', lehengaLength: '42' },
    { size: 'M', bust: '36 - 37', underBust: '31 - 32', waist: '30 - 31', hips: '39 - 40', choliLength: '15', lehengaLength: '43' },
    { size: 'L', bust: '38 - 39', underBust: '33 - 34', waist: '32 - 33', hips: '41 - 42', choliLength: '15.5', lehengaLength: '43' },
    { size: 'XL', bust: '40 - 42', underBust: '35 - 36', waist: '34 - 36', hips: '43 - 45', choliLength: '16', lehengaLength: '44' },
    { size: 'XXL', bust: '43 - 45', underBust: '37 - 39', waist: '37 - 39', hips: '46 - 48', choliLength: '16.5', lehengaLength: '44' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bridal-charcoal/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-bridal-border rounded-card shadow-luxury-lg p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-bridal-cream text-bridal-mutedText hover:text-bridal-charcoal transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-bridal-gold">
            <Ruler size={14} />
            <span>Master Atelier Sizing Guide</span>
          </div>
          <h3 className="font-serif text-2xl text-bridal-charcoal font-normal">
            Standard Bridal Measurements (Inches)
          </h3>
          <p className="text-xs text-bridal-mutedText max-w-md mx-auto">
            All bridal pieces include a 2-inch internal seam margin on both sides for effortless local adjustments if needed.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-bridal-border rounded-card mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Bust</th>
                <th className="py-3 px-3">Under-Bust</th>
                <th className="py-3 px-3">Waist</th>
                <th className="py-3 px-3">Hips</th>
                <th className="py-3 px-3">Choli L.</th>
                <th className="py-3 px-3">Skirt L.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
              {standardSizes.map((row) => (
                <tr key={row.size} className="hover:bg-bridal-cream/30 transition">
                  <td className="py-2.5 px-3 font-semibold text-bridal-charcoal bg-bridal-cream/20">
                    {row.size}
                  </td>
                  <td className="py-2.5 px-3">{row.bust}"</td>
                  <td className="py-2.5 px-3">{row.underBust}"</td>
                  <td className="py-2.5 px-3">{row.waist}"</td>
                  <td className="py-2.5 px-3">{row.hips}"</td>
                  <td className="py-2.5 px-3">{row.choliLength}"</td>
                  <td className="py-2.5 px-3">{row.lehengaLength}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Measurement Note */}
        <div className="p-4 bg-bridal-cream/50 border border-bridal-gold/40 rounded-card flex items-start gap-3">
          <Sparkles className="text-bridal-gold w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-semibold text-bridal-charcoal">Need Bespoke Custom Tailoring?</h4>
            <p className="text-bridal-mutedText leading-relaxed">
              You can choose <span className="font-semibold text-bridal-deepGold">"Custom Made-to-Measure"</span> directly in our Customizer Studio to enter your exact body measurements and special height requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
