import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Check, RefreshCw, AlertCircle, Percent, ArrowRight, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api.js';

export default function AdminDiscountPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [promotions, setPromotions] = useState([]);

  // Campaign Form State
  const [formData, setFormData] = useState({
    _id: '',
    title: 'FLAT 40% OFF',
    badgeText: '40% OFF',
    subtitle: 'Enjoy Flat 40% Off on Selected Haute Couture & Bridal Pieces',
    discountPercent: 40,
    targetType: 'all', // 'all' or 'occasions'
    targetOccasions: ['Bridal', 'Walima'],
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    isActive: true,
    bgColor: '#FDF2F4',
    textColor: '#111827',
    accentColor: '#991B1B',
  });

  const availableOccasions = [
    'Bridal',
    'Walima',
    'Mehndi',
    'Engagement',
    'Party Wear',
  ];

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/promotions');
      if (data.success && data.data && data.data.length > 0) {
        setPromotions(data.data);
        // Load the first or active promotion into the editor
        const activePromo = data.data.find((p) => p.isActive) || data.data[0];
        setFormData({
          _id: activePromo._id,
          title: activePromo.title,
          badgeText: activePromo.badgeText,
          subtitle: activePromo.subtitle,
          discountPercent: activePromo.discountPercent,
          targetType: activePromo.targetType || 'all',
          targetOccasions: activePromo.targetOccasions || ['Bridal', 'Walima'],
          buttonText: activePromo.buttonText || 'Shop Now',
          buttonLink: activePromo.buttonLink || '/shop',
          isActive: activePromo.isActive,
          bgColor: activePromo.bgColor || '#FDF2F4',
          textColor: activePromo.textColor || '#111827',
          accentColor: activePromo.accentColor || '#991B1B',
        });
      } else {
        // Fallback fetch active
        const activeRes = await api.get('/promotions/active');
        if (activeRes.data.success && activeRes.data.data) {
          const promo = activeRes.data.data;
          setFormData(promo);
          setPromotions([promo]);
        }
      }
    } catch (err) {
      console.error('Error loading promotions:', err);
      toast.error('Failed to load discount campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleOccasionToggle = (occ) => {
    if (formData.targetOccasions.includes(occ)) {
      setFormData({
        ...formData,
        targetOccasions: formData.targetOccasions.filter((o) => o !== occ),
      });
    } else {
      setFormData({
        ...formData,
        targetOccasions: [...formData.targetOccasions, occ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res;
      if (formData._id) {
        res = await api.put(`/promotions/${formData._id}`, formData);
      } else {
        res = await api.post('/promotions', formData);
      }

      if (res.data.success) {
        toast.success(res.data.message || 'Discount applied and synchronized with all matching products!');
        fetchPromotions();
      }
    } catch (err) {
      console.error('Error saving promotion:', err);
      toast.error(err.response?.data?.message || 'Error saving discount campaign');
    } finally {
      setSaving(false);
    }
  };

  const handleResetAllDiscounts = async () => {
    if (!window.confirm('Are you sure you want to remove all sale discounts from all products across the store?')) {
      return;
    }

    try {
      const { data } = await api.post('/promotions/reset-discounts');
      if (data.success) {
        toast.success(data.message);
        // Also update active promo to inactive if desired
        if (formData._id) {
          await api.put(`/promotions/${formData._id}`, { ...formData, isActive: false });
          setFormData((prev) => ({ ...prev, isActive: false }));
        }
        fetchPromotions();
      }
    } catch (err) {
      toast.error('Failed to reset discounts');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="font-serif text-2xl text-[#111827] font-semibold flex items-center gap-2">
            <Percent className="text-[#991B1B]" size={24} />
            <span>Storewide & Category Discount Campaigns</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure promotional discount strips (e.g., Flat 40% Off) and automatically sync sale prices across all products or selected occasions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetAllDiscounts}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-[6px] transition flex items-center gap-1.5"
          >
            <RefreshCw size={13} />
            <span>Reset All Product Discounts</span>
          </button>
        </div>
      </div>

      {/* Live Preview Strip */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#991B1B]" />
          <span>Live Storefront Promotional Strip Preview</span>
        </label>

        <div
          style={{ backgroundColor: formData.bgColor || '#FAF5F5' }}
          className="p-3.5 sm:p-4 rounded-[4px] border border-rose-200 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 text-left w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] text-white flex flex-col items-center justify-center shadow-md border border-white/80 ring-2 ring-[#991B1B]/20 flex-shrink-0">
                <span className="font-serif font-bold text-xs sm:text-sm leading-none">{formData.discountPercent}%</span>
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest font-semibold mt-0.5 text-rose-100">OFF</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#111827] uppercase leading-tight">
                    {formData.title || 'FLAT 40% OFF'}
                  </h3>
                  {formData.targetType === 'occasions' && formData.targetOccasions.length > 0 && (
                    <span className="px-2 py-0.5 bg-[#991B1B]/10 text-[#991B1B] text-[9px] sm:text-[10px] font-bold uppercase rounded-[4px]">
                      {formData.targetOccasions.join(', ')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-gray-600 font-normal mt-0.5">
                  {formData.subtitle || 'Enjoy flat discount on all handcrafted bridal and formal pieces.'}
                </p>
              </div>
            </div>

            <div className="px-5 sm:px-6 py-2 bg-[#111827] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-[4px] shadow-sm flex items-center gap-1.5 pointer-events-none flex-shrink-0">
              <span>{formData.buttonText || 'Shop Now'}</span>
              <ArrowRight size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-[6px] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Campaign Headline / Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. FLAT 40% OFF or FESTIVE WEDDING SALE"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
            />
          </div>

          {/* Badge Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Circular Badge Text *
            </label>
            <input
              type="text"
              required
              value={formData.badgeText}
              onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
              placeholder="e.g. 40% OFF"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
            />
          </div>

          {/* Subtitle */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Campaign Subtitle / Promotion Details *
            </label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Enjoy Flat 40% Off on Selected Bridal, Walima & Mehndi Couture"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
            />
          </div>

          {/* Discount Percentage Slider */}
          <div className="md:col-span-2 p-5 bg-[#F9FAFB] border border-gray-200 rounded-[6px] space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Discount Percentage (%): <span className="text-[#991B1B] text-sm ml-1">{formData.discountPercent}%</span>
              </label>
              <span className="text-[11px] text-gray-500">
                Products will get: <strong className="text-[#111827]">{formData.discountPercent}% off retail price</strong>
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="5"
              value={formData.discountPercent}
              onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#991B1B]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>5% OFF</span>
              <span>25% OFF</span>
              <span>40% OFF</span>
              <span>60% OFF</span>
              <span>80% OFF</span>
            </div>
          </div>

          {/* Target Application Scope */}
          <div className="md:col-span-2 space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#111827] block">
              Apply Discount To:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setFormData({ ...formData, targetType: 'all' })}
                className={`p-4 rounded-[6px] border cursor-pointer flex items-start gap-3 transition ${
                  formData.targetType === 'all'
                    ? 'border-[#991B1B] bg-rose-50/50 ring-1 ring-[#991B1B]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="targetType"
                  checked={formData.targetType === 'all'}
                  onChange={() => setFormData({ ...formData, targetType: 'all' })}
                  className="mt-0.5 accent-[#991B1B]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">All Store Products</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Automatically applies {formData.discountPercent}% discount to every single product in the catalog.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setFormData({ ...formData, targetType: 'occasions' })}
                className={`p-4 rounded-[6px] border cursor-pointer flex items-start gap-3 transition ${
                  formData.targetType === 'occasions'
                    ? 'border-[#991B1B] bg-rose-50/50 ring-1 ring-[#991B1B]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="targetType"
                  checked={formData.targetType === 'occasions'}
                  onChange={() => setFormData({ ...formData, targetType: 'occasions' })}
                  className="mt-0.5 accent-[#991B1B]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">Selected Occasions / Categories Only</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Applies discount strictly to selected occasions (e.g. Bridal or Walima).
                  </p>
                </div>
              </label>
            </div>

            {/* If Occasions Selected */}
            {formData.targetType === 'occasions' && (
              <div className="p-4 bg-[#F9FAFB] border border-gray-200 rounded-[6px] space-y-2 mt-3 animate-in fade-in">
                <span className="text-xs font-semibold text-[#111827] block">Select Applicable Occasions:</span>
                <div className="flex flex-wrap gap-3 pt-1">
                  {availableOccasions.map((occ) => (
                    <label
                      key={occ}
                      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#111827] bg-white px-3 py-1.5 border border-gray-200 rounded-[6px]"
                    >
                      <input
                        type="checkbox"
                        checked={formData.targetOccasions.includes(occ)}
                        onChange={() => handleOccasionToggle(occ)}
                        className="accent-[#991B1B] rounded-[4px]"
                      />
                      <span>{occ}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Button Text & Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Button Text
            </label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Button Redirect Link
            </label>
            <input
              type="text"
              value={formData.buttonLink}
              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
            />
          </div>

          {/* Campaign Active Toggle */}
          <div className="md:col-span-2 pt-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 accent-[#991B1B] rounded-[4px] cursor-pointer"
            />
            <label htmlFor="isActive" className="text-xs font-bold text-[#111827] cursor-pointer select-none">
              Campaign is ACTIVE (Displays banner strip on storefront and applies discounted prices)
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[6px] shadow-md transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <span>Synchronizing Prices...</span>
            ) : (
              <>
                <Check size={14} />
                <span>Save & Apply Discount to Products</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
