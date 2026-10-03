import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../redux/slices/authSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    dispatch(setLoading(true));
    try {
      const { data } = await api.post('/auth/register', { name, email, password, phone });
      if (data.success) {
        dispatch(setCredentials(data.data));
        toast.success(`Welcome to Zurielle Atelier, ${data.data.name}!`);
        navigate(redirect);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      dispatch(setError(msg));
      toast.error(msg);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create VIP Bridal Account | ZURIELLE ATELIER</title>
        <meta name="description" content="Register your VIP bridal profile to save bespoke lehenga designs, manage custom measurements, and track order stitching." />
      </Helmet>

      <div className="min-h-[80vh] bg-bridal-ivory py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-bridal-border rounded-card shadow-luxury-lg p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bridal-gold font-semibold block">
              VIP Atelier Membership
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-normal">
              Create Your Account
            </h1>
            <p className="text-xs text-bridal-mutedText">
              Save your bespoke lehenga customizations, bridal measurements, and live order tracking.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Malik"
                  className="w-full pl-10 pr-4 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                Phone / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full pl-10 pr-4 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Creating Profile...' : 'Complete VIP Registration'}
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-bridal-mutedText border-t border-bridal-border">
            <span>Already have an account? </span>
            <Link to={`/login?redirect=${redirect}`} className="text-bridal-deepGold font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
