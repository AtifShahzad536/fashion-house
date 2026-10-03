import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { toggleSearchModal } from '../../redux/slices/uiSlice.js';
import api from '../../services/api.js';

export default function SearchModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchOpen } = useSelector((state) => state.ui);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const popularSearches = [
    'Velvet Bridal',
    'Champagne Walima',
    'Saffron Mehndi',
    'Raw Silk',
    'Zardozi Lehenga',
    'Nikah Ivory',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  // Live search query debounce
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?keyword=${encodeURIComponent(keyword)}&limit=4`);
        setResults(data.products || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  if (!isSearchOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    dispatch(toggleSearchModal(false));
    navigate(`/shop?search=${encodeURIComponent(keyword)}`);
  };

  const handleSelectProduct = (slug) => {
    dispatch(toggleSearchModal(false));
    navigate(`/product/${slug}`);
  };

  const handleTagClick = (tag) => {
    setKeyword(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-[6px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-gray-200 px-6 py-4">
          <Search className="text-[#991B1B] w-5 h-5 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by lehenga name, occasion, fabric (e.g., Velvet, Raw Silk)..."
            className="w-full bg-transparent text-[#111827] placeholder-gray-400 text-base sm:text-lg focus:outline-none"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="text-gray-400 hover:text-[#111827] mr-2 p-1"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={() => dispatch(toggleSearchModal(false))}
            className="p-1 rounded-[6px] text-gray-400 hover:text-[#111827] hover:bg-[#F3F4F6] transition"
          >
            <X size={20} />
          </button>
        </form>

        {/* Quick Suggestions & Results */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Popular Tag Suggestions */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#991B1B] uppercase mb-3">
              <Sparkles size={13} />
              <span>Popular Bridal Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1.5 text-xs bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#111827] border border-gray-200 rounded-[6px] transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Preview */}
          {loading ? (
            <div className="py-8 text-center text-gray-500 text-sm animate-pulse">
              Searching royal archives...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">
                Matching Haute Couture ({results.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3 p-2.5 rounded-[6px] border border-gray-200 hover:border-[#991B1B] hover:bg-[#F9FAFB] transition cursor-pointer group"
                  >
                    <img
                      src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                      alt={product.name}
                      className="w-14 h-18 object-cover rounded-[4px] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#991B1B] font-medium block">
                        {product.occasion}
                      </span>
                      <h4 className="text-sm font-medium text-[#111827] truncate group-hover:text-[#991B1B] transition">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#111827] mt-0.5">
                        PKR {product.price?.toLocaleString()}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-[#991B1B] group-hover:translate-x-1 transition flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : keyword.trim() ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No bespoke bridal pieces found for "<span className="font-semibold text-[#111827]">{keyword}</span>".
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F9FAFB] border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-[4px] text-[10px]">ESC</kbd> to close</span>
          <button
            onClick={handleSearchSubmit}
            className="text-[#111827] hover:text-[#991B1B] font-medium flex items-center gap-1"
          >
            <span>View All Search Results</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
