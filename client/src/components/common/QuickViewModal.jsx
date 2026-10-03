import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { X, Sparkles, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { closeQuickView } from '../../redux/slices/uiSlice.js';
import { addToCart } from '../../redux/slices/cartSlice.js';
import { toggleWishlist } from '../../redux/slices/wishlistSlice.js';
import toast from 'react-hot-toast';

export default function QuickViewModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quickViewProduct } = useSelector((state) => state.ui);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlistItems.some((item) => item._id === quickViewProduct._id);
  const images = quickViewProduct.images || [
    { url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c' },
  ];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: quickViewProduct._id,
        name: quickViewProduct.name,
        price: quickViewProduct.salePrice || quickViewProduct.price,
        image: images[0]?.url,
        size: selectedSize,
        qty: 1,
        isCustomized: false,
      })
    );
    toast.success(`${quickViewProduct.name} (Size ${selectedSize}) added to bag!`);
    dispatch(closeQuickView());
  };

  const handleCustomize = () => {
    dispatch(closeQuickView());
    navigate(`/customize/${quickViewProduct._id}`);
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bridal-charcoal/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-bridal-border rounded-card shadow-luxury-lg overflow-hidden my-8 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeQuickView())}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-bridal-charcoal hover:text-bridal-gold shadow-md transition"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Side */}
          <div className="p-6 bg-bridal-cream/40 flex flex-col justify-between space-y-4">
            <div className="aspect-[3/4] w-full rounded-card overflow-hidden bg-white border border-bridal-border">
              <img
                src={images[selectedImageIndex]?.url}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-18 rounded-md overflow-hidden border-2 transition ${
                      selectedImageIndex === idx ? 'border-bridal-gold' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-bridal-gold font-semibold uppercase tracking-wider">
                <span>{quickViewProduct.occasion} Couture</span>
                <span>SKU: {quickViewProduct.sku}</span>
              </div>

              <h2 className="text-xl font-serif text-bridal-charcoal font-semibold mt-1">
                {quickViewProduct.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-3">
                {quickViewProduct.salePrice ? (
                  <>
                    <span className="text-xl font-semibold text-bridal-charcoal">
                      {formatPrice(quickViewProduct.salePrice)}
                    </span>
                    <span className="text-sm text-bridal-lightText line-through">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-bridal-charcoal">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                )}
              </div>

              <p className="text-xs text-bridal-mutedText mt-3 leading-relaxed line-clamp-3">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Fabric & Embroidery summary */}
              <div className="mt-4 p-3 bg-bridal-cream/60 border border-bridal-border rounded-md text-xs space-y-1">
                <p>
                  <strong className="text-bridal-charcoal">Fabric:</strong>{' '}
                  <span className="text-bridal-mutedText">{quickViewProduct.fabric}</span>
                </p>
                <p>
                  <strong className="text-bridal-charcoal">Work:</strong>{' '}
                  <span className="text-bridal-mutedText">{quickViewProduct.embroideryWork}</span>
                </p>
              </div>

              {/* Standard Sizes */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-bridal-charcoal uppercase tracking-wider mb-2">
                  Select Standard Sizing
                </label>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition ${
                        selectedSize === size
                          ? 'bg-bridal-charcoal text-white border-bridal-charcoal'
                          : 'bg-white text-bridal-charcoal border-bridal-border hover:border-bridal-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-gray-200">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[6px] flex items-center justify-center gap-2 shadow-md transition"
              >
                <ShoppingBag size={14} />
                <span>Add to Shopping Bag</span>
              </button>

              <Link
                to={`/product/${quickViewProduct.slug}`}
                onClick={() => dispatch(closeQuickView())}
                className="w-full py-3 bg-white hover:bg-gray-100 border border-gray-200 text-[#111827] hover:text-[#991B1B] text-xs font-semibold uppercase tracking-widest rounded-[6px] flex items-center justify-center gap-2 transition"
              >
                <span>View Full Details & Zoom</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
