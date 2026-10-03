import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FashionStory() {
  return (
    <section className="relative py-28 sm:py-36 bg-bridal-charcoal text-white overflow-hidden">
      {/* Background High-Resolution Editorial Image with Fixed Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=2000&q=85"
          alt="Haute Couture Fashion Story"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bridal-charcoal via-bridal-charcoal/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-widest border border-white/25 backdrop-blur-md">
            <Sparkles size={13} className="text-white" />
            <span>The 2026 Bridal Anthology</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.12] text-white">
            Where Royal Heritage Meets Contemporary Romance
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
            Every stitch is an ode to the timeless grandeur of royal courts. Designed with precision draping, bespoke cancan construction, and heirloom bullion, our couture lehengas empower the bride to feel regal, radiant, and effortlessly herself.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <Link
              to="/customize/atelier"
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-[#991B1B] text-[#111827] hover:text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-lg transition transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Design Bespoke Silhouette</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/shop"
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-black/40 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs font-medium uppercase tracking-widest rounded-[4px] transition inline-flex items-center justify-center whitespace-nowrap"
            >
              <span>Browse Complete Lookbook</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
