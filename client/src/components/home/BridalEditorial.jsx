import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';

export default function BridalEditorial() {
  return (
    <section className="py-20 sm:py-28 bg-[#181615] text-[#FDFBF7] border-b border-[#2D2825] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Text & Quote */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-widest border border-white/25 backdrop-blur-md">
              <Sparkles size={13} className="text-white" />
              <span>The Atelier Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.15] text-white">
              Centuries of Mughal Mastery, Tailored for Your Wedding Day.
            </h2>

            <p className="text-sm text-white/80 font-light leading-relaxed">
              In our historic Lahore atelier, master artisans practice heirloom embroidery techniques passed down through four generations of royal ustaads. Each bridal lehenga takes over 350 painstaking hours of hand-embroidery using pure silver threads, real freshwater pearls, and zardozi dabka.
            </p>

            <div className="p-6 bg-white/5 border-l-2 border-[#991B1B] rounded-r-md space-y-2">
              <Quote className="text-white w-6 h-6 opacity-80" />
              <p className="font-serif italic text-sm text-white/95">
                "A bridal lehenga is not mere fashion; it is an heirloom of emotional memory that lives forever in family portraits and ancestral stories."
              </p>
              <p className="text-xs font-semibold text-[#FEF2F2] uppercase tracking-wider">
                — Ustaad Farooq Ahmed, Master Craftsman
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/shop?occasion=Bridal"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#991B1B] text-[#111827] hover:text-white text-xs font-semibold uppercase tracking-luxury rounded-btn shadow-lg transition"
              >
                <span>Explore The Masterpiece Collection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[4px] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Artisanal Handcrafted Embroidery"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/90 bg-black/70 backdrop-blur-md p-4 rounded-md border border-white/20">
                <div>
                  <span className="text-[#FEF2F2] font-semibold uppercase tracking-wider block">Artisan Signature</span>
                  <span className="text-white font-medium">350+ Hours of Pure Handwork</span>
                </div>
                <span className="text-white font-mono font-bold">100% Heirloom Silk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
