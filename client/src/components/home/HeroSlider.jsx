import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroFloatingSocials from './HeroFloatingSocials.jsx';

const NUM_SLICES = 10; // 10 Piano key vertical slices

export default function HeroSlider({ slides = [] }) {
  const defaultSlides = [
    {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    },
    {
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=2000&q=85',
    },
    {
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=2000&q=85',
    },
  ];

  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goToSlide = useCallback((nextIdx) => {
    if (nextIdx === currentIndex || isTransitioning) return;
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIdx);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
      setPrevIndex(nextIdx);
    }, 850);
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % activeSlides.length;
    goToSlide(next);
  }, [currentIndex, activeSlides.length, goToSlide]);

  // Autoplay interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleNext]);

  const currentImage = activeSlides[currentIndex]?.image;
  const prevImage = activeSlides[prevIndex]?.image;

  return (
    <section className="relative w-full h-[75vh] sm:h-[84vh] lg:h-[88vh] bg-[#111827] overflow-hidden select-none">
      {/* 1. Base Layer: Previous Static Slide Image */}
      <div className="absolute inset-0">
        <img
          src={prevImage}
          alt="Bridal Couture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* 2. Top Piano Slice Animation Layer */}
      {isTransitioning && (
        <div className="absolute inset-0 flex z-10 pointer-events-none">
          {[...Array(NUM_SLICES)].map((_, i) => (
            <div
              key={i}
              className="relative h-full overflow-hidden"
              style={{
                width: `${100 / NUM_SLICES}%`,
                transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
                animation: `pianoKeyDrop 700ms cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                animationDelay: `${i * 45}ms`,
              }}
            >
              {/* Inner full-sized image shifted to align with this slice */}
              <div
                className="absolute inset-0 h-full"
                style={{
                  width: `${NUM_SLICES * 100}%`,
                  left: `-${i * 100}%`,
                }}
              >
                <img
                  src={currentImage}
                  alt="Bridal Couture Slide"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Static Active Image (visible once transition finishes) */}
      {!isTransitioning && (
        <div className="absolute inset-0 z-10">
          <img
            src={currentImage}
            alt="Bridal Couture Current"
            className="w-full h-full object-cover object-center scale-102 transition-transform duration-[6000ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* ⭐ Left-Side Floating Social Media Icons ⭐ */}
      <HeroFloatingSocials />

      {/* 4. Single Fixed Bottom-Center Action Button & Minimalist Dots */}
      <div className="absolute bottom-8 sm:bottom-12 inset-x-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* Fixed Wide Transparent Center Button */}
        <Link
          to="/shop"
          className="pointer-events-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px] py-3.5 sm:py-4 bg-black/25 hover:bg-[#991B1B] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.25em] rounded-[6px] border border-white/80 hover:border-[#991B1B] backdrop-blur-md shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group active:scale-98"
        >
          <span>Explore Collections</span>
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
        </Link>

        {/* Minimalist Pagination Dots Directly Below Button */}
        <div className="pointer-events-auto flex items-center justify-center gap-2.5 mt-4">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-400 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-7 h-2 bg-white shadow-lg ring-1 ring-white/60'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/85'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Piano Key Animation Keyframes in CSS */}
      <style>{`
        @keyframes pianoKeyDrop {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
