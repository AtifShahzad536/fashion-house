import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { clearCart, calculateTotals, saveShippingAddress } from '../redux/slices/cartSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, coupon, shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const [step, setStep] = useState(1); // 1: Address, 2: Delivery, 3: Payment, 4: Review
  const [loading, setLoading] = useState(false);

  // Address fields
  const [fullName, setFullName] = useState(shippingAddress?.fullName || userInfo?.name || 'Ayesha Malik');
  const [phone, setPhone] = useState(shippingAddress?.phone || userInfo?.phone || '+92 321 9876543');
  const [street, setStreet] = useState(shippingAddress?.street || 'House 42-B, Gulberg III');
  const [city, setCity] = useState(shippingAddress?.city || 'Lahore');
  const [stateName, setStateName] = useState(shippingAddress?.state || 'Punjab');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '54000');
  const [country, setCountry] = useState(shippingAddress?.country || 'Pakistan');

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState('Standard Insured Bridal Express');
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');

  // Card stub fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const totals = calculateTotals({ cartItems, coupon });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addressData = { fullName, phone, street, city, state: stateName, postalCode, country };
    dispatch(saveShippingAddress(addressData));
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          qty: item.qty,
          size: item.size,
          isCustomized: item.isCustomized,
          customizationDetails: item.customizationDetails,
        })),
        shippingAddress: {
          fullName,
          phone,
          street,
          city,
          state: stateName,
          postalCode,
          country,
        },
        paymentMethod,
        itemsPrice: totals.itemsPrice,
        discountAmount: totals.discount,
        shippingPrice: totals.shippingPrice,
        taxPrice: totals.taxPrice,
        totalPrice: totals.totalPrice,
      };

      const { data } = await api.post('/orders', orderPayload);
      if (data.success) {
        dispatch(clearCart());
        toast.success('Your Royal Bridal Order has been officially placed!');
        navigate(`/order-confirmation/${data.data._id}`);
      }
    } catch (err) {
      console.error('Order placement error:', err);
      toast.error(err.response?.data?.message || 'Error processing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Atelier Checkout | ZURIELLE ATELIER</title>
        <meta name="description" content="Secure 256-bit encrypted checkout for your bridal trousseau." />
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen pb-24">
        {/* Header Bar */}
        <div className="bg-bridal-cream/60 border-b border-bridal-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-bridal-gold">
              Encrypted Checkout
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-normal">
              Finalize Your Bridal Commission
            </h1>
          </div>
        </div>

        {/* Step Wizard Tracker */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-bridal-mutedText border-b border-bridal-border pb-4">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-bridal-charcoal font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-bridal-charcoal text-white' : 'bg-bridal-cream'}`}>1</span>
              <span>Shipping</span>
            </div>
            <span className="text-bridal-border">———</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-bridal-charcoal font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-bridal-charcoal text-white' : 'bg-bridal-cream'}`}>2</span>
              <span>Delivery</span>
            </div>
            <span className="text-bridal-border">———</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-bridal-charcoal font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-bridal-charcoal text-white' : 'bg-bridal-cream'}`}>3</span>
              <span>Payment</span>
            </div>
            <span className="text-bridal-border">———</span>
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-bridal-charcoal font-bold' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step >= 4 ? 'bg-bridal-charcoal text-white' : 'bg-bridal-cream'}`}>4</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Main Checkout Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Steps Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-bridal-border rounded-card p-6 sm:p-8 shadow-luxury-sm">
              {/* STEP 1: SHIPPING ADDRESS */}
              {step === 1 && (
                <form onSubmit={handleAddressSubmit} className="space-y-5 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    1. Bridal Client & Delivery Address
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Street Address & House / Flat #</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">State / Province</label>
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs font-medium text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Kingdom">United Kingdom (London Suite Delivery)</option>
                      <option value="United Arab Emirates">United Arab Emirates (Dubai Concierge)</option>
                      <option value="United States">United States (New York / Global)</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Delivery Selection</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {/* STEP 2: DELIVERY METHOD */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    2. Select Insured Delivery Method
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        name: 'Standard Insured Bridal Express',
                        duration: '4 to 6 Weeks Handcrafted Stitching & Insured Courier',
                        cost: 'Complimentary',
                        desc: 'Full transit insurance, door-to-door tracking, and signature delivery confirmation.',
                      },
                      {
                        name: 'VIP Priority Atelier Express Rush',
                        duration: '3 Weeks Fast-Track Master Tailoring Dispatch',
                        cost: '+PKR 15,000',
                        desc: 'Direct priority slot on the atelier addas with dedicated master tailor oversight.',
                      },
                    ].map((opt) => (
                      <div
                        key={opt.name}
                        onClick={() => setDeliveryMethod(opt.name)}
                        className={`p-4 rounded-card border-2 cursor-pointer transition ${
                          deliveryMethod === opt.name
                            ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                            : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-xs text-bridal-charcoal">{opt.name}</span>
                          <span className="font-semibold text-xs text-bridal-deepGold">{opt.cost}</span>
                        </div>
                        <p className="text-[11px] text-bridal-gold font-medium">{opt.duration}</p>
                        <p className="text-[11px] text-bridal-mutedText mt-1">{opt.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-3 border border-bridal-border rounded-btn text-xs font-semibold text-bridal-charcoal hover:bg-bridal-cream"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md"
                    >
                      Proceed to Payment Method
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    3. Choose Payment Method
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'Credit/Debit Card',
                        title: 'Credit / Debit Card (Visa, Mastercard, Amex)',
                        desc: '256-Bit SSL encrypted card transaction with instantaneous commission logging.',
                        icon: CreditCard,
                      },
                      {
                        id: 'Direct Bank Transfer',
                        title: 'Direct Atelier Bank Wire Transfer (IBAN)',
                        desc: 'Official invoice and company account details provided upon confirmation.',
                        icon: Building,
                      },
                      {
                        id: 'Cash on Delivery',
                        title: 'Cash on Delivery / Showroom Pick-Up (Pakistan Only)',
                        desc: 'Pay cash upon delivery by TCS Bridal Express or collect in MM Alam Flagship.',
                        icon: Banknote,
                      },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-4 rounded-card border-2 cursor-pointer transition ${
                            paymentMethod === m.id
                              ? 'border-bridal-gold bg-bridal-cream/60 shadow-sm'
                              : 'border-bridal-border bg-white hover:border-bridal-gold/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-white border border-bridal-border text-bridal-gold">
                              <Icon size={18} />
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-bridal-charcoal">{m.title}</h4>
                              <p className="text-[11px] text-bridal-mutedText mt-0.5">{m.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {paymentMethod === 'Credit/Debit Card' && (
                    <div className="p-4 bg-bridal-cream/30 border border-bridal-border rounded-card space-y-3 animate-in fade-in text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 bg-white border border-bridal-border rounded-input font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full p-2.5 bg-white border border-bridal-border rounded-input font-mono"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">CVC Security Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full p-2.5 bg-white border border-bridal-border rounded-input font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-3 border border-bridal-border rounded-btn text-xs font-semibold text-bridal-charcoal hover:bg-bridal-cream"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 py-3 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md"
                    >
                      Review Order & Commission
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: FINAL REVIEW */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in text-xs">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    4. Confirm & Commission Bridal Order
                  </h3>

                  <div className="p-4 bg-bridal-cream/40 border border-bridal-border rounded-card space-y-2">
                    <h4 className="font-semibold text-bridal-charcoal uppercase tracking-wider">Shipping To:</h4>
                    <p className="text-bridal-mutedText">{fullName} ({phone})</p>
                    <p className="text-bridal-mutedText">{street}, {city}, {stateName} {postalCode}, {country}</p>
                    <p className="text-bridal-mutedText pt-1 border-t border-bridal-border/60">
                      <strong>Payment Method:</strong> {paymentMethod}
                    </p>
                  </div>

                  <div className="p-4 bg-bridal-cream/40 border border-bridal-gold/40 rounded-card flex items-start gap-2.5">
                    <Sparkles size={16} className="text-bridal-gold flex-shrink-0 mt-0.5" />
                    <p className="text-bridal-mutedText leading-relaxed">
                      By commissioning this order, our Lahore master artisans will immediately begin fabric dyeing, adda embroidery framing, and bespoke tailoring to your specifications.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-3 border border-bridal-border rounded-btn text-xs font-semibold text-bridal-charcoal hover:bg-bridal-cream"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 py-4 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-luxury transition flex items-center justify-center gap-2"
                    >
                      <Lock size={14} className="text-bridal-gold" />
                      <span>{loading ? 'Processing Commission...' : 'Place Official Bridal Order'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Sidebar (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-bridal-border rounded-card p-6 shadow-luxury-sm space-y-4">
                <h3 className="font-serif text-base text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                  Order Summary ({cartItems.length} Pieces)
                </h3>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-bridal-border/60">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="pt-2 flex gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-md" />
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-medium text-bridal-charcoal truncate">{item.name}</h4>
                        <p className="text-[11px] text-bridal-mutedText">
                          Qty: {item.qty} • {item.isCustomized ? 'Bespoke Custom' : `Size ${item.size}`}
                        </p>
                        <p className="font-semibold text-bridal-charcoal mt-1">
                          {formatPrice((item.price + (item.customizationCharge || 0)) * item.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-bridal-border space-y-2 text-xs">
                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Subtotal</span>
                    <span>{formatPrice(totals.itemsPrice)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>Voucher Discount</span>
                      <span>-{formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Insured Shipping</span>
                    <span>{totals.shippingPrice === 0 ? 'Complimentary' : formatPrice(totals.shippingPrice)}</span>
                  </div>
                  <div className="flex justify-between text-bridal-mutedText">
                    <span>Luxury Tax (5%)</span>
                    <span>{formatPrice(totals.taxPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-bridal-charcoal pt-2 border-t border-bridal-border">
                    <span>Total Amount</span>
                    <span className="text-bridal-deepGold text-base">{formatPrice(totals.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
