import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  ShoppingBag,
  Sliders,
  Tag,
  Users,
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { logout } from '../../redux/slices/authSlice.js';

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protection: redirect non-admin users
  if (!userInfo || userInfo.role !== 'admin') {
    return (
      <div className="min-h-screen bg-bridal-ivory flex flex-col items-center justify-center p-6 text-center space-y-4">
        <ShieldCheck size={48} className="text-[#991B1B]" />
        <h2 className="font-serif text-2xl text-[#111827]">Atelier Admin Access Restricted</h2>
        <p className="text-xs text-gray-500 max-w-sm">
          You must be logged in as an authorized Atelier Administrator to access this portal.
        </p>
        <Link
          to="/login?redirect=/admin"
          className="px-6 py-2.5 bg-[#111827] text-white text-xs font-semibold uppercase tracking-wider rounded-[6px]"
        >
          Sign In with Admin Account
        </Link>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Product Inventory', path: '/admin/products', icon: Shirt },
    { name: 'Add New Lehenga', path: '/admin/products/new', icon: Sparkles },
    { name: 'Discount Campaigns', path: '/admin/discounts', icon: Percent },
    { name: 'Hero Social Icons', path: '/admin/social-links', icon: Share2 },
    { name: 'Bridal Orders Queue', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Hero Slider CMS', path: '/admin/hero-slides', icon: ImageIcon },
    { name: 'Coupons & Vouchers', path: '/admin/coupons', icon: Tag },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex text-bridal-charcoal font-sans select-none">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#181615] text-[#E8E1D7] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-[#2D2825] flex items-center justify-between">
            <div>
              <span className="font-serif text-xl tracking-[0.2em] text-white font-semibold block">
                ZURIELLE
              </span>
              <span className="text-[10px] tracking-widest text-bridal-gold uppercase block font-semibold">
                Admin Control Atelier
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#A89F91] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-md transition font-medium ${
                      isActive
                        ? 'bg-bridal-gold text-white font-semibold shadow-sm'
                        : 'text-[#C5BDB3] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2D2825] space-y-3">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-md text-xs text-bridal-gold transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} />
              <span>View Live Storefront</span>
            </span>
            <ChevronRight size={13} />
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={userInfo?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'}
                alt="Admin"
                className="w-7 h-7 rounded-full object-cover border border-bridal-gold"
              />
              <div className="text-[11px] leading-tight truncate max-w-[100px]">
                <span className="font-semibold text-white block truncate">{userInfo.name}</span>
                <span className="text-bridal-gold">Super Admin</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#A89F91] hover:text-red-400"
              title="Sign Out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-bridal-border py-4 px-6 sm:px-8 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-bridal-charcoal hover:bg-bridal-cream"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-serif text-lg font-semibold text-bridal-charcoal hidden sm:block">
              Atelier Management Portal
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              <span>API Gateway Online</span>
            </span>

            <Link
              to="/"
              className="px-4 py-2 bg-bridal-cream hover:bg-bridal-sand border border-bridal-border rounded-btn font-semibold text-bridal-charcoal transition"
            >
              Customer View &rarr;
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
