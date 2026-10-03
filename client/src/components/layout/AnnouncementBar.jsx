import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, HeartHandshake } from 'lucide-react';

const announcements = [
  { text: 'Complimentary Worldwide Express Bridal Delivery on Orders Over PKR 150,000', icon: Globe },
  { text: 'Exclusive 2026 Bridal & Haute Couture Collection Now Available', icon: Sparkles },
  { text: 'Virtual Bridal Styling Consultations Available with Master Designers', icon: HeartHandshake },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="bg-[#111827] text-[#F9FAFB] py-2 px-4 text-xs tracking-wider border-b border-white/10 transition-all duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-white font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] animate-pulse"></span>
          <span>FASHION HOUSE SIALKOT</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 text-center transition-all duration-500">
          <CurrentIcon size={14} className="text-[#991B1B] flex-shrink-0" />
          <span className="font-light tracking-wide text-white/90 truncate max-w-[320px] sm:max-w-md md:max-w-none">
            {announcements[currentIndex].text}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] text-white/70">
          <span>HELPLINE: +92 52 4567 890</span>
          <span>|</span>
          <span className="text-white hover:text-white transition">ONLINE BRIDAL CONCIERGE</span>
        </div>
      </div>
    </div>
  );
}
