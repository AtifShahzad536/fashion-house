import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import api from '../../services/api.js';

export default function PromoDiscountBanner() {
  const [promo, setPromo] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivePromo = async () => {
      try {
        const { data } = await api.get('/promotions/active');
        if (data.success && data.data && data.data.isActive) {
          setPromo(data.data);
        }
      } catch (err) {
        console.error('Error fetching promo banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePromo();
  }, []);

  if (dismissed || !promo || !promo.isActive) return null;

  return (
    <div
      style={{ backgroundColor: promo.bgColor || '#FDF2F4' }}
      className="relative w-full border-b border-rose-200/80 transition-all duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left / Center Section: Circular Badge + Text Information */}
          <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
            {/* Circular Discount Badge (like Anaya Designer Studio reference) */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#991B1B] bg-white flex-shrink-0 flex flex-col items-center justify-center text-[#991B1B] font-bold text-[11px] sm:text-xs leading-none shadow-sm">
              <span className="font-black tracking-tight">{promo.discountPercent || 40}%</span>
              <span className="text-[9px] uppercase tracking-wider mt-0.5 font-semibold">OFF</span>
            </div>

            {/* Promotional Headline & Details */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-wide text-[#111827] uppercase">
                  {promo.title || `FLAT ${promo.discountPercent}% OFF`}
                </h3>
                {promo.targetType === 'occasions' && promo.targetOccasions?.length > 0 && (
                  <span className="hidden md:inline-block px-2 py-0.5 bg-[#991B1B]/10 text-[#991B1B] text-[10px] font-bold uppercase rounded-[4px]">
                    {promo.targetOccasions.join(', ')}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {promo.subtitle || `Enjoy ${promo.discountPercent}% off on luxury bridal couture and festive catalog.`}
              </p>
            </div>
          </div>

          {/* Right Action: CTA Button + Close Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
            <Link
              to={promo.buttonLink || '/shop'}
              className="px-6 sm:px-7 py-2.5 bg-[#991B1B] hover:bg-[#7f1d1d] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-[6px] shadow-md transition transform hover:-translate-y-0.5 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <span>{promo.buttonText || 'Shop Now'}</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-700 transition"
              title="Dismiss promotion"
              aria-label="Dismiss promotion"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
