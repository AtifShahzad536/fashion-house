import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  ChevronRight,
  Truck,
  RotateCcw,
} from 'lucide-react';
import {
  removeFromCart,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  calculateTotals,
} from '../redux/slices/cartSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, coupon } = useSelector((state) => state.cart);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const totals = calculateTotals({ cartItems, coupon });

  const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponLoading(true);
    try {
      const { data } = await api.post('/cms/coupons/validate', {
        code: couponCode.trim(),
        cartTotal: totals.itemsPrice,
      });

      if (data.success) {
        dispatch(applyCoupon(data.data));
        toast.success(`Coupon applied! ${data.data.discountPercent}% discount saved.`);
        setCouponCode('');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired coupon code';
      toast.error(msg);
    } finally {
      setCouponLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-bridal-ivory flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F9FAFB] border border-gray-200 flex items-center justify-center text-[#991B1B]">
          <ShoppingBag size={32} />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-2xl text-[#111827]">Your Bridal Bag is Empty</h2>
          <p className="text-xs text-gray-500 max-w-sm">
            Explore our curated bridal couture and festive collections crafted with master artisans.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/shop"
            className="px-8 py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[6px] shadow-md transition"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Bag & Bespoke Trousseau | ZURIELLE ATELIER</title>
        <meta name="description" content="Review your selected bridal lehengas, bespoke customizations, and commission pricing." />
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen pb-24">
        {/* Banner */}
        <div className="bg-bridal-cream/50 border-b border-bridal-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold">
                Your Atelier Bag
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-normal">
                Review Your Bridal Trousseau ({cartItems.reduce((a, c) => a + c.qty, 0)} Items)
              </h1>
            </div>

            <Link
              to="/shop"
              className="text-xs font-semibold text-bridal-charcoal hover:text-bridal-gold flex items-center gap-1 transition"
            >
              <span>Continue Browsing Collections</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items List (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item, index) => {
                const isCustom = !!item.isCustomized;
                const itemUnitPrice = item.price + (item.customizationCharge || 0);

                return (
                  <div
                    key={`${item._id}-${item.size}-${index}`}
                    className="p-6 bg-white border border-bridal-border rounded-card shadow-luxury-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                        alt={item.name}
                        className="w-24 sm:w-28 aspect-[3/4] object-cover rounded-card flex-shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            {isCustom ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-bridal-gold/15 text-bridal-deepGold text-[10px] font-semibold rounded mb-1">
                                <Sparkles size={11} /> Bespoke Tailored Commission
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase tracking-wider text-bridal-mutedText font-semibold block mb-0.5">
                                Ready To Wear Couture
                              </span>
                            )}
                            <h3 className="font-serif text-base sm:text-lg font-semibold text-bridal-charcoal">
                              {item.name}
                            </h3>
                          </div>

                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item._id,
                                  size: item.size,
                                  customizationId: item.customizationId,
                                })
                              )
                            }
                            className="text-bridal-lightText hover:text-red-600 transition p-1"
                            title="Remove Piece"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Customized Specs Summary if Bespoke */}
                        {isCustom && item.customizationDetails && (
                          <div className="p-3.5 bg-bridal-cream/40 border border-bridal-border rounded-md text-xs space-y-1">
                            <p className="text-bridal-charcoal">
                              <strong>Silhouette:</strong> {item.customizationDetails.design?.lehengaFlair} • {item.customizationDetails.design?.choliStyle}
                            </p>
                            <p className="text-bridal-charcoal">
                              <strong>Fabric & Color:</strong> {item.customizationDetails.fabric?.name} in {item.customizationDetails.colors?.baseColor?.name}
                            </p>
                            <p className="text-bridal-charcoal">
                              <strong>Embroidery:</strong> {item.customizationDetails.embroidery?.intensity}
                            </p>
                            <p className="text-bridal-charcoal">
                              <strong>Measurements:</strong>{' '}
                              {item.customizationDetails.measurements?.type === 'custom'
                                ? `Custom Fitting (Bust: ${item.customizationDetails.measurements.customData.bust}", Waist: ${item.customizationDetails.measurements.customData.waist}")`
                                : `Standard Size ${item.size}`}
                            </p>
                            {item.customizationDetails.personalization?.enabled && (
                              <p className="text-bridal-deepGold font-medium">
                                <strong>Monogram:</strong> "{item.customizationDetails.personalization.text}"
                              </p>
                            )}
                          </div>
                        )}

                        {!isCustom && (
                          <p className="text-xs text-bridal-mutedText">
                            Standard Size: <span className="font-semibold text-bridal-charcoal">{item.size}</span>
                          </p>
                        )}

                        {/* Controls & Total Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-bridal-border">
                          <div className="flex items-center border border-bridal-border rounded-md bg-white">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item._id,
                                    size: item.size,
                                    customizationId: item.customizationId,
                                    qty: item.qty - 1,
                                  })
                                )
                              }
                              disabled={item.qty <= 1}
                              className="px-3 py-1 text-xs text-bridal-charcoal hover:bg-bridal-cream disabled:opacity-30"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-semibold text-bridal-charcoal">{item.qty}</span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item._id,
                                    size: item.size,
                                    customizationId: item.customizationId,
                                    qty: item.qty + 1,
                                  })
                                )
                              }
                              className="px-3 py-1 text-xs text-bridal-charcoal hover:bg-bridal-cream"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-serif text-base sm:text-lg font-bold text-bridal-charcoal">
                              {formatPrice(itemUnitPrice * item.qty)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary & Coupon (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary Card */}
              <div className="bg-white border border-bridal-border rounded-card p-6 shadow-luxury-sm space-y-5">
                <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-3">
                  Trousseau Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Items Subtotal</span>
                    <span className="font-medium text-bridal-charcoal">{formatPrice(totals.itemsPrice)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-green-700 bg-green-50 p-2 rounded">
                      <span className="flex items-center gap-1 font-medium">
                        <Tag size={12} /> Coupon ({coupon.code} - {coupon.discountPercent}%)
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">-{formatPrice(totals.discount)}</span>
                        <button
                          onClick={() => dispatch(removeCoupon())}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Insured Bridal Courier</span>
                    <span className="font-medium text-bridal-charcoal">
                      {totals.shippingPrice === 0 ? 'Complimentary' : formatPrice(totals.shippingPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Estimated Luxury Tax (5%)</span>
                    <span className="font-medium text-bridal-charcoal">{formatPrice(totals.taxPrice)}</span>
                  </div>

                  <div className="flex justify-between text-base font-serif font-bold text-bridal-charcoal pt-3 border-t border-bridal-border">
                    <span>Estimated Total</span>
                    <span className="text-bridal-deepGold">{formatPrice(totals.totalPrice)}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                {!coupon && (
                  <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-bridal-border space-y-2">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-bridal-charcoal block">
                      Promotional Voucher
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. ROYAL10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs uppercase font-mono text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponCode.trim()}
                        className="px-4 py-2 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-btn disabled:opacity-40 transition"
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs sm:text-sm font-semibold uppercase tracking-widest rounded-btn shadow-luxury transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="p-4 bg-bridal-cream/40 border border-bridal-border rounded-card space-y-2 text-xs text-bridal-mutedText">
                <div className="flex items-center gap-2 font-medium text-bridal-charcoal">
                  <ShieldCheck size={16} className="text-bridal-gold" />
                  <span>Secure 256-Bit SSL Atelier Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-bridal-gold" />
                  <span>Worldwide Door-to-Door Insured Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
