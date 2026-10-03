import React, { useState, useRef } from 'react';
import { UploadCloud, X, Check, Loader2, Sparkles } from 'lucide-react';
import api from '../../services/api.js';
import toast from 'react-hot-toast';

export default function CloudinaryUploader({ images = [], setImages, folder = 'lahnga_atelier/products' }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('folder', folder);

    try {
      const { data } = await api.post('/upload/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        const newImages = data.data.map((item, idx) => ({
          url: item.url,
          public_id: item.public_id,
          alt: 'Bridal Lehenga Couture',
          isPrimary: images.length === 0 && idx === 0,
        }));
        setImages([...images, ...newImages]);
        toast.success(`${newImages.length} image(s) processed & uploaded via Cloudinary!`);
      }
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    toast('Image removed from gallery', { icon: '🗑️' });
  };

  const handleSetPrimary = (index) => {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setImages(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
          Cloudinary High-Resolution Image Gallery ({images.length} Loaded)
        </label>
        <span className="text-[11px] text-bridal-gold font-medium flex items-center gap-1">
          <Sparkles size={11} />
          <span>Cloud CDN Accelerated</span>
        </span>
      </div>

      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 border-2 border-dashed rounded-card text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 ${
          uploading
            ? 'border-bridal-gold bg-bridal-cream/60'
            : 'border-bridal-border hover:border-bridal-gold bg-bridal-cream/20 hover:bg-bridal-cream/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-xs text-bridal-deepGold font-semibold">
            <Loader2 size={28} className="animate-spin text-bridal-gold" />
            <span>Streaming high-res imagery to Cloudinary CDN...</span>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-white border border-bridal-border flex items-center justify-center text-bridal-gold shadow-sm">
              <UploadCloud size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-bridal-charcoal">
                Click to browse or drop high-resolution bridal photography
              </p>
              <p className="text-[11px] text-bridal-mutedText mt-0.5">
                Supports JPG, PNG, WebP up to 10MB each (Streamed directly to Cloudinary)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Gallery */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative aspect-[3/4] rounded-card overflow-hidden border-2 group bg-bridal-sand ${
                img.isPrimary ? 'border-bridal-gold shadow-md ring-1 ring-bridal-gold' : 'border-bridal-border'
              }`}
            >
              <img src={img.url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />

              {/* Badges & Actions */}
              <div className="absolute top-1.5 left-1.5">
                {img.isPrimary ? (
                  <span className="px-1.5 py-0.5 bg-bridal-gold text-white text-[9px] font-bold rounded">
                    Primary
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    className="px-1.5 py-0.5 bg-black/60 hover:bg-black text-white text-[9px] font-medium rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    Set Primary
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                title="Remove"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
