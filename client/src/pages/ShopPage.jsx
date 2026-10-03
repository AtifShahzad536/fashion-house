import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import api from '../services/api.js';
import ProductCard from '../components/common/ProductCard.jsx';
import FilterSidebar from '../components/shop/FilterSidebar.jsx';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State for products and pagination
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter states
  const [selectedOccasions, setSelectedOccasions] = useState(
    searchParams.get('occasion') ? searchParams.get('occasion').split(',') : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState(
    searchParams.get('fabric') ? searchParams.get('fabric').split(',') : []
  );
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('maxPrice') || 600000);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Layout UI states: 2, 3, or 4 columns
  const [columns, setColumns] = useState(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedOccasions.length > 0) params.set('occasion', selectedOccasions.join(','));
    if (selectedFabrics.length > 0) params.set('fabric', selectedFabrics.join(','));
    if (selectedColor) params.set('color', selectedColor);
    if (selectedSize) params.set('size', selectedSize);
    if (priceRange < 600000) params.set('maxPrice', priceRange);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (page > 1) params.set('page', page);

    const searchQuery = searchParams.get('search');
    if (searchQuery) params.set('keyword', searchQuery);

    setSearchParams(params, { replace: true });
    fetchProducts();
  }, [selectedOccasions, selectedFabrics, selectedColor, selectedSize, priceRange, sortBy, page, searchParams.get('search')]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedOccasions.length > 0) params.append('occasion', selectedOccasions.join(','));
      if (selectedFabrics.length > 0) params.append('fabric', selectedFabrics.join(','));
      if (selectedColor) params.append('color', selectedColor);
      if (priceRange) params.append('maxPrice', priceRange);

      if (sortBy === 'price-asc') params.append('sort', 'price-asc');
      if (sortBy === 'price-desc') params.append('sort', 'price-desc');
      if (sortBy === 'rating') params.append('sort', 'rating');

      const searchQuery = searchParams.get('search');
      if (searchQuery) params.append('keyword', searchQuery);

      params.append('page', page);
      params.append('limit', 16);

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setTotalCount(data.totalProducts || 0);
      }
    } catch (err) {
      console.error('Error fetching shop products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedOccasions([]);
    setSelectedFabrics([]);
    setSelectedColor('');
    setSelectedSize('');
    setPriceRange(600000);
    setSortBy('newest');
    setPage(1);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const activeFiltersCount =
    selectedOccasions.length +
    selectedFabrics.length +
    (selectedColor ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (priceRange < 600000 ? 1 : 0);

  // Dynamic grid classes based on chosen column layout
  const getGridColsClass = () => {
    if (columns === 4) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5';
    }
    if (columns === 3) {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5';
    }
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6';
  };

  return (
    <>
      <Helmet>
        <title>Haute Couture Bridal Lehengas & Collections | ZURIELLE ATELIER</title>
        <meta
          name="description"
          content="Browse our complete catalog of handcrafted Pakistani bridal lehengas, Walima gowns, and Mehndi kalidars tailored in pure silk, velvet, and zardozi."
        />
      </Helmet>

      <div className="bg-bridal-ivory min-h-screen pb-20">
        {/* Editorial Top Banner */}
        <div className="bg-[#F9FAFB] border-b border-bridal-border py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            {/* Breadcrumbs */}
            <nav className="text-[11px] uppercase tracking-widest text-bridal-mutedText flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-[#991B1B] transition">Home</Link>
              <span>/</span>
              <span className="text-bridal-charcoal font-semibold">Haute Couture Collections</span>
            </nav>

            <h1 className="font-serif text-3xl sm:text-5xl text-bridal-charcoal font-normal">
              Heirloom Bridal Atelier Catalog
            </h1>
            <p className="text-xs sm:text-sm text-bridal-mutedText max-w-xl mx-auto leading-relaxed">
              Explore master-crafted silhouettes tailored in certified pure silks, authentic dabka zardozi, and museum-grade hand embroidery.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-bridal-border">
            {/* Left: Mobile Filter Button & Product Count */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-bridal-border rounded-[4px] text-xs font-semibold text-bridal-charcoal shadow-sm hover:bg-[#F3F4F6]"
              >
                <SlidersHorizontal size={14} />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <span className="text-xs text-bridal-mutedText">
                Showing <strong className="text-bridal-charcoal font-semibold">{products.length}</strong> of{' '}
                <strong className="text-bridal-charcoal font-semibold">{totalCount}</strong> couture pieces
              </span>
            </div>

            {/* Right: Grid Column Selector & Sort Dropdown */}
            <div className="flex items-center gap-4">
              {/* Grid Column Selector (Desktop Only) */}
              <div className="hidden lg:flex items-center border border-bridal-border rounded-[4px] bg-white p-0.5 shadow-sm">
                <button
                  onClick={() => setColumns(2)}
                  className={`p-1.5 rounded-[3px] transition ${
                    columns === 2
                      ? 'bg-[#111827] text-white'
                      : 'text-gray-500 hover:text-[#111827] hover:bg-gray-100'
                  }`}
                  title="2 Columns View"
                  aria-label="2 Columns View"
                >
                  <Grid2X2 size={16} />
                </button>
                <button
                  onClick={() => setColumns(3)}
                  className={`p-1.5 rounded-[3px] transition ${
                    columns === 3
                      ? 'bg-[#111827] text-white'
                      : 'text-gray-500 hover:text-[#111827] hover:bg-gray-100'
                  }`}
                  title="3 Columns View"
                  aria-label="3 Columns View"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setColumns(4)}
                  className={`p-1.5 rounded-[3px] transition ${
                    columns === 4
                      ? 'bg-[#111827] text-white'
                      : 'text-gray-500 hover:text-[#111827] hover:bg-gray-100'
                  }`}
                  title="4 Columns View"
                  aria-label="4 Columns View"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-[4px] px-4 py-2 pr-8 text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827] shadow-sm cursor-pointer"
                >
                  <option value="newest">Sort By: Newest Releases</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 py-4">
              <span className="text-xs text-gray-500 font-medium">Active Filters:</span>
              {selectedOccasions.map((occ) => (
                <span
                  key={occ}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-[11px] text-[#111827]"
                >
                  {occ}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedOccasions(selectedOccasions.filter((i) => i !== occ))}
                  />
                </span>
              ))}
              {selectedFabrics.map((fab) => (
                <span
                  key={fab}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-[11px] text-[#111827]"
                >
                  {fab}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedFabrics(selectedFabrics.filter((i) => i !== fab))}
                  />
                </span>
              ))}
              {selectedColor && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-[11px] text-[#111827]">
                  Color: {selectedColor}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedColor('')}
                  />
                </span>
              )}
              {selectedSize && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-[11px] text-[#111827]">
                  Size: {selectedSize}
                  <X
                    size={12}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => setSelectedSize('')}
                  />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#991B1B] font-semibold hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Catalog Layout: Left Fixed / Sticky Filter Sidebar + Right Scrollable Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
            {/* Desktop Left Sidebar (Sticky / Fixed - Fully open without internal scrollbar) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start z-10">
              <div className="bg-white border border-gray-200 rounded-[4px] p-5 shadow-sm">
                <FilterSidebar
                  selectedOccasions={selectedOccasions}
                  setSelectedOccasions={setSelectedOccasions}
                  selectedFabrics={selectedFabrics}
                  setSelectedFabrics={setSelectedFabrics}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </aside>

            {/* Products Grid & Pagination */}
            <main className="lg:col-span-9 min-w-0">
              {loading ? (
                <div className={`grid ${getGridColsClass()}`}>
                  {[...Array(columns === 4 ? 8 : 6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] bg-[#F9FAFB] border border-gray-200 rounded-[4px] animate-pulse"
                    />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className={`grid ${getGridColsClass()}`}>
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} compact={columns === 4} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
                    <div className="text-xs text-bridal-mutedText">
                      Showing <strong className="text-bridal-charcoal font-semibold">{products.length}</strong> of{' '}
                      <strong className="text-bridal-charcoal font-semibold">{totalCount}</strong> pieces (Page {page} of {totalPages || 1})
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="inline-flex items-center gap-1 px-3.5 py-2 border border-gray-200 rounded-[4px] text-xs font-semibold bg-white hover:bg-[#F3F4F6] text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        <ChevronLeft size={14} />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages || 1)].map((_, i) => {
                          const pageNum = i + 1;
                          if (
                            totalPages > 7 &&
                            pageNum !== 1 &&
                            pageNum !== totalPages &&
                            Math.abs(pageNum - page) > 1
                          ) {
                            if (pageNum === 2 || pageNum === totalPages - 1) {
                              return (
                                <span key={pageNum} className="px-1 text-xs text-gray-400">
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-9 h-9 rounded-[4px] text-xs font-semibold transition ${
                                page === pageNum
                                  ? 'bg-[#111827] text-white shadow-sm'
                                  : 'bg-white border border-gray-200 hover:border-[#111827] text-[#111827]'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(Math.min(totalPages || 1, page + 1))}
                        disabled={page >= (totalPages || 1)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 border border-gray-200 rounded-[4px] text-xs font-semibold bg-white hover:bg-[#F3F4F6] text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                      >
                        <span>Next</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-20 text-center bg-white border border-gray-200 rounded-[4px] p-8 space-y-4">
                  <h3 className="font-serif text-xl text-[#111827]">No Haute Couture Pieces Match Your Criteria</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Try adjusting your filters, selecting a different occasion or fabric family, or contact our VIP concierge team for bespoke consultations.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] shadow-md transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-[#111827]/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white border-l border-bridal-border p-6 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-bridal-border">
                <h3 className="font-serif text-base font-semibold text-[#111827]">Filter Catalog</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-[#111827]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <FilterSidebar
                  selectedOccasions={selectedOccasions}
                  setSelectedOccasions={setSelectedOccasions}
                  selectedFabrics={selectedFabrics}
                  setSelectedFabrics={setSelectedFabrics}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  onResetFilters={handleResetFilters}
                />
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] shadow-md transition"
              >
                Apply Filters & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
