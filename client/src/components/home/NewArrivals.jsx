import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../common/ProductCard.jsx';

export default function NewArrivals({ products = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Bridal', 'Walima', 'Mehndi'];

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.occasion === activeTab);

  return (
    <section className="py-16 sm:py-24 bg-bridal-ivory border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-bridal-border/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Fresh Off The Loom</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
              New Bridal Arrivals
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[4px] transition ${
                  activeTab === tab
                    ? 'bg-[#111827] text-white font-semibold shadow-sm'
                    : 'bg-[#F9FAFB] text-bridal-mutedText hover:text-bridal-charcoal hover:bg-[#F3F4F6] border border-bridal-border'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (3 Rows = 12 Cards on Desktop, 2 Columns on Mobile) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.slice(0, 12).map((product, idx) => (
              <ProductCard key={product._id || idx} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-bridal-mutedText text-sm">
            Loading royal handcrafted pieces...
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-md transition group"
          >
            <span>View All Products</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
