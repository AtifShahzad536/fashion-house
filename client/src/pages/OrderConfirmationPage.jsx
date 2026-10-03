import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle2,
  Sparkles,
  Package,
  Scissors,
  Check,
  Truck,
  Building,
  ArrowRight,
  Printer,
  Calendar,
} from 'lucide-react';
import api from '../services/api.js';

const timelineStages = [
  { id: 'Order Placed', label: 'Order Placed', desc: 'Order logged in Atelier queue', icon: Package },
  { id: 'Confirmed', label: 'Confirmed', desc: 'Fabric & measurements approved', icon: CheckCircle2 },
  { id: 'Designing', label: 'Adda Framing', desc: 'Stretched on master addas', icon: Sparkles },
  { id: 'Stitching', label: 'Artisan Stitching', desc: 'Zardozi hand-embroidery in progress', icon: Scissors },
  { id: 'Quality Check', label: 'Quality Inspection', desc: 'Master tailor fitting & hem QC', icon: Check },
  { id: 'Shipped', label: 'Insured Dispatch', desc: 'Handed to DHL/TCS Bridal Express', icon: Truck },
  { id: 'Delivered', label: 'Delivered', desc: 'Safely arrived at your residence', icon: Building },
];

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currency, currencyRate } = useSelector((state) => state.ui);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      if (data.success) {
        setOrder(data.data);
      }
    } catch (err) {
      console.error('Error loading order:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const getStageIndex = (status) => {
    const idx = timelineStages.findIndex((s) => s.id === status);
    return idx === -1 ? 0 : idx;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-bridal-ivory flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-bridal-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm text-bridal-mutedText">Loading Order Confirmation...</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = order ? getStageIndex(order.status) : 0;

  return (
    <>
      <Helmet>
        <title>Order Confirmation & Live Tracking | ZURIELLE ATELIER</title>
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Celebratory Card */}
          <div className="p-8 sm:p-10 bg-white border-2 border-bridal-gold rounded-card shadow-luxury-lg text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-bridal-gold/15 text-bridal-gold flex items-center justify-center mx-auto">
              <Sparkles size={32} className="animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-bridal-gold block">
                Official Commission Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
                Thank You for Your Royal Commission
              </h1>
              <p className="text-xs sm:text-sm text-bridal-mutedText max-w-lg mx-auto">
                Your bridal order has been registered in our Lahore Atelier. Our master ustaads will now begin fabric dyeing, wooden adda framing, and bespoke hand-embroidery.
              </p>
            </div>

            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-bridal-cream/60 border border-bridal-border rounded-full text-xs font-mono">
              <span>Order Number: <strong className="text-bridal-charcoal font-bold">{order?.orderNumber || 'ZA-2026-8899'}</strong></span>
              <span>•</span>
              <span>Status: <strong className="text-bridal-deepGold font-bold uppercase">{order?.status || 'Order Placed'}</strong></span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LIVE 7-STAGE STITCHING & DELIVERY TRACKING TIMELINE */}
          {/* ========================================================= */}
          <div className="p-6 sm:p-8 bg-white border border-bridal-border rounded-card shadow-luxury-sm space-y-6">
            <div className="flex items-center justify-between border-b border-bridal-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
                  Real-Time Atelier Progression
                </span>
                <h3 className="font-serif text-lg text-bridal-charcoal font-semibold">
                  Live Stitching & Courier Tracker
                </h3>
              </div>
              <button
                onClick={() => window.print()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-bridal-cream border border-bridal-border rounded-md text-xs font-medium text-bridal-charcoal hover:bg-bridal-sand transition"
              >
                <Printer size={13} />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Visual Timeline Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {timelineStages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const IconComponent = stage.icon;

                return (
                  <div
                    key={stage.id}
                    className={`p-3 rounded-card border transition-all text-center flex flex-col justify-between ${
                      isCurrent
                        ? 'border-bridal-gold bg-bridal-gold/10 shadow-sm ring-1 ring-bridal-gold'
                        : isPassed
                        ? 'border-green-300 bg-green-50/50'
                        : 'border-bridal-border bg-bridal-cream/20 opacity-40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs ${
                          isCurrent
                            ? 'bg-bridal-gold text-white font-bold animate-bounce'
                            : isPassed
                            ? 'bg-green-600 text-white'
                            : 'bg-bridal-sand text-bridal-mutedText'
                        }`}
                      >
                        <IconComponent size={14} />
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-bridal-charcoal">
                        {stage.label}
                      </h4>
                    </div>
                    <p className="text-[9px] text-bridal-mutedText mt-1 leading-tight">{stage.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Info */}
            <div className="p-6 bg-white border border-bridal-border rounded-card space-y-3 text-xs">
              <h4 className="font-serif text-sm font-semibold text-bridal-charcoal uppercase tracking-wider border-b border-bridal-border pb-2">
                Shipping Destination
              </h4>
              <p className="text-bridal-charcoal font-semibold">{order?.shippingAddress?.fullName}</p>
              <p className="text-bridal-mutedText">{order?.shippingAddress?.phone}</p>
              <p className="text-bridal-mutedText">
                {order?.shippingAddress?.street}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state}{' '}
                {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
              </p>
              <p className="text-bridal-mutedText pt-2 border-t border-bridal-border">
                <strong>Payment:</strong> {order?.paymentMethod}
              </p>
            </div>

            {/* Total Paid */}
            <div className="p-6 bg-white border border-bridal-border rounded-card space-y-3 text-xs">
              <h4 className="font-serif text-sm font-semibold text-bridal-charcoal uppercase tracking-wider border-b border-bridal-border pb-2">
                Commission Total
              </h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-bridal-mutedText">
                  <span>Items Subtotal</span>
                  <span>{formatPrice(order?.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-bridal-mutedText">
                  <span>Insured Courier</span>
                  <span>{order?.shippingPrice === 0 ? 'Complimentary' : formatPrice(order?.shippingPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-bridal-charcoal pt-2 border-t border-bridal-border">
                  <span>Total Paid</span>
                  <span className="text-bridal-deepGold text-base">{formatPrice(order?.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center pt-4 flex justify-center gap-4">
            <Link
              to="/account/orders"
              className="px-6 py-3.5 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition"
            >
              View in My Orders Portal
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-white hover:bg-bridal-cream border border-bridal-border text-bridal-charcoal text-xs font-semibold uppercase tracking-wider rounded-btn transition"
            >
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
