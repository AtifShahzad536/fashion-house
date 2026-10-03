import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, Scissors, Ruler, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Select Design Cut',
    desc: 'Choose from 24-kali flared skirts, box pleats, classic sweetheart necklines, or structured corsets.',
    icon: Scissors,
  },
  {
    step: '02',
    title: 'Custom Fabric & Color',
    desc: 'Select from 80g pure raw silks, micro-velvet, or metallic organza in personalized royal hues.',
    icon: Palette,
  },
  {
    step: '03',
    title: 'Artisanal Embroidery',
    desc: 'Pick your embellishment intensity: Imperial zardozi, authentic gotapatti, or delicate crystals.',
    icon: Sparkles,
  },
  {
    step: '04',
    title: 'Bespoke Measurements',
    desc: 'Submit your exact body measurements guided by our master tailor visual fitting handbook.',
    icon: Ruler,
  },
];

export default function CustomizeTeaser() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-bridal-border relative overflow-hidden">
      {/* Background Subtle Luxe Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bridal-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bridal-blush/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-card overflow-hidden bg-bridal-cream border border-bridal-border shadow-luxury-lg">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                alt="Custom Bridal Lehenga Craftsmanship"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bridal-charcoal/80 via-transparent to-transparent" />

              {/* Floating Customizer Badge */}
              <div className="absolute bottom-6 inset-x-6 p-4 bg-white/95 backdrop-blur-md rounded-card border border-bridal-border shadow-luxury">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#991B1B] block">
                      Interactive Atelier Studio
                    </span>
                    <h4 className="text-sm font-serif font-semibold text-bridal-charcoal">
                      Shahzadi Bespoke Configurator
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 bg-[#111827] text-white text-xs font-semibold rounded-md">
                    Live Calculation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Process & CTA */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF2F2] text-[#991B1B] rounded-md border border-[#FECACA] text-xs font-semibold uppercase tracking-widest">
                <Sparkles size={13} />
                <span>Made-To-Measure Haute Couture</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bridal-charcoal font-normal leading-tight">
                Design Your Dream Bridal Lehenga in 4 Simple Steps
              </h2>

              <p className="text-xs sm:text-sm text-bridal-mutedText font-light leading-relaxed">
                No two brides are alike. Our proprietary Customizer Studio allows you to customize every inch of your lehenga—from skirt flair and choli cuts to neckline depth, custom dye shades, and monogrammed wedding date embroidery.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-[#F9FAFB] border border-bridal-border rounded-card hover:border-[#111827] hover:bg-white transition duration-300 space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-md bg-white border border-bridal-border flex items-center justify-center text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition">
                        <IconComponent size={18} />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#991B1B]">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="font-serif text-base text-bridal-charcoal font-medium group-hover:text-[#991B1B] transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-bridal-mutedText leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/customize/atelier"
                className="px-8 py-4 bg-[#111827] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold uppercase tracking-luxury rounded-btn shadow-luxury transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Launch Bespoke Customizer</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/shop"
                className="px-6 py-4 bg-white hover:bg-[#F3F4F6] border border-bridal-border text-bridal-charcoal text-xs sm:text-sm font-medium uppercase tracking-luxury rounded-btn transition"
              >
                Learn How Customization Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
