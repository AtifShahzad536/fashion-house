import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Eye, Sparkles, ShoppingBag } from 'lucide-react';
import { toggleWishlist } from '../../redux/slices/wishlistSlice.js';
import { addToCart } from '../../redux/slices/cartSlice.js';
import { openQuickView } from '../../redux/slices/uiSlice.js';
import toast from 'react-hot-toast';

export default function ProductCard({ product, compact = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const primaryImg = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c';
  const secondaryImg = product.images?.[1]?.url || primaryImg;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (!isWishlisted) {
      toast.success(`Added ${product.name} to your bridal wishlist`);
    } else {
      toast('Removed from wishlist', { icon: '🤍' });
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openQuickView(product));
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.salePrice || product.price,
        image: primaryImg,
        size: 'M',
        qty: 1,
        isCustomized: false,
      })
    );
    toast.success(`${product.name} (Size M) added to bag!`);
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  return (
    <div
      className="group flex flex-col bg-white border border-bridal-border rounded-[4px] overflow-hidden hover:border-[#111827] transition-all duration-300 hover:shadow-luxury h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 4px Radius */}
      <div className={`relative ${compact ? 'aspect-[3/4]' : 'aspect-[3/4]'} w-full overflow-hidden bg-[#F9FAFB] rounded-t-[4px]`}>
        <Link to={`/product/${product.slug}`} className="block w-full h-full relative overflow-hidden">
          {/* Base Primary Image */}
          <img
            src={primaryImg}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Luxury Piano Keys Secondary Image Staggered Wave Transition */}
          {secondaryImg && secondaryImg !== primaryImg && (
            <div className="absolute inset-0 grid grid-cols-6 pointer-events-none overflow-hidden z-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative h-full overflow-hidden transition-transform duration-500 ease-out"
                  style={{
                    transitionDelay: `${isHovered ? i * 40 : (5 - i) * 25}ms`,
                    transform: isHovered ? 'translateY(0%)' : 'translateY(-101%)',
                  }}
                >
                  <img
                    src={secondaryImg}
                    alt={product.name}
                    className="absolute top-0 h-full max-w-none object-cover object-top"
                    style={{
                      width: '600%',
                      left: `-${i * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
          {product.salePrice && (
            <span className={`bg-[#991B1B] text-white ${compact ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2.5 py-0.5'} uppercase font-bold rounded-[4px] tracking-wider shadow-sm animate-pulse`}>
              {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
            </span>
          )}
          {product.isNewArrival && !product.salePrice && (
            <span className={`bg-[#111827] text-white ${compact ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2.5 py-0.5'} uppercase font-semibold rounded-[4px] tracking-wider`}>
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 ${compact ? 'p-1.5' : 'p-2'} rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-[#111827] text-red-500 scale-110 shadow-md'
              : 'bg-white/90 text-[#111827] hover:bg-[#111827] hover:text-white'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart size={compact ? 14 : 16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Bottom Hover Action Overlay */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 ${compact ? 'py-1.5 text-[10px]' : 'py-2.5 text-[11px]'} bg-[#111827] hover:bg-[#991B1B] text-white font-semibold uppercase tracking-wider rounded-[4px] backdrop-blur-md flex items-center justify-center gap-1 transition`}
          >
            <ShoppingBag size={compact ? 12 : 13} />
            <span>{compact ? 'Add' : 'Add to Bag'}</span>
          </button>
          <button
            onClick={handleQuickView}
            className={`${compact ? 'p-1.5' : 'p-2.5'} bg-white/90 hover:bg-white text-[#111827] rounded-[4px] backdrop-blur-md transition`}
            title="Quick View"
          >
            <Eye size={compact ? 13 : 15} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className={`${compact ? 'p-3' : 'p-4'} flex-1 flex flex-col justify-between space-y-2`}>
        <div>
          <div className={`flex items-center justify-between ${compact ? 'text-[10px]' : 'text-[11px]'} text-[#991B1B] uppercase tracking-wider font-semibold`}>
            <span>{product.occasion || 'Bridal Couture'}</span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-bridal-charcoal line-clamp-1 group-hover:text-[#991B1B] transition mt-1`}>
              {product.name}
            </h3>
          </Link>

          <p className={`${compact ? 'text-[10px]' : 'text-[11px]'} text-bridal-mutedText line-clamp-1 mt-0.5`}>
            {product.fabric || 'Pure Raw Silk'}
          </p>
        </div>

        {/* Pricing & View Details CTA */}
        <div className="pt-2 border-t border-bridal-border/60 flex items-center justify-between gap-1.5">
          <div className="min-w-0 flex flex-col justify-center">
            {product.salePrice ? (
              <div className="flex flex-col">
                <span className={`${compact ? 'text-xs' : 'text-[13px] sm:text-sm'} font-bold text-[#991B1B] leading-tight whitespace-nowrap`}>
                  {formatPrice(product.salePrice)}
                </span>
                <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} text-gray-400 line-through leading-tight whitespace-nowrap mt-0.5`}>
                  {formatPrice(product.price)}
                </span>
              </div>
            ) : (
              <span className={`${compact ? 'text-xs' : 'text-[13px] sm:text-sm'} font-semibold text-bridal-charcoal leading-tight whitespace-nowrap`}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.slug}`}
            className={`flex-shrink-0 whitespace-nowrap ${
              compact ? 'px-2 py-1 text-[9px]' : 'px-2.5 sm:px-3 py-1.5 text-[10px]'
            } bg-[#111827] hover:bg-[#991B1B] text-white font-semibold uppercase tracking-wider rounded-[4px] transition shadow-sm inline-flex items-center gap-1`}
          >
            <span>{compact ? 'Details' : 'View Details'}</span>
            <span className="text-xs leading-none">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
