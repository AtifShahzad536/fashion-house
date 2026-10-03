import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  TrendingUp,
  ShoppingBag,
  Shirt,
  Scissors,
  Users,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import api from '../../services/api.js';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 2850000,
    totalOrders: 14,
    activeStitching: 6,
    totalProducts: 6,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currency, currencyRate } = useSelector((state) => state.ui);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products?limit=100'),
      ]);

      if (ordersRes.data.success) {
        const allOrders = ordersRes.data.data || [];
        setRecentOrders(allOrders.slice(0, 5));
        const totalRev = allOrders.reduce((sum, ord) => sum + (ord.totalPrice || 0), 0);
        const inStitching = allOrders.filter((o) => o.status === 'Stitching' || o.status === 'Designing' || o.status === 'Order Placed').length;

        setStats({
          totalRevenue: totalRev || 2850000,
          totalOrders: allOrders.length || 14,
          activeStitching: inStitching || 6,
          totalProducts: productsRes.data.totalProducts || 6,
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount) => {
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  return (
    <>
      <Helmet>
        <title>Atelier Executive Dashboard | ZURIELLE ADMIN</title>
      </Helmet>

      <div className="space-y-8 select-none">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-bridal-gold block">
              Atelier Intelligence
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-semibold">
              Executive Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products/new"
              className="px-4 py-2.5 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-sm transition flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Add New Lehenga</span>
            </Link>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-bridal-mutedText font-medium">
              <span>Total Gross Revenue</span>
              <span className="p-2 bg-green-50 text-green-700 rounded-md">
                <TrendingUp size={16} />
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-bridal-charcoal">
              {formatPrice(stats.totalRevenue)}
            </div>
            <span className="text-[10px] text-green-700 font-semibold flex items-center gap-1">
              <span>+18.4%</span>
              <span className="text-bridal-mutedText">vs last wedding season</span>
            </span>
          </div>

          <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-bridal-mutedText font-medium">
              <span>Total Orders Commissioned</span>
              <span className="p-2 bg-bridal-cream text-bridal-gold rounded-md">
                <ShoppingBag size={16} />
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-bridal-charcoal">
              {stats.totalOrders}
            </div>
            <span className="text-[10px] text-bridal-gold font-semibold">
              Includes bespoke customized orders
            </span>
          </div>

          <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-bridal-mutedText font-medium">
              <span>Active Stitching Queue</span>
              <span className="p-2 bg-amber-50 text-amber-700 rounded-md">
                <Scissors size={16} />
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-bridal-charcoal">
              {stats.activeStitching}
            </div>
            <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
              <Clock size={12} />
              <span>In Adda Framing / Zardozi</span>
            </span>
          </div>

          <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-bridal-mutedText font-medium">
              <span>Active Catalog Masterpieces</span>
              <span className="p-2 bg-blue-50 text-blue-700 rounded-md">
                <Shirt size={16} />
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-bridal-charcoal">
              {stats.totalProducts}
            </div>
            <span className="text-[10px] text-bridal-mutedText font-semibold">
              Across 5 signature collections
            </span>
          </div>
        </div>

        {/* Visual Revenue & Category Sales Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Over Time Simulation (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-bridal-border rounded-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-bridal-border pb-3">
              <h3 className="font-serif text-base font-semibold text-bridal-charcoal">
                Bridal Commission Revenue Trends (2026)
              </h3>
              <span className="text-xs text-bridal-gold font-semibold">Monthly Breakdown (PKR)</span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="pt-4 h-56 flex items-end justify-between gap-3 text-[11px] text-bridal-mutedText">
              {[
                { month: 'Oct', height: '40%', val: '450k' },
                { month: 'Nov', height: '65%', val: '780k' },
                { month: 'Dec', height: '90%', val: '1.2M' },
                { month: 'Jan', height: '75%', val: '950k' },
                { month: 'Feb', height: '85%', val: '1.1M' },
                { month: 'Mar', height: '100%', val: '1.4M' },
              ].map((bar) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] text-bridal-gold font-bold opacity-0 group-hover:opacity-100 transition">
                    {bar.val}
                  </span>
                  <div
                    style={{ height: bar.height }}
                    className="w-full max-w-[48px] bg-bridal-cream border border-bridal-gold/40 group-hover:bg-bridal-gold rounded-t-md transition-all duration-300"
                  />
                  <span className="font-semibold text-bridal-charcoal">{bar.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Sales Share (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-bridal-border rounded-card p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-semibold text-bridal-charcoal border-b border-bridal-border pb-3">
              Occasion Sales Share
            </h3>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Bridal Barat (Crimson Velvet)</span>
                  <span className="text-bridal-deepGold">52%</span>
                </div>
                <div className="w-full h-2 bg-bridal-sand rounded-full overflow-hidden">
                  <div className="w-[52%] h-full bg-bridal-gold" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Walima Splendor (Champagne)</span>
                  <span className="text-bridal-deepGold">28%</span>
                </div>
                <div className="w-full h-2 bg-bridal-sand rounded-full overflow-hidden">
                  <div className="w-[28%] h-full bg-bridal-gold/80" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Mehndi & Mayun (Saffron)</span>
                  <span className="text-bridal-deepGold">14%</span>
                </div>
                <div className="w-full h-2 bg-bridal-sand rounded-full overflow-hidden">
                  <div className="w-[14%] h-full bg-bridal-gold/60" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Engagement & Pastels</span>
                  <span className="text-bridal-deepGold">6%</span>
                </div>
                <div className="w-full h-2 bg-bridal-sand rounded-full overflow-hidden">
                  <div className="w-[6%] h-full bg-bridal-gold/40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Queue Table */}
        <div className="bg-white border border-bridal-border rounded-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-bridal-border pb-3">
            <h3 className="font-serif text-base font-semibold text-bridal-charcoal">
              Recent Bridal Commissions
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs text-bridal-gold font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Orders Queue</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-3">Order #</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
                {recentOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-bridal-cream/30 transition">
                    <td className="py-3 px-3 font-mono font-bold text-bridal-charcoal">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-bridal-charcoal block">{ord.shippingAddress?.fullName}</span>
                      <span className="text-[10px] text-bridal-lightText">{ord.shippingAddress?.city}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-bridal-gold/15 text-bridal-deepGold text-[10px] font-bold rounded">
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">{ord.paymentMethod}</td>
                    <td className="py-3 px-3 font-semibold text-bridal-charcoal">
                      {formatPrice(ord.totalPrice)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/admin/orders"
                        className="text-xs font-semibold text-bridal-gold hover:underline"
                      >
                        Manage &rarr;
                      </Link>
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
