import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X, Sparkles, Heart, ShoppingBag, User, ShieldCheck, ChevronRight, ChevronDown, Phone } from 'lucide-react';
import { toggleMobileMenu } from '../../redux/slices/uiSlice.js';
import { logout } from '../../redux/slices/authSlice.js';
import { ADMIN_BASE_PATH } from '../../constants/theme.js';

export default function MobileMenuDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { isMobileMenuOpen } = useSelector((state) => state.ui);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  if (!isMobileMenuOpen) return null;

  const handleNavClick = (path) => {
    dispatch(toggleMobileMenu(false));
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(toggleMobileMenu(false));
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Collections', path: '/shop' },
    { name: 'Bridal Couture', path: '/shop?occasion=Bridal' },
    { name: 'Walima Splendor', path: '/shop?occasion=Walima' },
    { name: 'Mehndi & Mayun', path: '/shop?occasion=Mehndi' },
    { name: 'Engagement & Party', path: '/shop?occasion=Engagement' },
    { name: 'Our Atelier Story', path: '/about' },
    { name: 'Contact & VIP Concierge', path: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      <div
        onClick={() => dispatch(toggleMobileMenu(false))}
        className="absolute inset-0 bg-bridal-charcoal/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white border-r border-bridal-border flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#F9FAFB]">
            <div>
              <span className="font-serif text-lg tracking-widest text-[#111827] font-semibold uppercase block">
                ZURIELLE
              </span>
              <span className="text-[10px] tracking-luxury text-[#991B1B] uppercase font-semibold">Atelier Couture</span>
            </div>
            <button
              onClick={() => dispatch(toggleMobileMenu(false))}
              className="p-1 rounded-[6px] text-gray-400 hover:text-[#111827] hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Status Bar */}
          <div className="p-4 bg-[#F9FAFB] border-b border-gray-200 flex items-center justify-between text-xs">
            {userInfo ? (
              <div className="flex items-center gap-2">
                <img
                  src={userInfo.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={userInfo.name}
                  className="w-7 h-7 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <span className="font-semibold text-[#111827] block truncate max-w-[120px]">{userInfo.name}</span>
                  <span className="text-[10px] text-[#991B1B] uppercase font-medium">{userInfo.role}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('/login')}
                className="flex items-center gap-1.5 text-[#111827] font-semibold hover:text-[#991B1B]"
              >
                <User size={14} className="text-[#991B1B]" />
                <span>Sign In / Register</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('/account/wishlist')}
                className="relative p-1.5 text-[#111827] hover:text-[#991B1B]"
              >
                <Heart size={16} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#991B1B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleNavClick('/cart')}
                className="relative p-1.5 text-[#111827] hover:text-[#991B1B]"
              >
                <ShoppingBag size={16} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#991B1B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Nav Links with Mobile Dropdown Accordions */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] text-left"
            >
              <span>Home</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>

            {/* 1. Collections Accordion */}
            <div className="border border-gray-100 rounded-[4px] overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === 'collections' ? null : 'collections')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#111827] bg-[#F9FAFB] hover:bg-gray-100 text-left"
              >
                <span>All Collections</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${expandedCategory === 'collections' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedCategory === 'collections' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-gray-100 pl-5">
                  <button onClick={() => handleNavClick('/shop')} className="block text-left text-[#991B1B] font-semibold">
                    &rarr; View All Haute Couture
                  </button>
                  <button onClick={() => handleNavClick('/shop?fabric=Velvet')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Velvet Bridal Lehengas
                  </button>
                  <button onClick={() => handleNavClick('/shop?fabric=Raw%20Silk')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Raw Silk 24-Kali Kalidars
                  </button>
                  <button onClick={() => handleNavClick('/shop?fabric=Organza')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Organza & Net Gher Lehengas
                  </button>
                  <button onClick={() => handleNavClick('/shop?fabric=Brocade')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Banarasi Brocade Cholis
                  </button>
                </div>
              )}
            </div>

            {/* 2. Bridal Accordion */}
            <div className="border border-gray-100 rounded-[4px] overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === 'bridal' ? null : 'bridal')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#111827] bg-[#F9FAFB] hover:bg-gray-100 text-left"
              >
                <span>Bridal Couture</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${expandedCategory === 'bridal' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedCategory === 'bridal' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-gray-100 pl-5">
                  <button onClick={() => handleNavClick('/shop?occasion=Bridal')} className="block text-left text-[#991B1B] font-semibold">
                    &rarr; All Bridal & Barat
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Bridal&fabric=Velvet')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Heavy Zardozi Velvet Lehengas
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Bridal&color=Red')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Crimson & Rust Royal Heirlooms
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Bridal&fabric=Raw%20Silk')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Pure Raw Silk Barat Kalidars
                  </button>
                </div>
              )}
            </div>

            {/* 3. Walima Accordion */}
            <div className="border border-gray-100 rounded-[4px] overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === 'walima' ? null : 'walima')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#111827] bg-[#F9FAFB] hover:bg-gray-100 text-left"
              >
                <span>Walima Splendor</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${expandedCategory === 'walima' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedCategory === 'walima' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-gray-100 pl-5">
                  <button onClick={() => handleNavClick('/shop?occasion=Walima')} className="block text-left text-[#991B1B] font-semibold">
                    &rarr; All Walima Reception
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Walima&color=Silver')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Champagne & Rose Gold Metallics
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Walima&fabric=Organza')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Metallic Tissue & Trail Lehengas
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Walima&color=Pink')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Pastel Organza & Pearls
                  </button>
                </div>
              )}
            </div>

            {/* 4. Mehndi Accordion */}
            <div className="border border-gray-100 rounded-[4px] overflow-hidden">
              <button
                onClick={() => setExpandedCategory(expandedCategory === 'mehndi' ? null : 'mehndi')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#111827] bg-[#F9FAFB] hover:bg-gray-100 text-left"
              >
                <span>Mehndi & Mayun</span>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${expandedCategory === 'mehndi' ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedCategory === 'mehndi' && (
                <div className="p-3 bg-white space-y-2 text-xs border-t border-gray-100 pl-5">
                  <button onClick={() => handleNavClick('/shop?occasion=Mehndi')} className="block text-left text-[#991B1B] font-semibold">
                    &rarr; All Mehndi Festivities
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Mehndi&color=Saffron')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Saffron & Mustard Kalidars
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Mehndi&fabric=Raw%20Silk')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Gotapatti & Mirror Cholis
                  </button>
                  <button onClick={() => handleNavClick('/shop?occasion=Mehndi&color=Emerald')} className="block text-left text-gray-600 hover:text-[#111827]">
                    Lime & Emerald Shararas
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/shop?occasion=Engagement')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] text-left"
            >
              <span>Nikah & Engagement Pastels</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick('/about')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] text-left"
            >
              <span>Our Atelier Story</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-medium text-[#111827] hover:bg-[#F3F4F6] text-left"
            >
              <span>Contact & VIP Concierge</span>
              <ChevronRight size={14} className="text-gray-400" />
            </button>

            {userInfo?.role === 'admin' && (
              <div className="pt-3 mt-3 border-t border-gray-200">
                <button
                  onClick={() => handleNavClick(ADMIN_BASE_PATH)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[4px] text-xs font-semibold bg-[#111827] text-white hover:bg-black transition"
                >
                  <ShieldCheck size={14} className="text-[#991B1B]" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer Contact & Logout */}
          <div className="p-4 bg-[#F9FAFB] border-t border-gray-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-500 text-[11px]">
              <Phone size={12} className="text-[#991B1B]" />
              <span>Concierge: +92 42 3575 8899</span>
            </div>
            {userInfo && (
              <button
                onClick={handleLogout}
                className="w-full py-2 text-center text-red-600 hover:bg-red-50 rounded-[6px] font-medium text-xs transition"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
