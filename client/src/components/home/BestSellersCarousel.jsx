import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '../common/ProductCard.jsx';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function BestSellersCarousel({ products = [] }) {
  const swiperRef = useRef(null);

  const bestSellers = products.filter((p) => p.isBestSeller) || products;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Nav Arrows */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-bridal-border/80">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Timeless Favorites</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
              Atelier Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2.5 rounded-md bg-white border border-bridal-border hover:border-[#111827] text-bridal-charcoal hover:bg-[#111827] hover:text-white shadow-sm transition"
              aria-label="Previous Products"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2.5 rounded-md bg-white border border-bridal-border hover:border-[#111827] text-bridal-charcoal hover:bg-[#111827] hover:text-white shadow-sm transition"
              aria-label="Next Products"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-4"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
