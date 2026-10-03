import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../common/ProductCard.jsx';

import 'swiper/css';
import 'swiper/css/navigation';

export default function NewArrivals({ products = [] }) {
  const [activeTab, setActiveTab] = useState('All');
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);

  const tabs = ['All', 'Bridal', 'Walima', 'Mehndi'];

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.occasion === activeTab);

  // Split into 2 rows: alternating items for visual diversity across categories
  const row1Products = [];
  const row2Products = [];

  if (filteredProducts.length <= 4) {
    row1Products.push(...filteredProducts);
    row2Products.push(...filteredProducts);
  } else {
    filteredProducts.forEach((prod, index) => {
      if (index % 2 === 0) {
        row1Products.push(prod);
      } else {
        row2Products.push(prod);
      }
    });
    // Ensure both rows have at least equal balance
    if (row2Products.length === 0) {
      row2Products.push(...row1Products);
    }
  }

  const handlePrev = () => {
    swiperRef1.current?.slidePrev();
    swiperRef2.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef1.current?.slideNext();
    swiperRef2.current?.slideNext();
  };

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

          {/* Filter Tabs & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
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

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-bridal-border">
              <button
                onClick={handlePrev}
                className="p-2 rounded-[4px] bg-white border border-bridal-border hover:border-[#111827] text-bridal-charcoal hover:bg-[#111827] hover:text-white shadow-sm transition"
                aria-label="Previous Slides"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-[4px] bg-white border border-bridal-border hover:border-[#111827] text-bridal-charcoal hover:bg-[#111827] hover:text-white shadow-sm transition"
                aria-label="Next Slides"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Double Row Slider */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-6">
            {/* Row 1 Slider */}
            <div className="relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef1.current = swiper)}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-2"
              >
                {row1Products.map((product, idx) => (
                  <SwiperSlide key={`row1-${product._id || idx}`}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Row 2 Slider */}
            <div className="relative">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef2.current = swiper)}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-2"
              >
                {row2Products.map((product, idx) => (
                  <SwiperSlide key={`row2-${product._id || idx}`}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
            <span>View All Haute Couture Ensembles</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
