import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] text-gray-300 border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1 & 2: Brand Heritage */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] text-white font-semibold block">
                ZURIELLE
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#991B1B] uppercase font-semibold block -mt-0.5">
                Atelier Couture Lahore
              </span>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              Purveyors of heirloom South Asian bridal couture, bespoke hand-embroidered lehengas, and made-to-measure wedding trousseaus crafted with generational Mughal mastery.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={14} className="flex-shrink-0 text-[#991B1B]" />
                <span>Flagship Atelier: MM Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="flex-shrink-0 text-[#991B1B]" />
                <span>VIP Concierge: +92 42 3575 8899</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="flex-shrink-0 text-[#991B1B]" />
                <span>Inquiries: couture@zurielleatelier.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Haute Couture
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/shop?occasion=Bridal" className="hover:text-white transition">
                  Bridal Velvet Lehengas
                </Link>
              </li>
              <li>
                <Link to="/shop?occasion=Walima" className="hover:text-white transition">
                  Walima Champagne Edit
                </Link>
              </li>
              <li>
                <Link to="/shop?occasion=Mehndi" className="hover:text-white transition">
                  Mehndi Saffron Kalidars
                </Link>
              </li>
              <li>
                <Link to="/shop?occasion=Engagement" className="hover:text-white transition">
                  Nikah & Engagement Pastels
                </Link>
              </li>
              <li>
                <Link to="/shop?occasion=Party%20Wear" className="hover:text-white transition">
                  Luxury Festive & Cholis
                </Link>
              </li>
              <li>
                <Link to="/shop?newArrival=true" className="hover:text-white transition">
                  New Season Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Master Tailor Fitting & Silhouettes
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-white transition">
                  Live Stitching & Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Book Virtual Bridal Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Heirloom Fabric & Embroidery Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Client Privileges
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/account" className="hover:text-white transition">
                  My Bridal Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/account/wishlist" className="hover:text-white transition">
                  Wishlist & Moodboard
                </Link>
              </li>
              <li>
                <span className="text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#991B1B]" />
                  <span>Insured Global Shipping</span>
                </span>
              </li>
              <li>
                <span className="text-gray-400">Strict Quality Inspection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Global Locations */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ZURIELLE ATELIER COUTURE. All rights reserved.</p>

          <div className="flex items-center gap-6 text-[11px] text-gray-400 font-medium tracking-wider">
            <span>LAHORE ATELIER</span>
            <span>•</span>
            <span>LONDON VIP SUITE</span>
            <span>•</span>
            <span>DUBAI CONCIERGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
