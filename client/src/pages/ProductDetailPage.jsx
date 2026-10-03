import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Share2,
  Ruler,
  Truck,
  ShieldCheck,
  ChevronRight,
  Star,
  Check,
  RotateCcw,
  Maximize2,
  Scissors,
  Award,
  PackageCheck,
  Clock,
} from 'lucide-react';
import api from '../services/api.js';
import { addToCart } from '../redux/slices/cartSlice.js';
import { toggleWishlist } from '../redux/slices/wishlistSlice.js';
import SizeChartModal from '../components/shop/SizeChartModal.jsx';
import ProductReviews from '../components/shop/ProductReviews.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });

  // Customization & Sizing states
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('craftsmanship'); // 'craftsmanship' | 'fabric' | 'shipping' | 'care'

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { currency, currencyRate } = useSelector((state) => state.ui);

  const isWishlisted = product ? wishlistItems.some((item) => item._id === product._id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchProductDetails();
  }, [slug]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/products/${slug}`);
      if (data.success && data.data) {
        setProduct(data.data);
        if (data.data.colors && data.data.colors.length > 0) {
          setSelectedColor(data.data.colors[0]);
        }
        // Fetch related products
        let related = [];
        try {
          const relatedRes = await api.get(`/products?occasion=${encodeURIComponent(data.data.occasion || '')}&limit=8`);
          if (relatedRes.data.success && relatedRes.data.products?.length > 0) {
            related = relatedRes.data.products.filter((p) => p._id !== data.data._id).slice(0, 4);
          }
        } catch (e) {
          console.error('Related query failed:', e);
        }
        if (related.length === 0) {
          try {
            const allRes = await api.get('/products?limit=8');
            if (allRes.data.success) {
              related = (allRes.data.products || []).filter((p) => p._id !== data.data._id).slice(0, 4);
            }
          } catch (e) {
            console.error('Fallback query failed:', e);
          }
        }
        setRelatedProducts(related);
      }
    } catch (err) {
      console.error('Error fetching product detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images?.[0]?.url,
        size: selectedSize,
        qty: quantity,
        isCustomized: false,
      })
    );
    toast.success(`${product.name} (Size ${selectedSize}) added to your bridal bag!`);
  };

  const handleCustomizeLaunch = () => {
    navigate(`/customize/${product._id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this breathtaking bridal lehenga from Fashion House Sialkot: ${product.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-bridal-ivory flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#111827] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-sm text-[#111827]">Loading Atelier Couture Masterpiece...</p>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c' }];

  return (
    <>
      <Helmet>
        <title>{product.name} | Fashion House Sialkot</title>
        <meta name="description" content={product.shortDescription || product.description} />
      </Helmet>

      <div className="bg-[#FAF8F5] min-h-screen pb-24">
        {/* Breadcrumbs Navigation */}
        <div className="bg-white border-b border-gray-200 py-3.5">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[11px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Link to="/" className="hover:text-[#991B1B] transition">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-[#991B1B] transition">Collections</Link>
              <span>/</span>
              <Link to={`/shop?occasion=${product.occasion}`} className="hover:text-[#991B1B] transition">
                {product.occasion}
              </Link>
              <span>/</span>
              <span className="text-[#111827] font-semibold truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ========================================================= */}
            {/* LEFT: MULTI-IMAGE THUMBNAIL GALLERY & HIGH-RES ZOOM */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails Column */}
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 sm:w-20 aspect-[3/4] rounded-[4px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#111827] shadow-sm ring-1 ring-[#111827]'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Interactive Zoom */}
              <div
                className="relative flex-1 aspect-[3/4] rounded-[4px] overflow-hidden bg-white border border-gray-200 cursor-crosshair group shadow-sm"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={images[selectedImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-all duration-200"
                />

                {/* Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 pointer-events-none">
                  {product.salePrice && (
                    <span className="bg-[#991B1B] text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-[4px] tracking-wider shadow-sm animate-pulse">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </span>
                  )}
                  <span className="bg-[#111827] text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded-[4px] tracking-wider shadow-sm">
                    {product.occasion} Couture
                  </span>
                </div>

                {/* Floating Fullscreen / Zoom Indicator */}
                <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-[4px] text-white text-[11px] font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={13} />
                  <span>Hover to Zoom Texture</span>
                </div>

                {/* High-Resolution Zoom Lens Layer */}
                {isZoomed && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                    style={{
                      backgroundImage: `url(${images[selectedImageIndex]?.url})`,
                      backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      backgroundSize: '240%',
                    }}
                  />
                )}
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT: DETAILS, SIZING & CLEAN NON-WRAPPING CTA CONTROLS */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-[4px] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-4">
                {/* SKU & Reviews */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-3">
                  <span className="font-mono text-[#991B1B] font-semibold tracking-wider">
                    SKU: {product.sku}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[#111827] font-semibold text-[11px]">
                      {product.rating || 5.0} ({product.numReviews || 12} Verified Reviews)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal leading-tight">
                  {product.name}
                </h1>

                {/* Pricing Block */}
                <div className="pt-1 flex items-baseline flex-wrap gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#991B1B]">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[11px] bg-red-50 text-[#991B1B] font-bold px-2 py-0.5 rounded-[4px]">
                        Save {formatPrice(product.price - product.salePrice)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                  {product.shortDescription || product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] flex items-center justify-between">
                      <span>Color Swatch</span>
                      <span className="font-normal text-gray-500 lowercase first-letter:uppercase">{selectedColor?.name}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col)}
                          title={col.name}
                          style={{ backgroundColor: col.hex }}
                          className={`w-7 h-7 rounded-full border border-black/15 shadow-sm transition-all flex items-center justify-center ${
                            selectedColor?.name === col.name
                              ? 'ring-2 ring-offset-2 ring-[#111827] scale-110'
                              : 'hover:scale-105'
                          }`}
                        >
                          {selectedColor?.name === col.name && (
                            <Check size={12} className={col.name.includes('Ivory') || col.name.includes('Silver') ? 'text-black' : 'text-white'} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Standard Size Selector + Size Chart Link */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
                      Standard Sizing
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSizeChartOpen(true)}
                      className="text-xs text-[#991B1B] hover:text-[#7F1D1D] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Ruler size={13} />
                      <span>View Sizing Chart</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-semibold rounded-[4px] border transition ${
                          selectedSize === size
                            ? 'bg-[#111827] text-white border-[#111827] shadow-sm'
                            : 'bg-white text-[#111827] border-gray-200 hover:border-[#111827]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Action Buttons Container (Clean, Single Line, No Wrapping) */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Quantity Counter */}
                    <div className="flex items-center border border-gray-200 rounded-[4px] bg-[#F9FAFB] h-12 flex-shrink-0">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-3 h-full text-base font-semibold text-[#111827] hover:text-[#991B1B] disabled:opacity-30 transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#111827]">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 h-full text-base font-semibold text-[#111827] hover:text-[#991B1B] transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Bag Button (Single Line, Never Wraps) */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] shadow-sm transition inline-flex items-center justify-center gap-2 px-4 whitespace-nowrap"
                    >
                      <ShoppingBag size={15} className="flex-shrink-0" />
                      <span>Add to Bridal Bag</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => {
                        dispatch(toggleWishlist(product));
                        toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', { icon: '🤍' });
                      }}
                      className={`w-12 h-12 flex-shrink-0 rounded-[4px] border transition flex items-center justify-center ${
                        isWishlisted
                          ? 'bg-[#111827] text-red-500 border-[#111827]'
                          : 'bg-white border-gray-200 text-[#111827] hover:border-[#991B1B] hover:text-[#991B1B]'
                      }`}
                      title="Wishlist"
                      aria-label="Wishlist"
                    >
                      <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      className="w-12 h-12 flex-shrink-0 rounded-[4px] border border-gray-200 bg-white text-[#111827] hover:border-[#991B1B] hover:text-[#991B1B] transition flex items-center justify-center"
                      title="Share"
                      aria-label="Share"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* 3D Bespoke Customizer Option Banner */}
                  <button
                    onClick={handleCustomizeLaunch}
                    className="w-full h-11 bg-white hover:bg-[#111827] text-[#111827] hover:text-white border border-[#111827] text-[11px] font-semibold uppercase tracking-wider rounded-[4px] transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Scissors size={14} />
                    <span>Customize in 3D Bespoke Atelier</span>
                  </button>
                </div>

                {/* Modern Luxury Trust Feature Strip (Clean, Non-bulky) */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-gray-600">
                  <div className="flex items-start gap-2.5 p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-100">
                    <Truck size={16} className="text-[#991B1B] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#111827] block">Insured Global Delivery</span>
                      <span className="text-[10px] text-gray-400">DHL Express door-to-door</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 bg-[#F9FAFB] rounded-[4px] border border-gray-100">
                    <ShieldCheck size={16} className="text-[#991B1B] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#111827] block">Muslin Preservation</span>
                      <span className="text-[10px] text-gray-400">Archival garment box included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TABBED SPECIFICATIONS & ARTISANAL CRAFTSMANSHIP DETAILS */}
          {/* ========================================================= */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 pb-6 border-b border-gray-200 justify-center sm:justify-start">
              {[
                { id: 'craftsmanship', label: 'Artisanal Craftsmanship' },
                { id: 'fabric', label: 'Fabric & Specifications' },
                { id: 'shipping', label: 'Worldwide Delivery' },
                { id: 'care', label: 'Preservation & Care' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[4px] transition ${
                    activeTab === tab.id
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:text-[#111827] hover:border-[#111827]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Panes */}
            <div className="py-6 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl space-y-4">
              {activeTab === 'craftsmanship' && (
                <div className="space-y-4 animate-in fade-in">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    The Art of Mughal Embroidery & Heirloom Silhouettes
                  </h3>
                  <p>
                    The <strong className="text-[#111827]">{product.name}</strong> is crafted over 350 painstaking hours by generational master ustaads in our heritage Lahore workshop. Each panel is individually stretched on royal addas (wooden embroidery frames) and embellished using pure gold and silver bullion, kora, dabka, and real cut-glass sequins.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-white border border-gray-200 rounded-[4px]">
                      <span className="font-semibold text-[#111827] block mb-1">24-Kali Flair</span>
                      <span className="text-xs text-gray-500">Sweeping 6-meter circumference with internal multi-tiered structured cancan.</span>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-[4px]">
                      <span className="font-semibold text-[#111827] block mb-1">Hand-Cut Motifs</span>
                      <span className="text-xs text-gray-500">Floral vines and Mughal mehrab archways inspired by historical royal motifs.</span>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-[4px]">
                      <span className="font-semibold text-[#111827] block mb-1">Scalloped Borders</span>
                      <span className="text-xs text-gray-500">Hand-finished scalloped edge on both dupattas with pearl droplet tassels.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-3 animate-in fade-in">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    Material & Sourcing Purity
                  </h3>
                  <p>
                    <strong className="text-[#111827]">Base Fabric:</strong> {product.fabric}
                  </p>
                  <p>
                    <strong className="text-[#111827]">Embroidery Work:</strong> {product.embroideryWork}
                  </p>
                  <p>
                    <strong className="text-[#111827]">Ensemble Components:</strong> {product.specifications?.components || 'Lehenga (Skirt), Choli (Blouse), Dupatta (Veil)'}
                  </p>
                  <p>
                    <strong className="text-[#111827]">Artisanal Origin:</strong> {product.specifications?.origin || 'Handcrafted in Lahore, Pakistan'}
                  </p>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3 animate-in fade-in">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    Global Express Bridal Delivery
                  </h3>
                  <p>
                    Because each bridal lehenga is handcrafted and fitted with meticulous attention to detail, the standard production timeline is <strong className="text-[#111827]">{product.deliveryTimeline || '4 to 6 weeks'}</strong>.
                  </p>
                  <p>
                    All international bridal parcels are shipped with <strong className="text-[#111827]">DHL Express</strong> fully insured against loss or damage with live door-to-door tracking.
                  </p>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-3 animate-in fade-in">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    Museum-Grade Preservation Instructions
                  </h3>
                  <p>
                    • {product.specifications?.care || 'Strictly Professional Bridal Dry Clean Only.'}
                  </p>
                  <p>
                    • Store only in the provided breathable unbleached muslin garment bag. Do not store in plastic covers.
                  </p>
                  <p>
                    • Keep away from direct perfumes, hairsprays, and moisture to maintain pure zari and dabka luster.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* VERIFIED BRIDE CUSTOMER REVIEWS */}
          {/* ========================================================= */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal mb-8">
              Verified Bride Experiences
            </h3>
            <ProductReviews product={product} />
          </div>

          {/* ========================================================= */}
          {/* RELATED HAUTE COUTURE PIECES (YOU MAY ALSO ADORE) */}
          {/* ========================================================= */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
                    Complementary Pieces
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal">
                    You May Also Adore
                  </h3>
                </div>
                <Link
                  to={`/shop?occasion=${product.occasion}`}
                  className="text-xs font-semibold text-[#111827] hover:text-[#991B1B] flex items-center gap-1 transition"
                >
                  <span>View All {product.occasion}</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct._id} product={relProduct} compact={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sizing Chart Modal */}
      <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
    </>
  );
}
