import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductReviews({ product }) {
  const [reviews, setReviews] = useState([
    {
      _id: 'rev_1',
      name: 'Zara Qureshi',
      rating: 5,
      title: 'Majestic Volume and Heirloom Zardozi Detail',
      comment:
        'The handwork on this lehenga is extraordinary. The heavy ghera falls effortlessly, and the dual dupatta draping gave me the exact royal bride look I had envisioned for my Barat.',
      occasion: 'Bridal Barat Ceremony',
      date: 'January 2026',
      verified: true,
    },
    {
      _id: 'rev_2',
      name: 'Mahnoor Khan',
      rating: 5,
      title: 'Precision Fitting with Custom Measurements',
      comment:
        'I submitted my custom measurements through the online studio from Manchester, and the choli and lehenga length fit like a glove without needing a single alteration!',
      occasion: 'Walima Reception',
      date: 'February 2026',
      verified: true,
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim() || !newName.trim()) {
      toast.error('Please fill in all review fields');
      return;
    }

    const created = {
      _id: `rev_${Date.now()}`,
      name: newName,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      occasion: 'Bridal Wear',
      date: 'Just Now',
      verified: true,
    };

    setReviews([created, ...reviews]);
    toast.success('Thank you! Your verified bridal review has been published.');
    setNewTitle('');
    setNewComment('');
    setNewName('');
    setFormOpen(false);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header & Rating Breakdown */}
      <div className="p-6 sm:p-8 bg-bridal-cream/40 border border-bridal-border rounded-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div>
            <div className="text-4xl font-serif font-bold text-bridal-charcoal">
              {product.rating ? product.rating.toFixed(1) : '5.0'}
            </div>
            <div className="flex items-center gap-1 text-bridal-gold justify-center md:justify-start mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs text-bridal-mutedText mt-1 block">
              Based on {reviews.length} Verified Bride Reviews
            </span>
          </div>

          <div className="hidden sm:block h-14 w-px bg-bridal-border" />

          <div className="hidden sm:block text-xs space-y-1 text-bridal-mutedText">
            <div className="flex items-center gap-2">
              <span>5 Stars</span>
              <div className="w-28 h-2 bg-bridal-sand rounded-full overflow-hidden">
                <div className="w-full h-full bg-bridal-gold" />
              </div>
              <span>100%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>4 Stars</span>
              <div className="w-28 h-2 bg-bridal-sand rounded-full overflow-hidden">
                <div className="w-0 h-full bg-bridal-gold" />
              </div>
              <span>0%</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-6 py-3 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md transition"
        >
          {formOpen ? 'Close Form' : 'Write a Bridal Review'}
        </button>
      </div>

      {/* Review Submission Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white border border-bridal-gold rounded-card shadow-luxury space-y-4 animate-in fade-in"
        >
          <h4 className="font-serif text-lg text-bridal-charcoal font-semibold">
            Share Your Experience with {product.name}
          </h4>

          {/* Star Selector */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-bridal-charcoal">Your Rating</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`p-1 transition ${newRating >= star ? 'text-bridal-gold' : 'text-bridal-sand'}`}
                >
                  <Star size={20} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Full Name (e.g. Ayesha Khan)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs focus:outline-none focus:border-bridal-gold"
              required
            />
            <input
              type="text"
              placeholder="Review Title (e.g. Flawless wedding day look)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs focus:outline-none focus:border-bridal-gold"
              required
            />
          </div>

          <textarea
            rows="3"
            placeholder="Describe the fabric quality, embroidery craftsmanship, fitting, and overall experience..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs focus:outline-none focus:border-bridal-gold"
            required
          />

          <button
            type="submit"
            className="px-6 py-2.5 bg-bridal-gold hover:bg-bridal-goldHover text-white text-xs font-semibold uppercase tracking-wider rounded-btn shadow-md transition flex items-center gap-1.5"
          >
            <Send size={13} />
            <span>Publish Review</span>
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="p-6 bg-white border border-bridal-border rounded-card space-y-3 hover:border-bridal-gold/60 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-bridal-gold">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span className="text-[11px] text-bridal-lightText">{rev.date}</span>
            </div>

            <h4 className="font-serif text-sm font-semibold text-bridal-charcoal">
              "{rev.title}"
            </h4>

            <p className="text-xs text-bridal-mutedText leading-relaxed">
              {rev.comment}
            </p>

            <div className="pt-2 border-t border-bridal-border flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 font-medium text-bridal-charcoal">
                <span>{rev.name}</span>
                {rev.verified && (
                  <span className="flex items-center gap-0.5 text-green-700 text-[10px] bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                    <CheckCircle2 size={10} /> Verified Bride
                  </span>
                )}
              </div>
              <span className="text-bridal-gold font-medium">{rev.occasion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
