import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tag, Plus, Trash2, Sparkles, Image as ImageIcon, Save, Check } from 'lucide-react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

export default function AdminCMSPage() {
  const [slides, setSlides] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Coupon Form
  const [newCode, setNewCode] = useState('');
  const [newPercent, setNewPercent] = useState(10);
  const [newMin, setNewMin] = useState(100000);

  useEffect(() => {
    fetchCMSData();
  }, []);

  const fetchCMSData = async () => {
    setLoading(true);
    try {
      const [slidesRes, couponsRes] = await Promise.all([
        api.get('/cms/hero-slides'),
        api.get('/cms/coupons'),
      ]);

      if (slidesRes.data.success) setSlides(slidesRes.data.data || []);
      if (couponsRes.data.success) setCoupons(couponsRes.data.data || []);
    } catch (err) {
      console.error('Error fetching CMS data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    try {
      const payload = {
        code: newCode.toUpperCase(),
        discountPercent: Number(newPercent),
        minPurchase: Number(newMin),
        expiryDate: new Date('2028-12-31'),
        isActive: true,
      };

      const { data } = await api.post('/cms/coupons', payload);
      if (data.success) {
        toast.success(`Coupon ${payload.code} created!`);
        setCoupons([data.data, ...coupons]);
        setNewCode('');
      }
    } catch (err) {
      toast.error('Failed to create coupon.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Homepage CMS & Promotional Coupons | ZURIELLE ADMIN</title>
      </Helmet>

      <div className="space-y-8 select-none max-w-6xl">
        {/* Header */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
            Content Management System
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-semibold">
            Homepage Hero Slides & Promotional Vouchers
          </h1>
        </div>

        {/* 1. Hero Slides CMS Section */}
        <div className="bg-white border border-bridal-border rounded-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-bridal-border pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon size={18} className="text-bridal-gold" />
              <h3 className="font-serif text-base font-semibold text-bridal-charcoal">
                Active Homepage Hero Slides ({slides.length})
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {slides.map((slide, idx) => (
              <div
                key={slide._id || idx}
                className="p-4 bg-bridal-cream/30 border border-bridal-border rounded-card flex flex-col sm:flex-row gap-4 items-center"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full sm:w-36 aspect-[16/9] object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 space-y-1 text-xs text-center sm:text-left">
                  <span className="text-[10px] text-bridal-gold font-bold uppercase tracking-wider block">
                    {slide.eyebrow}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">{slide.title}</h4>
                  <p className="text-bridal-mutedText line-clamp-2">{slide.subtitle}</p>
                </div>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-200">
                  Active in Hero
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Coupons Manager Section */}
        <div className="bg-white border border-bridal-border rounded-card p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-bridal-border pb-3">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-bridal-gold" />
              <h3 className="font-serif text-base font-semibold text-bridal-charcoal">
                Vouchers & Promotional Discount Codes
              </h3>
            </div>
          </div>

          {/* New Coupon Creation Form */}
          <form onSubmit={handleCreateCoupon} className="p-4 bg-bridal-cream/40 border border-bridal-border rounded-card grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-end">
            <div>
              <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Coupon Code</label>
              <input
                type="text"
                placeholder="e.g. VIP20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className="w-full p-2.5 bg-white border border-bridal-border rounded-input font-mono uppercase font-bold"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Discount %</label>
              <input
                type="number"
                min="1"
                max="90"
                value={newPercent}
                onChange={(e) => setNewPercent(e.target.value)}
                className="w-full p-2.5 bg-white border border-bridal-border rounded-input"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Min Order (PKR)</label>
              <input
                type="number"
                value={newMin}
                onChange={(e) => setNewMin(e.target.value)}
                className="w-full p-2.5 bg-white border border-bridal-border rounded-input"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-bridal-gold hover:bg-bridal-goldHover text-white font-semibold uppercase tracking-wider rounded-btn shadow-sm transition"
            >
              Generate Voucher
            </button>
          </form>

          {/* Coupons Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Voucher Code</th>
                  <th className="py-2.5 px-3">Discount</th>
                  <th className="py-2.5 px-3">Min Order</th>
                  <th className="py-2.5 px-3">Expiry</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
                {coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-bridal-cream/20">
                    <td className="py-2.5 px-3 font-mono font-bold text-bridal-charcoal">{c.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-green-700">{c.discountPercent}% Off</td>
                    <td className="py-2.5 px-3">PKR {Number(c.minPurchase || 0).toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">{new Date(c.expiryDate).toLocaleDateString()}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
