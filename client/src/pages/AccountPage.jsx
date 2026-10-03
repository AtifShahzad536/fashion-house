import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  User,
  Package,
  Layers,
  Ruler,
  MapPin,
  Heart,
  LogOut,
  Sparkles,
  ExternalLink,
  Trash2,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Scissors,
} from 'lucide-react';
import { logout, setCredentials } from '../redux/slices/authSlice.js';
import { addToCart } from '../redux/slices/cartSlice.js';
import { removeFromWishlist } from '../redux/slices/wishlistSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  // Determine active tab from URL path
  const path = location.pathname;
  let defaultTab = 'profile';
  if (path.includes('orders')) defaultTab = 'orders';
  if (path.includes('saved-designs')) defaultTab = 'saved-designs';
  if (path.includes('wishlist')) defaultTab = 'wishlist';
  if (path.includes('addresses')) defaultTab = 'addresses';
  if (path.includes('measurements')) defaultTab = 'measurements';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [orders, setOrders] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile Edit State
  const [name, setName] = useState(userInfo?.name || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [password, setPassword] = useState('');

  // Measurement Profile State
  const [measurements, setMeasurements] = useState({
    bust: userInfo?.measurementProfiles?.[0]?.bust || 36,
    underBust: userInfo?.measurementProfiles?.[0]?.underBust || 31,
    waist: userInfo?.measurementProfiles?.[0]?.waist || 30,
    hips: userInfo?.measurementProfiles?.[0]?.hips || 40,
    shoulder: userInfo?.measurementProfiles?.[0]?.shoulder || 14.5,
    armHole: userInfo?.measurementProfiles?.[0]?.armHole || 16,
    sleeveLength: userInfo?.measurementProfiles?.[0]?.sleeveLength || 12,
    lehengaLength: userInfo?.measurementProfiles?.[0]?.lehengaLength || 42,
    choliLength: userInfo?.measurementProfiles?.[0]?.choliLength || 15,
    notes: userInfo?.measurementProfiles?.[0]?.notes || '',
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    fetchOrdersAndDesigns();
  }, [userInfo, navigate]);

  const fetchOrdersAndDesigns = async () => {
    setLoadingOrders(true);
    try {
      const [ordersRes, designsRes] = await Promise.all([
        api.get('/orders/myorders'),
        api.get('/customizer/saved-designs'),
      ]);

      if (ordersRes.data.success) setOrders(ordersRes.data.data || []);
      if (designsRes.data.success) setSavedDesigns(designsRes.data.data || []);
    } catch (err) {
      console.error('Error fetching account data:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, phone };
      if (password) payload.password = password;

      const { data } = await api.put('/auth/profile', payload);
      if (data.success) {
        dispatch(setCredentials(data.data));
        toast.success('Your bridal profile has been updated!');
        setPassword('');
      }
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  const handleSaveMeasurements = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', {
        measurementProfile: {
          profileName: 'Primary Bridal Fitting Profile',
          ...measurements,
        },
      });
      if (data.success) {
        dispatch(setCredentials(data.data));
        toast.success('Your master fitting measurements have been saved for future commissions!');
      }
    } catch (err) {
      toast.error('Failed to save measurements.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Signed out safely.');
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  return (
    <>
      <Helmet>
        <title>VIP Bridal Account & Trousseau Portal | ZURIELLE ATELIER</title>
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen pb-24">
        {/* Header */}
        <div className="bg-bridal-cream/60 border-b border-bridal-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={userInfo?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={userInfo?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-bridal-gold"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-bridal-gold block">
                  VIP Atelier Member
                </span>
                <h1 className="font-serif text-2xl text-bridal-charcoal font-semibold">
                  {userInfo?.name}
                </h1>
                <p className="text-xs text-bridal-mutedText">{userInfo?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 border border-bridal-border bg-white rounded-btn text-xs font-semibold text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation (3 Cols) */}
            <aside className="lg:col-span-3">
              <div className="bg-white border border-bridal-border rounded-card p-3 shadow-luxury-sm space-y-1">
                {[
                  { id: 'profile', label: 'Atelier Profile', icon: User },
                  { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
                  { id: 'saved-designs', label: `Saved Custom Designs (${savedDesigns.length})`, icon: Layers },
                  { id: 'measurements', label: 'Fitting Measurements', icon: Ruler },
                  { id: 'wishlist', label: `Wishlist (${wishlistItems.length})`, icon: Heart },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-btn text-xs font-medium transition text-left ${
                        activeTab === tab.id
                          ? 'bg-bridal-charcoal text-white font-semibold shadow-sm'
                          : 'text-bridal-charcoal hover:bg-bridal-cream'
                      }`}
                    >
                      <Icon size={15} className={activeTab === tab.id ? 'text-bridal-gold' : 'text-bridal-mutedText'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}

                {userInfo?.role === 'admin' && (
                  <div className="pt-2 mt-2 border-t border-bridal-border">
                    <Link
                      to="/admin"
                      className="w-full flex items-center gap-2.5 px-4 py-3 rounded-btn text-xs font-semibold bg-bridal-gold/15 text-bridal-deepGold hover:bg-bridal-gold/25 transition"
                    >
                      <ShieldCheck size={15} />
                      <span>Switch to Admin Panel</span>
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Tab Content (9 Cols) */}
            <main className="lg:col-span-9 bg-white border border-bridal-border rounded-card p-6 sm:p-8 shadow-luxury-sm">
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-6 animate-in fade-in max-w-lg">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    Personal Bridal Profile
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Change Password (Leave blank to keep)</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition"
                  >
                    Save Profile Changes
                  </button>
                </form>
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    My Bridal Orders & Stitching Timeline
                  </h3>

                  {loadingOrders ? (
                    <div className="py-12 text-center text-xs text-bridal-mutedText animate-pulse">
                      Retrieving order archives...
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord._id}
                          className="p-5 bg-bridal-cream/20 border border-bridal-border rounded-card space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-bridal-border pb-3 text-xs">
                            <div>
                              <span className="font-mono text-bridal-gold font-bold">
                                {ord.orderNumber}
                              </span>
                              <span className="text-bridal-mutedText ml-2">
                                • Placed on {new Date(ord.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 bg-bridal-gold/15 text-bridal-deepGold font-bold uppercase text-[10px] rounded-full">
                                {ord.status}
                              </span>
                              <span className="font-bold text-bridal-charcoal">
                                {formatPrice(ord.totalPrice)}
                              </span>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="space-y-2">
                            {ord.orderItems?.map((it, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-xs">
                                <img src={it.image} alt={it.name} className="w-10 h-14 object-cover rounded-md" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-bridal-charcoal">{it.name}</h4>
                                  <p className="text-[11px] text-bridal-mutedText">
                                    Qty: {it.qty} • {it.isCustomized ? 'Bespoke Made-to-Measure' : `Size ${it.size}`}
                                  </p>
                                </div>
                                <span className="font-medium text-bridal-charcoal">
                                  {formatPrice(it.price * it.qty)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 flex justify-between items-center text-xs">
                            <span className="text-bridal-mutedText">
                              Courier: {ord.courierName || 'TCS Bridal Express'}
                            </span>
                            <Link
                              to={`/order-confirmation/${ord._id}`}
                              className="text-bridal-gold font-semibold hover:underline flex items-center gap-1"
                            >
                              <span>View Live Stitching Timeline</span>
                              <ExternalLink size={12} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-bridal-mutedText">
                      You haven't placed any bridal orders yet.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SAVED BESPOKE DESIGNS */}
              {activeTab === 'saved-designs' && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    Saved Custom Lehenga Configurations
                  </h3>

                  {savedDesigns.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {savedDesigns.map((des) => (
                        <div
                          key={des._id}
                          className="p-4 border border-bridal-border rounded-card bg-bridal-cream/30 space-y-3 flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] text-bridal-gold font-semibold uppercase block">
                              Custom Atelier Blueprint
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">
                              {des.designTitle}
                            </h4>
                            <p className="text-[11px] text-bridal-mutedText mt-1">
                              {des.fabric?.name} • {des.colors?.baseColor?.name} • {des.design?.lehengaFlair}
                            </p>
                            <span className="font-bold text-xs text-bridal-deepGold mt-2 block">
                              Estimated: {formatPrice(des.finalPrice)}
                            </span>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-bridal-border">
                            <Link
                              to={`/customize/${des.baseProduct?._id || 'atelier'}`}
                              className="flex-1 py-2 bg-bridal-charcoal text-white text-xs font-semibold rounded-btn text-center hover:bg-black transition"
                            >
                              Open in Customizer
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-bridal-mutedText space-y-3">
                      <p>You haven't saved any custom bespoke lehenga designs yet.</p>
                      <Link
                        to="/customize/atelier"
                        className="inline-block px-5 py-2.5 bg-bridal-gold text-white text-xs font-semibold uppercase rounded-btn"
                      >
                        Launch Customizer Studio
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SAVED MEASUREMENT PROFILES */}
              {activeTab === 'measurements' && (
                <form onSubmit={handleSaveMeasurements} className="space-y-6 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    Saved Master Fitting Measurement Profile (Inches)
                  </h3>

                  <p className="text-xs text-bridal-mutedText">
                    Save your body measurements once to automatically apply them to all your bespoke bridal commissions.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {Object.keys(measurements)
                      .filter((k) => k !== 'notes')
                      .map((key) => (
                        <div key={key}>
                          <label className="font-semibold text-bridal-charcoal capitalize block mb-1">
                            {key.replace(/([A-Z])/g, ' $1')} (")
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={measurements[key] || ''}
                            onChange={(e) =>
                              setMeasurements({ ...measurements, [key]: parseFloat(e.target.value) || 0 })
                            }
                            className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                          />
                        </div>
                      ))}
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-semibold text-bridal-charcoal block">Personal Fit Notes</label>
                    <textarea
                      rows="2"
                      value={measurements.notes || ''}
                      onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                      placeholder="e.g. Extra ease on waist, specific sleeve cut..."
                      className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition"
                  >
                    Save Fitting Profile
                  </button>
                </form>
              )}

              {/* TAB 5: WISHLIST */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="font-serif text-lg text-bridal-charcoal font-semibold border-b border-bridal-border pb-2">
                    My Bridal Wishlist ({wishlistItems.length} Pieces)
                  </h3>

                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {wishlistItems.map((prod) => (
                        <div
                          key={prod._id}
                          className="p-3 border border-bridal-border rounded-card bg-white space-y-2 flex flex-col justify-between"
                        >
                          <img
                            src={prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                            alt={prod.name}
                            className="w-full aspect-[3/4] object-cover rounded-md"
                          />
                          <div>
                            <span className="text-[10px] text-bridal-gold font-semibold uppercase block">
                              {prod.occasion}
                            </span>
                            <h4 className="font-medium text-xs text-bridal-charcoal truncate">{prod.name}</h4>
                            <span className="font-semibold text-xs text-bridal-charcoal mt-1 block">
                              {formatPrice(prod.salePrice || prod.price)}
                            </span>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-bridal-border">
                            <button
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    _id: prod._id,
                                    name: prod.name,
                                    price: prod.salePrice || prod.price,
                                    image: prod.images?.[0]?.url,
                                    size: 'M',
                                    qty: 1,
                                    isCustomized: false,
                                  })
                                );
                                toast.success(`${prod.name} added to bag!`);
                              }}
                              className="flex-1 py-1.5 bg-bridal-charcoal text-white text-xs font-medium rounded-btn hover:bg-black"
                            >
                              Move to Bag
                            </button>
                            <button
                              onClick={() => dispatch(removeFromWishlist(prod._id))}
                              className="p-1.5 text-bridal-lightText hover:text-red-600 rounded-btn border border-bridal-border"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-xs text-bridal-mutedText">
                      Your wishlist is currently empty. Browse the shop to save favorites.
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
