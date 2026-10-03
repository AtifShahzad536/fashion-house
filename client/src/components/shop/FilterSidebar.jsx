import React from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

const occasionsList = [
  'Bridal',
  'Walima',
  'Mehndi',
  'Engagement',
  'Party Wear',
];

const fabricsList = [
  'Raw Silk',
  'Velvet',
  'Organza',
  'Brocade',
  'Net',
  'Chiffon',
];

const colorsList = [
  { name: 'Red', hex: '#991B1B' },
  { name: 'Maroon', hex: '#4A0E17' },
  { name: 'Wine', hex: '#881337' },
  { name: 'Silver', hex: '#E2E8F0' },
  { name: 'Saffron', hex: '#E6A100' },
  { name: 'Emerald', hex: '#0B6623' },
  { name: 'Pink', hex: '#C99E94' },
  { name: 'Ivory', hex: '#FDFBF7' },
];

const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];

export default function FilterSidebar({
  selectedOccasions,
  setSelectedOccasions,
  selectedFabrics,
  setSelectedFabrics,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  onResetFilters,
}) {
  const handleOccasionToggle = (occ) => {
    if (selectedOccasions.includes(occ)) {
      setSelectedOccasions(selectedOccasions.filter((item) => item !== occ));
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  const handleFabricToggle = (fab) => {
    if (selectedFabrics.includes(fab)) {
      setSelectedFabrics(selectedFabrics.filter((item) => item !== fab));
    } else {
      setSelectedFabrics([...selectedFabrics, fab]);
    }
  };

  return (
    <div className="space-y-8 text-xs select-none">
      {/* Reset Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#111827]">
          Filter Couture
        </h3>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] text-[#991B1B] hover:text-[#7f1d1d] font-semibold uppercase tracking-wider transition"
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Occasion Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[#111827]">
          Occasion
        </h4>
        <div className="space-y-2">
          {occasionsList.map((occ) => (
            <label
              key={occ}
              className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-[#111827] group"
            >
              <input
                type="checkbox"
                checked={selectedOccasions.includes(occ)}
                onChange={() => handleOccasionToggle(occ)}
                className="w-4 h-4 rounded-[4px] border-gray-300 text-[#991B1B] focus:ring-[#991B1B] accent-[#991B1B] cursor-pointer"
              />
              <span className="group-hover:translate-x-0.5 transition-transform">{occ}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Fabric Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[#111827]">
          Pure Fabric
        </h4>
        <div className="space-y-2">
          {fabricsList.map((fab) => (
            <label
              key={fab}
              className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-[#111827] group"
            >
              <input
                type="checkbox"
                checked={selectedFabrics.includes(fab)}
                onChange={() => handleFabricToggle(fab)}
                className="w-4 h-4 rounded-[4px] border-gray-300 text-[#991B1B] focus:ring-[#991B1B] accent-[#991B1B] cursor-pointer"
              />
              <span className="group-hover:translate-x-0.5 transition-transform">{fab}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Color Swatches */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[#111827]">
          Color Family
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {colorsList.map((col) => {
            const isSelected = selectedColor === col.name;
            return (
              <button
                key={col.name}
                onClick={() => setSelectedColor(isSelected ? '' : col.name)}
                title={col.name}
                style={{ backgroundColor: col.hex }}
                className={`w-7 h-7 rounded-full border border-black/20 shadow-sm transition-all flex items-center justify-center ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#991B1B] scale-110' : 'hover:scale-105'
                }`}
              >
                {isSelected && (
                  <Check
                    size={13}
                    className={col.name === 'Ivory' || col.name === 'Silver' ? 'text-black' : 'text-white'}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Sizing Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold uppercase tracking-wider text-[#111827]">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {sizesList.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(isSelected ? '' : size)}
                className={`px-3 py-1.5 rounded-[6px] border text-xs font-medium transition ${
                  isSelected
                    ? 'bg-[#111827] text-white border-[#111827] font-semibold'
                    : 'bg-white text-[#111827] border-gray-200 hover:border-[#991B1B]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Filter */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold uppercase tracking-wider text-[#111827]">
            Max Price
          </h4>
          <span className="font-semibold text-[#991B1B]">
            PKR {Number(priceRange).toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="600000"
          step="25000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#991B1B]"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>PKR 100k</span>
          <span>PKR 600k+</span>
        </div>
      </div>
    </div>
  );
}
