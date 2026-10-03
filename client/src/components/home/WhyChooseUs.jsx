import React from 'react';
import { Gem, Scissors, Ruler, Globe2, ShieldCheck, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    title: 'Certified Pure Fabrics',
    desc: 'Woven in authentic 80g pure raw silks, Italian micro-velvet, and luminous metallic tissue organza.',
    icon: Gem,
  },
  {
    title: '300+ Hours Handcrafted',
    desc: 'Each bridal ensemble is hand-worked with heirloom zardozi, antique dabka, and real freshwater pearls.',
    icon: Scissors,
  },
  {
    title: 'Made-To-Measure Fit',
    desc: 'Comprehensive custom measurement profiling ensuring flawless silhouette and comfortable ceremony drape.',
    icon: Ruler,
  },
  {
    title: 'Worldwide Express Courier',
    desc: 'Insured international bridal delivery with live stitching status tracking from atelier to your doorstep.',
    icon: Globe2,
  },
  {
    title: '1-on-1 VIP Bridal Stylist',
    desc: 'Dedicated video consultations with couture designers to assist your jewelry & fabric pairing.',
    icon: HeartHandshake,
  },
  {
    title: 'Authenticity Guarantee',
    desc: 'Signed certificate of artisanal origin and dedicated museum-grade breathable preservation bag.',
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-bridal-ivory border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
            The Zurielle Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
            Why Discerning Brides Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-bridal-mutedText font-light leading-relaxed">
            From the initial sketch to the final fitting stitch, experience an unmatched standard of bridal couture luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white border border-bridal-border rounded-[4px] hover:border-[#111827] hover:shadow-luxury transition-all duration-300 space-y-3 group"
              >
                <div className="w-11 h-11 rounded-[4px] bg-[#F9FAFB] border border-bridal-border flex items-center justify-center text-[#111827] group-hover:bg-[#111827] group-hover:text-white transition-all duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-lg text-bridal-charcoal font-medium group-hover:text-[#991B1B] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-bridal-mutedText leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
