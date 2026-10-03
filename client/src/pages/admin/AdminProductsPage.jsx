import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Shirt,
} from 'lucide-react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');

  const { currency, currencyRate } = useSelector((state) => state.ui);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedOccasion]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('keyword', search);
      if (selectedOccasion) params.append('occasion', selectedOccasion);
      params.append('limit', 50);

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the atelier catalog?`)) return;

    try {
      const { data } = await api.delete(`/products/${id}`);
      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success(`"${name}" removed successfully.`);
      }
    } catch (err) {
      toast.error('Failed to delete product.');
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return '';
    const converted = Math.round(amount * currencyRate);
    return `${currency} ${converted.toLocaleString()}`;
  };

  return (
    <>
      <Helmet>
        <title>Manage Bridal Products Inventory | ZURIELLE ADMIN</title>
      </Helmet>

      <div className="space-y-6 select-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
              Atelier Vault
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-semibold">
              Product Inventory ({products.length})
            </h1>
          </div>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-sm transition"
          >
            <Plus size={15} />
            <span>Add New Lehenga</span>
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="p-4 bg-white border border-bridal-border rounded-card shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
            <input
              type="text"
              placeholder="Search by title, SKU, or fabric..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs focus:outline-none focus:border-bridal-gold"
            />
          </div>

          <select
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="px-4 py-2 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs font-medium text-bridal-charcoal focus:outline-none"
          >
            <option value="">All Occasions</option>
            <option value="Bridal">Bridal</option>
            <option value="Walima">Walima</option>
            <option value="Mehndi">Mehndi</option>
            <option value="Engagement">Engagement</option>
            <option value="Party Wear">Party Wear</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-white border border-bridal-border rounded-card shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-bridal-mutedText animate-pulse">
              Loading atelier collection records...
            </div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Lehenga</th>
                    <th className="py-3 px-3">SKU</th>
                    <th className="py-3 px-3">Occasion</th>
                    <th className="py-3 px-3">Base Fabric</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock Sizing</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-bridal-cream/30 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0]?.url || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'}
                          alt={p.name}
                          className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-bridal-charcoal truncate max-w-[200px]">
                            {p.name}
                          </h4>
                          <span className="text-[10px] text-bridal-gold font-medium">
                            {p.isCustomizable ? '✨ 3D Customizer Active' : 'Ready Wear'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-bridal-charcoal">{p.sku}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-bridal-cream border border-bridal-border rounded text-[10px] font-semibold text-bridal-charcoal">
                          {p.occasion}
                        </span>
                      </td>
                      <td className="py-3 px-3 truncate max-w-[150px]">{p.fabric}</td>
                      <td className="py-3 px-3 font-semibold text-bridal-charcoal">
                        {formatPrice(p.salePrice || p.price)}
                      </td>
                      <td className="py-3 px-3">
                        {p.sizes?.map((s) => `${s.size}:${s.stock}`).join(', ') || 'Standard'}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Link
                          to={`/product/${p.slug}`}
                          target="_blank"
                          className="p-1 text-bridal-mutedText hover:text-bridal-gold inline-block"
                          title="View on Storefront"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${p._id}`}
                          className="p-1 text-bridal-charcoal hover:text-bridal-gold inline-block"
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id, p.name)}
                          className="p-1 text-red-600 hover:text-red-700 inline-block"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-bridal-mutedText space-y-3">
              <p>No products found in the catalog.</p>
              <Link
                to="/admin/products/new"
                className="inline-block px-4 py-2 bg-bridal-gold text-white text-xs font-semibold rounded-btn"
              >
                Add Your First Lehenga
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
