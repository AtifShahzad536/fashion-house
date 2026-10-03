import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const collections = [
  {
    title: 'Bridal Couture',
    subtitle: 'Crimson Velvet & Heirlooms',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    link: '/shop?occasion=Bridal',
    badge: 'Flagship Collection',
  },
  {
    title: 'Walima Splendor',
    subtitle: 'Champagne & Rose Gold',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
    link: '/shop?occasion=Walima',
    badge: 'Modern Elegance',
  },
  {
    title: 'Mehndi & Mayun',
    slug: 'mehndi-mayun',
    subtitle: 'Saffron Sunshine & Gota',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
    link: '/shop?occasion=Mehndi',
    badge: 'Artisanal Festival',
  },
  {
    title: 'Engagement & Reception',
    subtitle: 'Pastel Organza & Pearls',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    link: '/shop?occasion=Engagement',
    badge: 'Bespoke Nikah',
  },
  {
    title: 'Luxury Festive',
    subtitle: 'Banarasi Brocade Cholis',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    link: '/shop?occasion=Party%20Wear',
    badge: 'Festive Glamour',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
            Curated Chapters of Elegance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
            Signature Bridal Collections
          </h2>
          <p className="text-xs sm:text-sm text-bridal-mutedText font-light leading-relaxed">
            Every collection is an homage to centuries of royal Mughal heritage, meticulously reimagined for the contemporary bride.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {collections.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="group relative h-96 sm:h-[420px] rounded-[4px] overflow-hidden bg-bridal-charcoal border border-bridal-border block transition-all duration-300 hover:shadow-luxury-lg hover:border-[#991B1B]"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bridal-charcoal/90 via-bridal-charcoal/30 to-transparent" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-0.5 bg-bridal-charcoal/70 backdrop-blur-md border border-white/20 text-white text-[9px] uppercase tracking-wider rounded-[4px]">
                  {item.badge}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 space-y-1 transform transition-transform duration-300">
                <p className="text-[11px] text-[#FEF2F2] font-medium tracking-wide">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-lg text-white font-medium group-hover:text-white transition">
                  {item.title}
                </h3>

                <div className="pt-2 flex items-center gap-1 text-[11px] text-white/80 group-hover:text-white font-semibold uppercase tracking-wider">
                  <span>Explore Edit</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
