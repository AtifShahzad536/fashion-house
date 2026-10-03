import React, { useState } from 'react';
import { Bookmark, ExternalLink, Heart, Sparkles, X, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const pinterestPins = [
  {
    id: 1,
    category: 'Bridal Barat',
    title: 'Shahzadi Begum Crimson Velvet Lehenga',
    author: 'Zoya Tariq',
    authorHandle: '@zoyabride',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4.5]',
    likes: 342,
    saves: 189,
    caption: 'Pure Italian micro-velvet hand-worked with heirloom antique dabka and zardozi.',
  },
  {
    id: 2,
    category: 'Walima Drapes',
    title: 'Nur-e-Jahan Champagne Metallic Organza',
    author: 'Aaminah Siddiqui',
    authorHandle: '@aaminah_s',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4]',
    likes: 512,
    saves: 290,
    caption: 'Cascading Swarovski crystal trail paired with delicate scalloped French tulle veil.',
  },
  {
    id: 3,
    category: 'Artisan Details',
    title: 'Heirloom Bullion & Zardozi Close-up',
    author: 'Zurielle Atelier',
    authorHandle: '@zurielleatelier',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/5]',
    likes: 720,
    saves: 440,
    caption: '350 hours of pure micro-embroidery by master artisans in historic Lahore.',
  },
  {
    id: 4,
    category: 'Mehndi Festivities',
    title: 'Jahanara Saffron Gotapatti Kalidar',
    author: 'Mahnoor Khan',
    authorHandle: '@mahnoor_k',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4]',
    likes: 418,
    saves: 215,
    caption: 'Vibrant mustard pure silk adorned with traditional gotapatti and mirror accents.',
  },
  {
    id: 5,
    category: 'Walima Drapes',
    title: 'Ethereal Powder Blue & Silver Tissue',
    author: 'Sarah Jenkins',
    authorHandle: '@sarahj_couture',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4.8]',
    likes: 605,
    saves: 378,
    caption: 'Subtle icy pastels with intricate mukesh dust and hand-set cut dana embellishment.',
  },
  {
    id: 6,
    category: 'Jewelry Pairings',
    title: 'Polki Choker & Emerald Bridal Pairing',
    author: 'Alizeh Studio',
    authorHandle: '@alizeh_style',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4]',
    likes: 295,
    saves: 160,
    caption: 'Antique uncut polki jewels styled with heirloom emerald drops and heavy mathapatti.',
  },
  {
    id: 7,
    category: 'Bridal Barat',
    title: 'Maharani Ruby 24-Kali Royal Flare',
    author: 'Khadija Rehman',
    authorHandle: '@khadija_r',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/4.2]',
    likes: 480,
    saves: 260,
    caption: 'Exquisite 24-kali volume designed for royal walk down the aisle.',
  },
  {
    id: 8,
    category: 'Artisan Details',
    title: 'Dabka Weaving & Tilla Threads',
    author: 'Zurielle Atelier',
    authorHandle: '@zurielleatelier',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    aspect: 'aspect-[3/3.8]',
    likes: 390,
    saves: 210,
    caption: 'Gold bullion wire hand-sewn onto pure raw silk using centuries-old needle art.',
  },
];

export default function SocialGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedPins, setSavedPins] = useState({});
  const [likedPins, setLikedPins] = useState({});
  const [selectedPin, setSelectedPin] = useState(null);

  const categories = ['All', 'Bridal Barat', 'Walima Drapes', 'Mehndi Festivities', 'Artisan Details', 'Jewelry Pairings'];

  const filteredPins = activeCategory === 'All'
    ? pinterestPins
    : pinterestPins.filter((pin) => pin.category === activeCategory);

  const handleSavePin = (pin, e) => {
    e.stopPropagation();
    setSavedPins((prev) => {
      const isSaved = !!prev[pin.id];
      const updated = { ...prev, [pin.id]: !isSaved };
      if (!isSaved) {
        toast.success(`Saved "${pin.title}" to your Bridal Board!`, {
          icon: '📌',
          style: {
            borderRadius: '4px',
            background: '#111827',
            color: '#fff',
            fontSize: '12px',
          },
        });
      } else {
        toast('Removed from saved pins', { icon: '🗑️' });
      }
      return updated;
    });
  };

  const handleLikePin = (pin, e) => {
    e.stopPropagation();
    setLikedPins((prev) => ({
      ...prev,
      [pin.id]: !prev[pin.id],
    }));
  };

  const handleShare = (pin, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Pin link copied to clipboard!');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-bridal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles size={13} />
            <span>Bridal Moodboard & Inspiration</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
            Moments in Couture
          </h2>
          <p className="text-xs sm:text-sm text-bridal-mutedText font-light">
            Explore curated Pinterest-style moodboards, real bride styling, and intricate atelier details.
          </p>
        </div>

        {/* Pinterest Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-[4px] transition duration-200 ${
                activeCategory === cat
                  ? 'bg-[#111827] text-white font-semibold shadow-sm'
                  : 'bg-white text-bridal-mutedText hover:text-bridal-charcoal hover:bg-[#F3F4F6] border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPins.map((pin) => {
            const isSaved = !!savedPins[pin.id];
            const isLiked = !!likedPins[pin.id];

            return (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className="break-inside-avoid group relative bg-white border border-gray-200/80 rounded-[4px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container with Dynamic Height */}
                <div className={`relative w-full ${pin.aspect} overflow-hidden bg-[#F3F4F6]`}>
                  <img
                    src={pin.image}
                    alt={pin.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Pinterest "Save" Button Top-Right */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                    <button
                      onClick={(e) => handleSavePin(pin, e)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-[4px] shadow-md backdrop-blur-md flex items-center gap-1 transition ${
                        isSaved
                          ? 'bg-[#111827] text-white'
                          : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                      }`}
                    >
                      <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-semibold tracking-wider rounded-[4px] border border-white/20">
                      {pin.category}
                    </span>
                  </div>

                  {/* Bottom Hover Action Bar */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleLikePin(pin, e)}
                        className={`p-2 rounded-[4px] bg-white/90 hover:bg-white text-bridal-charcoal backdrop-blur-md shadow-sm transition ${
                          isLiked ? 'text-red-600' : ''
                        }`}
                        title="Like Pin"
                      >
                        <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => handleShare(pin, e)}
                        className="p-2 rounded-[4px] bg-white/90 hover:bg-white text-bridal-charcoal backdrop-blur-md shadow-sm transition"
                        title="Share Pin"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPin(pin);
                      }}
                      className="p-2 rounded-[4px] bg-white/90 hover:bg-white text-bridal-charcoal backdrop-blur-md shadow-sm transition"
                      title="Inspect Pin"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                {/* Card Information Bottom Footer */}
                <div className="p-3 space-y-1.5">
                  <h3 className="text-xs font-medium text-bridal-charcoal line-clamp-1 group-hover:text-[#991B1B] transition">
                    {pin.title}
                  </h3>

                  {/* Author / Tag */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={pin.avatar}
                        alt={pin.author}
                        className="w-5 h-5 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-[11px] text-bridal-mutedText truncate max-w-[120px]">
                        {pin.author}
                      </span>
                    </div>

                    <span className="text-[10px] text-gray-400 font-mono">
                      {pin.saves + (isSaved ? 1 : 0)} saves
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Lightbox for Fullscreen Pin Inspection */}
        {selectedPin && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setSelectedPin(null)}
          >
            <div
              className="relative w-full max-w-3xl bg-white rounded-[4px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPin(null)}
                className="absolute top-3 right-3 z-20 p-2 rounded-[4px] bg-black/60 text-white hover:bg-black transition"
              >
                <X size={18} />
              </button>

              {/* Pin Image */}
              <div className="md:w-1/2 bg-[#111827] flex items-center justify-center overflow-hidden max-h-[450px] md:max-h-none">
                <img
                  src={selectedPin.image}
                  alt={selectedPin.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pin Details */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#991B1B] font-semibold">
                      {selectedPin.category}
                    </span>
                    <button
                      onClick={(e) => handleSavePin(selectedPin, e)}
                      className={`px-4 py-2 text-xs font-semibold rounded-[4px] transition flex items-center gap-1.5 ${
                        savedPins[selectedPin.id]
                          ? 'bg-[#111827] text-white'
                          : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                      }`}
                    >
                      <Bookmark size={14} fill={savedPins[selectedPin.id] ? 'currentColor' : 'none'} />
                      <span>{savedPins[selectedPin.id] ? 'Saved to Board' : 'Save to Board'}</span>
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl text-bridal-charcoal font-normal">
                    {selectedPin.title}
                  </h3>

                  <p className="text-xs text-bridal-mutedText leading-relaxed">
                    {selectedPin.caption}
                  </p>

                  <div className="p-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] flex items-center gap-3">
                    <img
                      src={selectedPin.avatar}
                      alt={selectedPin.author}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-bridal-charcoal">
                        {selectedPin.author}
                      </h4>
                      <p className="text-[11px] text-bridal-mutedText">{selectedPin.authorHandle}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
                  <span className="text-bridal-mutedText font-medium">
                    {selectedPin.likes + (likedPins[selectedPin.id] ? 1 : 0)} Likes • {selectedPin.saves + (savedPins[selectedPin.id] ? 1 : 0)} Saves
                  </span>

                  <button
                    onClick={(e) => handleShare(selectedPin, e)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-bridal-charcoal font-semibold rounded-[4px] flex items-center gap-1.5 transition"
                  >
                    <Share2 size={13} />
                    <span>Share Pin</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
