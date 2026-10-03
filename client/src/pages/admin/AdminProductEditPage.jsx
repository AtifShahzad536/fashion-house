import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Sparkles, ArrowLeft, Save, Loader2, Check } from 'lucide-react';
import api from '../../services/api.js';
import CloudinaryUploader from '../../components/admin/CloudinaryUploader.jsx';
import toast from 'react-hot-toast';

export default function AdminProductEditPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  // Form fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [occasion, setOccasion] = useState('Bridal');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('Pure Raw Silk (80g)');
  const [embroideryWork, setEmbroideryWork] = useState('Handworked Zardozi, Pearls & Dabka');
  const [images, setImages] = useState([]);
  const [isCustomizable, setIsCustomizable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  // Colors and sizes
  const [colors, setColors] = useState([
    { name: 'Royal Crimson Red', hex: '#991B1B' },
    { name: 'Royal Silver & Pearl', hex: '#E2E8F0' },
  ]);
  const [sizes, setSizes] = useState([
    { size: 'XS', stock: 2 },
    { size: 'S', stock: 4 },
    { size: 'M', stock: 6 },
    { size: 'L', stock: 4 },
    { size: 'XL', stock: 2 },
    { size: 'Custom', stock: 15 },
  ]);

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      if (data.success) {
        setCategories(data.data || []);
        if (!category && data.data.length > 0) {
          setCategory(data.data[0]._id);
        }
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const fetchProduct = async () => {
    setFetching(true);
    try {
      const { data } = await api.get(`/products/${id}`);
      if (data.success) {
        const p = data.data;
        setName(p.name);
        setSlug(p.slug);
        setSku(p.sku);
        setCategory(p.category?._id || p.category);
        setOccasion(p.occasion);
        setPrice(p.price);
        setSalePrice(p.salePrice || '');
        setShortDescription(p.shortDescription);
        setDescription(p.description);
        setFabric(p.fabric);
        setEmbroideryWork(p.embroideryWork);
        setImages(p.images || []);
        setIsCustomizable(p.isCustomizable);
        setIsFeatured(p.isFeatured);
        setIsBestSeller(p.isBestSeller);
        setIsNewArrival(p.isNewArrival);
        if (p.colors) setColors(p.colors);
        if (p.sizes) setSizes(p.sizes);
      }
    } catch (err) {
      console.error('Error fetching product for edit:', err);
      toast.error('Could not load product details.');
    } finally {
      setFetching(false);
    }
  };

  // Auto-generate slug and SKU from title
  const handleNameChange = (val) => {
    setName(val);
    if (!isEdit) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(autoSlug);

      const autoSku = `ZUR-${val.slice(0, 2).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setSku(autoSku);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !fabric || !embroideryWork) {
      toast.error('Please fill in all mandatory fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one image via Cloudinary');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sku: sku || `ZUR-${Date.now().toString().slice(-4)}`,
        category: category || categories[0]?._id,
        occasion,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : null,
        shortDescription,
        description,
        fabric,
        embroideryWork,
        images,
        colors,
        sizes,
        isCustomizable,
        isFeatured,
        isBestSeller,
        isNewArrival,
      };

      if (isEdit) {
        const { data } = await api.put(`/products/${id}`, payload);
        if (data.success) {
          toast.success('Lehenga couture updated successfully!');
          navigate('/admin/products');
        }
      } else {
        const { data } = await api.post('/products', payload);
        if (data.success) {
          toast.success('New bridal lehenga added to atelier catalog!');
          navigate('/admin/products');
        }
      }
    } catch (err) {
      console.error('Save product error:', err);
      toast.error(err.response?.data?.message || 'Error saving product.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center text-xs text-bridal-mutedText animate-pulse">
        Retrieving haute couture specs...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit Lehenga' : 'Add New Bridal Lehenga'} | ZURIELLE ADMIN</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="space-y-8 select-none max-w-5xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bridal-border pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="p-2 bg-white border border-bridal-border rounded-btn text-bridal-charcoal hover:bg-bridal-cream"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
                {isEdit ? 'Update Atelier Archive' : 'New Couture Release'}
              </span>
              <h1 className="font-serif text-2xl text-bridal-charcoal font-semibold">
                {isEdit ? `Edit: ${name}` : 'Commission New Bridal Lehenga'}
              </h1>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{isEdit ? 'Update Product' : 'Publish Lehenga'}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 1. CLOUDINARY MULTI-IMAGE UPLOAD SECTION */}
        {/* ========================================================= */}
        <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm">
          <CloudinaryUploader images={images} setImages={setImages} />
        </div>

        {/* 2. Core Information & Categorization */}
        <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-4">
          <h3 className="font-serif text-base font-semibold text-bridal-charcoal border-b border-bridal-border pb-2">
            Basic Information & Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Lehenga Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Shahzadi Begum Crimson Velvet Lehenga"
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">SKU Code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input font-mono font-bold text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input font-medium focus:outline-none"
              >
                <option value="Bridal">Bridal</option>
                <option value="Walima">Walima</option>
                <option value="Mehndi">Mehndi</option>
                <option value="Engagement">Engagement</option>
                <option value="Party Wear">Party Wear</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input font-medium focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Regular Price (PKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="385000"
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input font-semibold focus:outline-none focus:border-bridal-gold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Sale Price (Optional)</label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="Leave blank if none"
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Short Description</label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief 1-line elevator summary for cards..."
              className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              required
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Full Editorial Story & Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of handwork, silhouette flair, history..."
              className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
              required
            />
          </div>
        </div>

        {/* 3. Fabrics & Craftsmanship */}
        <div className="p-6 bg-white border border-bridal-border rounded-card shadow-sm space-y-4">
          <h3 className="font-serif text-base font-semibold text-bridal-charcoal border-b border-bridal-border pb-2">
            Material Specifications & Craftsmanship
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Base Fabric</label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                placeholder="e.g. Italian Micro Velvet & Metallic Tissue"
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-bridal-charcoal uppercase tracking-wider block">Embroidery Handwork</label>
              <input
                type="text"
                value={embroideryWork}
                onChange={(e) => setEmbroideryWork(e.target.value)}
                placeholder="e.g. Antique Gold Zardozi, Dabka, Pearls & Cutdana"
                className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input focus:outline-none focus:border-bridal-gold"
                required
              />
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="pt-3 border-t border-bridal-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCustomizable}
                onChange={(e) => setIsCustomizable(e.target.checked)}
                className="w-4 h-4 rounded text-bridal-gold accent-bridal-gold"
              />
              <span className="font-semibold text-bridal-charcoal">3D Customizer Active</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="w-4 h-4 rounded text-bridal-gold accent-bridal-gold"
              />
              <span className="font-semibold text-bridal-charcoal">New Arrival Badge</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="w-4 h-4 rounded text-bridal-gold accent-bridal-gold"
              />
              <span className="font-semibold text-bridal-charcoal">Best Seller Carousel</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-bridal-gold accent-bridal-gold"
              />
              <span className="font-semibold text-bridal-charcoal">Featured Spotlight</span>
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
