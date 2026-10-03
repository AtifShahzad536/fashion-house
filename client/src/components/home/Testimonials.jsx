import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: 'Dr. Fatima Tariq',
    city: 'London, UK',
    occasion: 'Barat Bridal Ceremony',
    rating: 5,
    title: 'An Heirloom Masterpiece Beyond Expectations',
    review:
      'I ordered the Shahzadi Begum Crimson Velvet Lehenga customized with our wedding date monogrammed on the belt. From the virtual measurement fitting to receiving the insured bridal package in London, the quality of handworked zardozi was sensational. Everyone was stunned on my wedding day!',
    outfit: 'Shahzadi Begum Velvet Bridal',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Aaminah Siddiqui',
    city: 'Dubai, UAE',
    occasion: 'Walima Grand Reception',
    rating: 5,
    title: 'Flawless Fit & Ethereal Champagne Shine',
    review:
      'The Nur-e-Jahan champagne rose gold lehenga looked like poetry in motion under the ballroom chandelier lights. The 3D customizer helped me select the exact French veil drape I wanted. Truly world-class craftsmanship from Lahore Atelier.',
    outfit: 'Nur-e-Jahan Walima Couture',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Zoya Chaudhry',
    city: 'Lahore, Pakistan',
    occasion: 'Mehndi Festivities',
    rating: 5,
    title: 'The Saffron Kalidar was the Star of the Night',
    review:
      'The gotapatti work, mirror embellishments, and rich raw silk drape were absolutely breathtaking. The double dupatta style with custom border width completed the traditional bride look perfectly. Thank you Zurielle team!',
    outfit: 'Jahanara Saffron Kalidar',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-bridal-ivory border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
            Real Atelier Brides
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
            Love Letters & Wedding Stories
          </h2>
          <p className="text-xs sm:text-sm text-bridal-mutedText font-light">
            Read firsthand experiences from brides across London, Dubai, New York, and Lahore who wore Zurielle on their biggest day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white border border-bridal-border rounded-[4px] hover:border-[#111827] hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <h3 className="font-serif text-base text-bridal-charcoal font-semibold">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-bridal-mutedText leading-relaxed italic">
                  {rev.review}
                </p>
              </div>

              {/* Bride Info */}
              <div className="pt-4 border-t border-bridal-border flex items-center gap-3">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-bridal-charcoal">{rev.name}</h4>
                    <CheckCircle2 size={12} className="text-green-600" title="Verified Bride" />
                  </div>
                  <p className="text-[11px] text-bridal-mutedText">{rev.city} • {rev.occasion}</p>
                  <span className="text-[10px] text-[#991B1B] font-medium block mt-0.5">
                    Wore: {rev.outfit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
