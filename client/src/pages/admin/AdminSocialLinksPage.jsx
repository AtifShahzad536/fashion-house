import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Phone,
  MessageCircle,
  Share2,
  Video,
  Music2,
  Globe,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ExternalLink,
  Share,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api.js';

const getPlatformIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case 'whatsapp':
      return <MessageCircle size={18} className="text-emerald-500" />;
    case 'instagram':
      return <Instagram size={18} className="text-pink-500" />;
    case 'facebook':
      return <Facebook size={18} className="text-blue-500" />;
    case 'pinterest':
      return <Share2 size={18} className="text-red-500" />;
    case 'tiktok':
      return <Music2 size={18} className="text-gray-900" />;
    case 'phone':
      return <Phone size={18} className="text-green-600" />;
    case 'youtube':
      return <Video size={18} className="text-red-600" />;
    default:
      return <Globe size={18} className="text-gray-600" />;
  }
};

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/cms/social-links/admin');
      if (data.success && data.data) {
        setLinks(data.data);
      }
    } catch (err) {
      console.error('Error fetching admin social links:', err);
      toast.error('Failed to load social links');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const handleToggleActive = (index) => {
    const updated = [...links];
    updated[index].isActive = !updated[index].isActive;
    setLinks(updated);
  };

  const handleAddNewLink = () => {
    const newLink = {
      platform: 'instagram',
      title: 'New Social Channel',
      url: 'https://',
      isActive: true,
      order: links.length + 1,
    };
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const { data } = await api.post('/cms/social-links/bulk', { links });
      if (data.success) {
        toast.success(data.message || 'Social media links updated successfully!');
        if (data.data) setLinks(data.data);
      }
    } catch (err) {
      console.error('Error saving social links:', err);
      toast.error('Failed to save social media links');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="font-serif text-2xl text-[#111827] font-semibold flex items-center gap-2">
            <Share className="text-[#991B1B]" size={24} />
            <span>Hero Floating Social Media Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage the floating social icons that appear on the left side of the Hero banner. Enable, disable, or modify links in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNewLink}
            className="px-4 py-2 border border-gray-200 text-[#111827] hover:bg-gray-100 text-xs font-semibold rounded-[6px] transition flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Add Social Channel</span>
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider rounded-[6px] shadow-sm transition disabled:opacity-50 flex items-center gap-2"
          >
            <Check size={14} />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Live Floating Bar Preview */}
      <div className="p-6 bg-[#111827] border border-gray-700 rounded-[6px] space-y-3 text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#991B1B]" />
            <span>Live Hero Left-Side Floating Icons Preview</span>
          </span>
          <span className="text-[11px] text-gray-400">
            {links.filter((l) => l.isActive).length} Icons Active
          </span>
        </div>

        <div className="py-4 flex items-center gap-3 bg-black/40 p-4 rounded-[6px] border border-white/10 overflow-x-auto">
          {links
            .filter((l) => l.isActive)
            .map((link, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-black/40 border border-white/30 text-white flex items-center justify-center shadow-lg group relative"
                title={link.title}
              >
                {getPlatformIcon(link.platform)}
                <span className="absolute bottom-full mb-2 px-2 py-0.5 bg-[#111827] text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {link.title}
                </span>
              </div>
            ))}
          {links.filter((l) => l.isActive).length === 0 && (
            <span className="text-xs text-gray-400 italic">No social icons are currently marked as active.</span>
          )}
        </div>
      </div>

      {/* Editable List of Social Links */}
      <div className="bg-white border border-gray-200 rounded-[6px] overflow-hidden shadow-sm">
        <div className="p-4 bg-[#F9FAFB] border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Configured Channels ({links.length})
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {links.map((link, index) => (
            <div
              key={index}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                link.isActive ? 'bg-white' : 'bg-gray-50/70 opacity-60'
              }`}
            >
              {/* Left: Icon & Platform Select */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  {getPlatformIcon(link.platform)}
                </div>

                <div className="space-y-1 flex-1 sm:w-40">
                  <select
                    value={link.platform}
                    onChange={(e) => handleFieldChange(index, 'platform', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-200 rounded-[6px] text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:border-[#111827]"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="pinterest">Pinterest</option>
                    <option value="tiktok">TikTok</option>
                    <option value="phone">Direct Phone Call</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>

              {/* Middle: Title & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                <div>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                    placeholder="Display Tooltip Title"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-[6px] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#111827]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleFieldChange(index, 'url', e.target.value)}
                    placeholder="e.g. https://instagram.com/yourbrand or https://wa.me/..."
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-[6px] text-xs font-mono text-gray-700 focus:outline-none focus:border-[#111827]"
                  />
                </div>
              </div>

              {/* Right: Active Switch & Delete */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <button
                  type="button"
                  onClick={() => handleToggleActive(index)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase transition ${
                    link.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {link.isActive ? 'Active' : 'Disabled'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteLink(index)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-[4px] hover:bg-red-50 transition"
                  title="Remove Link"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
