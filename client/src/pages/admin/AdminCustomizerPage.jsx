import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sliders, Plus, Edit2, Trash2, Check, Sparkles, X } from 'lucide-react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

export default function AdminCustomizerPage() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal Form State
  const [editId, setEditId] = useState(null);
  const [category, setCategory] = useState('fabric');
  const [subType, setSubType] = useState('baseFabric');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [surcharge, setSurcharge] = useState(0);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/customizer/options');
      if (data.success) {
        setOptions(data.all || []);
      }
    } catch (err) {
      console.error('Error fetching customizer options:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditId(null);
    setCategory('fabric');
    setSubType('baseFabric');
    setName('');
    setDescription('');
    setSurcharge(0);
    setModalOpen(true);
  };

  const handleOpenEdit = (opt) => {
    setEditId(opt._id);
    setCategory(opt.category);
    setSubType(opt.subType);
    setName(opt.name);
    setDescription(opt.description || '');
    setSurcharge(opt.surcharge || 0);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const payload = { category, subType, name, description, surcharge: Number(surcharge) };
      if (editId) {
        const { data } = await api.put(`/customizer/option/${editId}`, payload);
        if (data.success) {
          toast.success('Customizer option updated in database!');
          fetchOptions();
          setModalOpen(false);
        }
      } else {
        const { data } = await api.post('/customizer/option', payload);
        if (data.success) {
          toast.success('New customization option saved in database!');
          fetchOptions();
          setModalOpen(false);
        }
      }
    } catch (err) {
      toast.error('Error saving option.');
    }
  };

  const handleDelete = async (id, optName) => {
    if (!window.confirm(`Delete option "${optName}"?`)) return;
    try {
      const { data } = await api.delete(`/customizer/option/${id}`);
      if (data.success) {
        toast.success('Option removed.');
        setOptions(options.filter((o) => o._id !== id));
      }
    } catch (err) {
      toast.error('Error deleting option.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage 3D Customizer Options | ZURIELLE ADMIN</title>
      </Helmet>

      <div className="space-y-6 select-none max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-bridal-gold block">
              Configurator Engine
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-semibold">
              Bespoke Customizer Options Manager
            </h1>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-sm transition"
          >
            <Plus size={15} />
            <span>Add Custom Option</span>
          </button>
        </div>

        {/* Options List Table */}
        <div className="bg-white border border-bridal-border rounded-card shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-xs text-bridal-mutedText animate-pulse">
              Loading customization rules from MongoDB...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-bridal-cream/60 border-b border-bridal-border text-bridal-charcoal font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-3">Sub-Type</th>
                    <th className="py-3 px-3">Option Name</th>
                    <th className="py-3 px-3">Description</th>
                    <th className="py-3 px-3">Surcharge</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bridal-border/60 text-bridal-mutedText">
                  {options.map((opt) => (
                    <tr key={opt._id} className="hover:bg-bridal-cream/30 transition">
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-bridal-cream border border-bridal-border rounded font-semibold uppercase text-[10px] text-bridal-charcoal">
                          {opt.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-bridal-gold">{opt.subType}</td>
                      <td className="py-3 px-3 font-semibold text-bridal-charcoal">{opt.name}</td>
                      <td className="py-3 px-3 truncate max-w-xs">{opt.description || '—'}</td>
                      <td className="py-3 px-3 font-semibold text-bridal-deepGold">
                        {opt.surcharge === 0 ? 'Free' : `+PKR ${opt.surcharge.toLocaleString()}`}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(opt)}
                          className="p-1 text-bridal-charcoal hover:text-bridal-gold"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(opt._id, opt.name)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white border border-bridal-border rounded-card shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-bridal-border pb-3">
                <h3 className="font-serif text-base font-semibold text-bridal-charcoal">
                  {editId ? 'Edit Customization Option' : 'Add New Customization Option'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-bridal-mutedText hover:text-bridal-charcoal">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input"
                    >
                      <option value="fabric">Fabric</option>
                      <option value="design">Design / Cut</option>
                      <option value="embroidery">Embroidery</option>
                      <option value="dupatta">Dupatta</option>
                      <option value="personalization">Personalization</option>
                      <option value="color">Color</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Sub-Type</label>
                    <input
                      type="text"
                      value={subType}
                      onChange={(e) => setSubType(e.target.value)}
                      placeholder="e.g. baseFabric, gheraCut"
                      className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Option Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Pure Tissue Organza"
                    className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Surcharge (PKR)</label>
                  <input
                    type="number"
                    value={surcharge}
                    onChange={(e) => setSurcharge(e.target.value)}
                    className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input font-semibold text-bridal-deepGold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-bridal-charcoal uppercase block mb-1">Description</label>
                  <textarea
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short detail shown to bride in customizer wizard..."
                    className="w-full p-2.5 bg-bridal-cream/30 border border-bridal-border rounded-input"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-bridal-border rounded-btn text-bridal-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-bridal-gold hover:bg-bridal-goldHover text-white font-semibold rounded-btn shadow-sm"
                  >
                    Save to MongoDB
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
