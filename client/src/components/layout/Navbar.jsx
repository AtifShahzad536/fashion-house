import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  Package,
  Layers,
} from 'lucide-react';
import {
  toggleSearchModal,
  toggleMobileMenu,
  setCurrency,
} from '../../redux/slices/uiSlice.js';
import { toggleCartDrawer } from '../../redux/slices/cartSlice.js';
import { logout } from '../../redux/slices/authSlice.js';
import { ADMIN_BASE_PATH } from '../../constants/theme.js';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { currency } = useSelector((state) => state.ui);

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={`sticky top-0 z-40 transition-all duration-300 relative ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-luxury border-b border-bridal-border py-3'
          : 'bg-[#FDFBF7] border-b border-bridal-border/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu Button & Primary Desktop Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => dispatch(toggleMobileMenu(true))}
              className="lg:hidden p-1.5 rounded-[6px] text-[#111827] hover:bg-[#F3F4F6] transition"
              aria-label="Toggle mobile navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium uppercase tracking-luxury">
              {/* 1. COLLECTIONS LINK */}
              <div
                className="py-2"
                onMouseEnter={() => setActiveMenu('collections')}
              >
                <NavLink
                  to="/shop"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-colors py-1 hover:text-[#991B1B] ${
                      isActive || activeMenu === 'collections'
                        ? 'text-[#991B1B] font-bold'
                        : 'text-[#111827]'
                    }`
                  }
                >
                  <span>Collections</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      activeMenu === 'collections' ? 'rotate-180 text-[#991B1B]' : 'text-gray-400'
                    }`}
                  />
                </NavLink>
              </div>

              {/* 2. BRIDAL LINK */}
              <div
                className="py-2"
                onMouseEnter={() => setActiveMenu('bridal')}
              >
                <NavLink
                  to="/shop?occasion=Bridal"
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-colors py-1 hover:text-[#991B1B] ${
                      isActive || activeMenu === 'bridal'
                        ? 'text-[#991B1B] font-bold'
                        : 'text-[#111827]'
                    }`
                  }
                >
                  <span>Bridal</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      activeMenu === 'bridal' ? 'rotate-180 text-[#991B1B]' : 'text-gray-400'
                    }`}
                  />
                </NavLink>
              </div>

              {/* 3. WALIMA LINK */}
              <div
                className="py-2"
                onMouseEnter={() => setActiveMenu('walima')}
              >
                <NavLink
                  to="/shop?occasion=Walima"
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-colors py-1 hover:text-[#991B1B] ${
                      isActive || activeMenu === 'walima'
                        ? 'text-[#991B1B] font-bold'
                        : 'text-[#111827]'
                    }`
                  }
                >
                  <span>Walima</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      activeMenu === 'walima' ? 'rotate-180 text-[#991B1B]' : 'text-gray-400'
                    }`}
                  />
                </NavLink>
              </div>

              {/* 4. MEHNDI LINK */}
              <div
                className="py-2"
                onMouseEnter={() => setActiveMenu('mehndi')}
              >
                <NavLink
                  to="/shop?occasion=Mehndi"
                  className={({ isActive }) =>
                    `flex items-center gap-1 transition-colors py-1 hover:text-[#991B1B] ${
                      isActive || activeMenu === 'mehndi'
                        ? 'text-[#991B1B] font-bold'
                        : 'text-[#111827]'
                    }`
                  }
                >
                  <span>Mehndi</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      activeMenu === 'mehndi' ? 'rotate-180 text-[#991B1B]' : 'text-gray-400'
                    }`}
                  />
                </NavLink>
              </div>
            </nav>
          </div>

          {/* Center: Brand Luxury Logo */}
          <div className="text-center">
            <Link to="/" className="inline-block group" onClick={() => setActiveMenu(null)}>
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.25em] text-[#111827] font-semibold block transition group-hover:text-[#991B1B]">
                ZURIELLE
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#991B1B] font-semibold uppercase block -mt-1">
                Atelier Couture
              </span>
            </Link>
          </div>

          {/* Right: Actions (Search, Currency, Wishlist, Cart, User) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Currency Toggle */}
            <div className="hidden sm:flex items-center border border-gray-200 rounded-[6px] px-2 py-0.5 text-[11px] font-medium text-gray-500 bg-white">
              <button
                onClick={() => dispatch(setCurrency('PKR'))}
                className={`px-1 rounded-[4px] ${currency === 'PKR' ? 'text-[#111827] font-bold' : 'hover:text-[#111827]'}`}
              >
                PKR
              </button>
              <span className="text-gray-300 px-0.5">|</span>
              <button
                onClick={() => dispatch(setCurrency('USD'))}
                className={`px-1 rounded-[4px] ${currency === 'USD' ? 'text-[#111827] font-bold' : 'hover:text-[#111827]'}`}
              >
                USD
              </button>
            </div>

            {/* Instant Search Trigger */}
            <button
              onClick={() => dispatch(toggleSearchModal(true))}
              className="p-2 rounded-[6px] text-[#111827] hover:text-[#991B1B] hover:bg-[#F3F4F6] transition"
              aria-label="Search collection"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/account/wishlist"
              className="relative p-2 rounded-[6px] text-[#111827] hover:text-[#991B1B] hover:bg-[#F3F4F6] transition hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#991B1B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="relative p-2 rounded-[6px] text-[#111827] hover:text-[#991B1B] hover:bg-[#F3F4F6] transition"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag size={19} />
              {totalCartQty > 0 && (
                <span className="absolute top-1 right-1 bg-[#991B1B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartQty}
                </span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              {userInfo ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-[6px] hover:bg-[#F3F4F6] transition"
                  >
                    <img
                      src={userInfo.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={userInfo.name}
                      className="w-7 h-7 rounded-full object-cover border border-gray-300"
                    />
                    <ChevronDown size={14} className="text-gray-500 hidden sm:block" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-[6px] shadow-luxury-lg py-2 z-50 text-xs animate-in fade-in zoom-in-95"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-semibold text-[#111827] truncate">{userInfo.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{userInfo.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#991B1B]/10 text-[#991B1B] text-[10px] font-semibold rounded-[4px]">
                          {userInfo.role === 'admin' ? 'Atelier Administrator' : 'Bridal Client'}
                        </span>
                      </div>

                      {userInfo.role === 'admin' && (
                        <Link
                          to={ADMIN_BASE_PATH}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F3F4F6] text-[#111827] font-semibold"
                        >
                          <ShieldCheck size={14} className="text-[#991B1B]" />
                          <span>Admin Control Panel</span>
                        </Link>
                      )}

                      <Link
                        to="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F3F4F6] text-[#111827]"
                      >
                        <UserIcon size={14} />
                        <span>My Account Profile</span>
                      </Link>

                      <Link
                        to="/account/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F3F4F6] text-[#111827]"
                      >
                        <Package size={14} />
                        <span>Order & Stitching Tracking</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 text-red-600 text-left font-medium"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111827] hover:text-[#991B1B] hover:bg-[#F3F4F6] rounded-[4px] border border-gray-200 transition"
                  >
                    <UserIcon size={14} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#111827] hover:bg-[#991B1B] text-white rounded-[4px] shadow-sm transition"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 100% FULL-WIDTH NAVBAR MEGA MENU DROPDOWN WITH ULTRA SMOOTH GLIDE ANIMATION */}
      <div
        className={`absolute left-0 right-0 w-full top-full bg-white border-b border-gray-200 shadow-2xl z-50 transition-all duration-300 ease-out origin-top ${
          activeMenu
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
        onMouseEnter={() => {}}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans normal-case tracking-normal">
          {/* 1. COLLECTIONS FULL-WIDTH MENU */}
          {activeMenu === 'collections' && (
                <div className="grid grid-cols-12 gap-8 text-left">
                  {/* Col 1: Silhouettes (3 cols) */}
                  <div className="col-span-3 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Lehenga Silhouettes
                    </span>
                    <div className="space-y-1.5">
                      <Link
                        to="/shop?fabric=Velvet"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Velvet Bridal Lehenga</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Italian micro-velvet with antique zardozi</span>
                      </Link>

                      <Link
                        to="/shop?fabric=Raw%20Silk"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Raw Silk 24-Kali Kalidar</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">80g pure raw silk with regal Mughal flare</span>
                      </Link>

                      <Link
                        to="/shop?fabric=Organza"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Organza & Net Gher Lehenga</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Cascading crystals & scalloped veils</span>
                      </Link>

                      <Link
                        to="/shop?fabric=Brocade"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Banarasi Brocade Choli</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Pure metallic tilla weaves & gotapatti</span>
                      </Link>
                    </div>
                  </div>

                  {/* Col 2: Occasions (3 cols) */}
                  <div className="col-span-3 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Wedding Occasion
                    </span>
                    <div className="space-y-1.5">
                      <Link
                        to="/shop?occasion=Bridal"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Barat & Main Ceremony</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Deep crimson & ruby heirloom sets</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Walima"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Walima Reception Drapes</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Champagne, rose gold & silver shine</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Mehndi"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Saffron Mehndi & Mayun</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Vibrant gotapatti & playful twirls</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Engagement"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B] flex items-center justify-between">
                          <span>Nikah & Engagement Pastels</span>
                          <span className="text-gray-400 text-[11px] group-hover:translate-x-1 transition">&rarr;</span>
                        </span>
                        <span className="text-[11px] text-gray-500 font-normal">Soft blush, mint & ivory romantic tissue</span>
                      </Link>
                    </div>
                  </div>

                  {/* Col 3: Fabrics & Master Crafts (2 cols) */}
                  <div className="col-span-2 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Artisan Heritage
                    </span>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <Link to="/shop?fabric=Velvet" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Pure Italian Micro-Velvet
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?fabric=Raw%20Silk" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          80g Pure Raw Silk
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?fabric=Organza" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Metallic Luminous Tissue
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?occasion=Bridal" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Heirloom Antique Dabka
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?occasion=Mehndi" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Real Freshwater Pearls
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 4 & 5: Visual Lookbook Cards (4 cols) */}
                  <div className="col-span-4 grid grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div className="bg-[#F9FAFB] p-3 rounded-[4px] border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
                            alt="Shahzadi Begum Velvet"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-[#991B1B] text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px]">
                            Barat Flagship
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-[#111827] line-clamp-1">
                          Shahzadi Begum Velvet
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">24-Kali Royal Flare</p>
                      </div>
                      <Link
                        to="/shop?occasion=Bridal"
                        onClick={() => setActiveMenu(null)}
                        className="mt-3 block text-center py-2 bg-[#111827] hover:bg-[#991B1B] text-white text-[10px] uppercase tracking-wider font-semibold rounded-[4px] transition"
                      >
                        Explore Barat
                      </Link>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#F9FAFB] p-3 rounded-[4px] border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden mb-2">
                          <img
                            src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80"
                            alt="Nur-e-Jahan Walima"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-[#111827] text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-[4px]">
                            Walima Edit
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-[#111827] line-clamp-1">
                          Nur-e-Jahan Metallic
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Swarovski Trail Gown</p>
                      </div>
                      <Link
                        to="/shop?occasion=Walima"
                        onClick={() => setActiveMenu(null)}
                        className="mt-3 block text-center py-2 bg-[#111827] hover:bg-[#991B1B] text-white text-[10px] uppercase tracking-wider font-semibold rounded-[4px] transition"
                      >
                        Explore Walima
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. BRIDAL FULL-WIDTH MENU */}
              {activeMenu === 'bridal' && (
                <div className="grid grid-cols-12 gap-8 text-left">
                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Barat Bridal Silhouettes
                    </span>
                    <div className="space-y-1.5">
                      <Link
                        to="/shop?occasion=Bridal&fabric=Velvet"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Heavy Zardozi Velvet Lehengas
                        </span>
                        <span className="text-[11px] text-gray-500">Italian micro-velvet with antique dabka bullion</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Bridal&fabric=Raw%20Silk"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Pure Raw Silk Kalidars
                        </span>
                        <span className="text-[11px] text-gray-500">Traditional 80g silk with heavy gota border</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Bridal&color=Red"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Crimson & Rust Royal Heirlooms
                        </span>
                        <span className="text-[11px] text-gray-500">Mughal arch motifs & emerald bead tassels</span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Artisan Craftsmanship
                    </span>
                    <div className="space-y-1.5">
                      <div className="p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-200/80">
                        <h4 className="text-xs font-semibold text-[#111827]">350+ Hours Hand-Worked</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Four generations of royal ustaads crafting each piece.</p>
                      </div>
                      <div className="p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-200/80">
                        <h4 className="text-xs font-semibold text-[#111827]">Double Dupatta Styling</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Veil drape with scalloped zardozi border.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="bg-[#F9FAFB] p-4 rounded-[4px] border border-gray-200 flex flex-col justify-between h-full">
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80"
                          alt="Barat Masterpiece"
                          className="w-24 aspect-[3/4] object-cover rounded-[4px]"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#991B1B]">Masterpiece</span>
                          <h4 className="text-sm font-semibold text-[#111827]">Heirloom Crimson Barat</h4>
                          <p className="text-xs text-gray-500">Made-to-measure royal ensemble</p>
                        </div>
                      </div>
                      <Link
                        to="/shop?occasion=Bridal"
                        onClick={() => setActiveMenu(null)}
                        className="mt-4 block text-center py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs uppercase tracking-wider font-semibold rounded-[4px] transition"
                      >
                        Shop Full Bridal Collection &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. WALIMA FULL-WIDTH MENU */}
              {activeMenu === 'walima' && (
                <div className="grid grid-cols-12 gap-8 text-left">
                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Walima Reception Ensembles
                    </span>
                    <div className="space-y-1.5">
                      <Link
                        to="/shop?occasion=Walima&color=Silver"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Champagne & Rose Gold Metallics
                        </span>
                        <span className="text-[11px] text-gray-500">Metallic tissue with Swarovski crystal trails</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Walima&fabric=Organza"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Pastel Organza & Pearls
                        </span>
                        <span className="text-[11px] text-gray-500">Delicate French tulle with scalloped veil</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Walima"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Silver Crystal Cut-Dana Gowns
                        </span>
                        <span className="text-[11px] text-gray-500">Modern silhouette designed for ballroom grand entrance</span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Color Palettes & Details
                    </span>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <Link to="/shop?occasion=Walima&color=Silver" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Icy Powder Blue & Crystal Silver
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?occasion=Walima&color=Pink" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Blush Champagne & Rose Gold
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop?occasion=Walima&color=Ivory" onClick={() => setActiveMenu(null)} className="hover:text-[#991B1B] block py-1 font-medium">
                          Pearl Ivory & Luminous Mukesh
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-span-4">
                    <div className="bg-[#F9FAFB] p-4 rounded-[4px] border border-gray-200 flex flex-col justify-between h-full">
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=80"
                          alt="Walima Reception"
                          className="w-24 aspect-[3/4] object-cover rounded-[4px]"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#991B1B]">Reception Luxe</span>
                          <h4 className="text-sm font-semibold text-[#111827]">Nur-e-Jahan Gown</h4>
                          <p className="text-xs text-gray-500">Swarovski Crystal Drape</p>
                        </div>
                      </div>
                      <Link
                        to="/shop?occasion=Walima"
                        onClick={() => setActiveMenu(null)}
                        className="mt-4 block text-center py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs uppercase tracking-wider font-semibold rounded-[4px] transition"
                      >
                        Shop Walima Collection &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. MEHNDI FULL-WIDTH MENU */}
              {activeMenu === 'mehndi' && (
                <div className="grid grid-cols-12 gap-8 text-left">
                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Mehndi & Mayun Silhouettes
                    </span>
                    <div className="space-y-1.5">
                      <Link
                        to="/shop?occasion=Mehndi&color=Saffron"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Saffron & Mustard Silk Kalidars
                        </span>
                        <span className="text-[11px] text-gray-500">Pure raw silk with gotapatti & mirror accents</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Mehndi&fabric=Raw%20Silk"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Multicolor Gotapatti Cholis
                        </span>
                        <span className="text-[11px] text-gray-500">Vibrant contrast borders & festive twirls</span>
                      </Link>

                      <Link
                        to="/shop?occasion=Mehndi&color=Emerald"
                        onClick={() => setActiveMenu(null)}
                        className="group flex flex-col p-2 rounded-[4px] hover:bg-gray-50 transition"
                      >
                        <span className="text-xs font-semibold text-[#111827] group-hover:text-[#991B1B]">
                          Lime Green & Emerald Shararas
                        </span>
                        <span className="text-[11px] text-gray-500">Traditional gotapatti drapes with hand embroidery</span>
                      </Link>
                    </div>
                  </div>

                  <div className="col-span-4 space-y-3">
                    <span className="text-xs uppercase font-bold text-[#991B1B] tracking-wider block pb-2 border-b border-gray-200">
                      Festive Craft Highlights
                    </span>
                    <div className="space-y-1.5">
                      <div className="p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-200/80">
                        <h4 className="text-xs font-semibold text-[#111827]">Authentic Hand-Cut Mirrorwork</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Centuries-old needle art woven into pure silk.</p>
                      </div>
                      <div className="p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-200/80">
                        <h4 className="text-xs font-semibold text-[#111827]">Lightweight Twirl Construction</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Engineered for dancing & effortless celebration.</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4">
                    <div className="bg-[#F9FAFB] p-4 rounded-[4px] border border-gray-200 flex flex-col justify-between h-full">
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=300&q=80"
                          alt="Mehndi Look"
                          className="w-24 aspect-[3/4] object-cover rounded-[4px]"
                        />
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#991B1B]">Festive Sunshine</span>
                          <h4 className="text-sm font-semibold text-[#111827]">Jahanara Saffron Kalidar</h4>
                          <p className="text-xs text-gray-500">Pure Raw Silk Mirrorwork</p>
                        </div>
                      </div>
                      <Link
                        to="/shop?occasion=Mehndi"
                        onClick={() => setActiveMenu(null)}
                        className="mt-4 block text-center py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs uppercase tracking-wider font-semibold rounded-[4px] transition"
                      >
                        Shop Mehndi Collection &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
  );
}
