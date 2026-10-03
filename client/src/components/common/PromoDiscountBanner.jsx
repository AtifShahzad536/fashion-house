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
      style={{ backgroundColor: promo.bgColor || '#FAF5F5' }}
      className="relative w-full border-b border-rose-200/80 transition-all duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
          {/* Left / Main Section: Luxury Badge + Text Information */}
          <div className="flex items-center gap-3 sm:gap-4 text-left w-full sm:w-auto">
            {/* Luxury Royal Discount Seal */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] text-white flex flex-col items-center justify-center shadow-md border border-white/80 ring-2 ring-[#991B1B]/20">
                <span className="font-serif font-bold text-xs sm:text-sm leading-none tracking-tight">
                  {promo.discountPercent || 40}%
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest font-semibold mt-0.5 text-rose-100">
                  OFF
                </span>
              </div>
            </div>

            {/* Promotional Headline & Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif text-sm sm:text-base lg:text-lg font-bold tracking-wide text-[#111827] uppercase leading-tight">
                  {promo.title || `FLAT ${promo.discountPercent}% OFF`}
                </h3>
                {promo.targetType === 'occasions' && promo.targetOccasions?.length > 0 && (
                  <span className="inline-block px-2 py-0.5 bg-[#991B1B]/10 text-[#991B1B] text-[9px] sm:text-[10px] font-bold uppercase rounded-[4px]">
                    {promo.targetOccasions.join(', ')}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-600 font-normal leading-snug mt-0.5 line-clamp-2 sm:line-clamp-none">
                {promo.subtitle || `Enjoy ${promo.discountPercent}% off on luxury bridal couture and festive catalog.`}
              </p>
            </div>
          </div>

          {/* Right Action: CTA Button + Close Toggle */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0 pt-1 sm:pt-0 border-t border-rose-200/40 sm:border-t-0">
            <Link
              to={promo.buttonLink || '/shop'}
              className="px-5 sm:px-6 py-2 bg-[#111827] hover:bg-[#991B1B] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
            >
              <span>{promo.buttonText || 'Shop Now'}</span>
              <ArrowRight size={13} />
            </Link>

            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-[4px] hover:bg-black/5 text-gray-400 hover:text-gray-700 transition flex-shrink-0"
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
