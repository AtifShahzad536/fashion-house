import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const occasions = [
  {
    title: 'The Grand Barat',
    subtitle: 'Heirloom Crimson & 24-Kali Royal Silhouettes',
    description: 'Intricately wrought antique zardozi on deep Italian micro-velvet designed for the main ceremony.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    link: '/shop?occasion=Bridal',
    gridClass: 'md:col-span-2 md:row-span-2 h-[480px] md:h-[580px]',
  },
  {
    title: 'The Walima Reception',
    subtitle: 'Champagne, Silver Lace & Crystal Drapes',
    description: 'Ethereal metallic organza with cascading Swarovski drops for evening splendour.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    link: '/shop?occasion=Walima',
    gridClass: 'h-[280px]',
  },
  {
    title: 'Mehndi & Mayun Nights',
    subtitle: 'Saffron Silk & Gotapatti Motifs',
    description: 'Playful radiance woven with pure raw silk and traditional mirrorwork.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=85',
    link: '/shop?occasion=Mehndi',
    gridClass: 'h-[280px]',
  },
];

export default function ShopByOccasion() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
            Occasion Wardrobe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
            Dressing Every Celebration
          </h2>
          <p className="text-xs sm:text-sm text-bridal-mutedText font-light">
            From the joyful yellow rhythms of Mehndi to the solemn grandeur of the Barat stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {occasions.map((occ, idx) => (
            <Link
              key={idx}
              to={occ.link}
              className={`group relative rounded-[4px] overflow-hidden bg-bridal-charcoal border border-bridal-border block transition-all duration-300 hover:shadow-luxury-lg hover:border-[#991B1B] ${occ.gridClass}`}
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bridal-charcoal/95 via-bridal-charcoal/40 to-transparent" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#991B1B] group-hover:text-white transition-all">
                <ArrowUpRight size={18} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FEF2F2] block">
                  {occ.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium group-hover:text-white transition">
                  {occ.title}
                </h3>
                <p className="text-xs text-white/80 font-light leading-relaxed max-w-md hidden sm:block">
                  {occ.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
