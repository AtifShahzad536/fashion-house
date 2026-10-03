import React, { useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid bridal inquiry email address');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing! Your 10% welcome coupon code is: ROYAL10');
    setEmail('');
  };

  return (
    <section className="py-20 bg-white border-b border-bridal-border relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#991B1B] font-semibold">
          <Sparkles size={13} />
          <span>VIP Atelier Privileges</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-bridal-charcoal font-normal">
          Join the Zurielle Private Bridal Circle
        </h2>

        <p className="text-xs sm:text-sm text-bridal-mutedText font-light max-w-lg mx-auto leading-relaxed">
          Receive exclusive early previews of seasonal couture lookbooks, bespoke customizer trunk shows, and a complimentary 10% privilege on your first bridal commission.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#991B1B] rounded-[4px] text-xs font-semibold text-[#991B1B] shadow-sm">
            <Check size={16} className="text-green-600" />
            <span>VIP Membership Activated — Use Coupon <strong className="font-mono text-bridal-charcoal">ROYAL10</strong> at checkout!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-bridal-border rounded-[4px] text-xs text-bridal-charcoal placeholder-bridal-lightText focus:outline-none focus:border-[#111827] shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-md transition whitespace-nowrap"
            >
              Join Atelier
            </button>
          </form>
        )}

        <p className="text-[10px] text-bridal-lightText">
          We honor your privacy. Unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
}
