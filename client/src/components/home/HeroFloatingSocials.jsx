import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  Share2,
  Video,
  Music2,
  Globe,
} from 'lucide-react';
import api from '../../services/api.js';

const getPlatformIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case 'whatsapp':
      return <MessageCircle size={18} />;
    case 'instagram':
      return <Instagram size={18} />;
    case 'facebook':
      return <Facebook size={18} />;
    case 'pinterest':
      return <Share2 size={18} />;
    case 'tiktok':
      return <Music2 size={18} />;
    case 'phone':
      return <Phone size={18} />;
    case 'youtube':
      return <Video size={18} />;
    default:
      return <Globe size={18} />;
  }
};

export default function HeroFloatingSocials() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await api.get('/cms/social-links');
        if (data.success && data.data) {
          setLinks(data.data.filter((item) => item.isActive));
        }
      } catch (err) {
        console.error('Error fetching hero social links:', err);
      }
    };

    fetchLinks();
  }, []);

  if (!links || links.length === 0) return null;

  return (
    <div className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto select-none animate-in fade-in slide-in-from-left duration-500">
      {links.map((link) => (
        <a
          key={link._id || link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.title}
          aria-label={link.title}
          className="group relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-[#991B1B] border border-white/30 hover:border-[#991B1B] text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          {getPlatformIcon(link.platform)}

          {/* Left-Side Floating Tooltip */}
          <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#111827] text-white text-[11px] font-semibold tracking-wider uppercase rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 hidden sm:block">
            {link.title}
          </span>
        </a>
      ))}
    </div>
  );
}
