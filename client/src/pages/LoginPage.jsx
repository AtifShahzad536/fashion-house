import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../redux/slices/authSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please provide both email and password');
      return;
    }

    dispatch(setLoading(true));
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        dispatch(setCredentials(data.data));
        toast.success(`Welcome back to Zurielle Atelier, ${data.data.name}!`);
        if (data.data.role === 'admin' && redirect === '/account') {
          navigate('/admin');
        } else {
          navigate(redirect);
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
      dispatch(setError(msg));
      toast.error(msg);
    }
  };

  const handleQuickFillCustomer = () => {
    setEmail('ayesha@gmail.com');
    setPassword('customer123password');
  };

  const handleQuickFillAdmin = () => {
    setEmail('admin@zurielle.com');
    setPassword('admin12345password');
  };

  return (
    <>
      <Helmet>
        <title>Client Sign In | ZURIELLE ATELIER</title>
        <meta name="description" content="Sign in to your Zurielle Atelier bridal account to view orders, saved custom designs, and fitting measurements." />
      </Helmet>

      <div className="min-h-[80vh] bg-bridal-ivory py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-bridal-border rounded-card shadow-luxury-lg p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-bridal-gold font-semibold block">
              VIP Client Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-bridal-charcoal font-normal">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-bridal-mutedText">
              Access your saved bespoke lehenga designs and live order tracking.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-bridal-charcoal block">
                  Password
                </label>
                <a href="#forgot" onClick={() => toast('Password reset link has been dispatched to your email.', { icon: '📧' })} className="text-[11px] text-bridal-gold hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bridal-lightText" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-bridal-cream/30 border border-bridal-border rounded-input text-xs text-bridal-charcoal focus:outline-none focus:border-bridal-gold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-bridal-charcoal hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Atelier'}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Credentials Fill Buttons */}
          <div className="pt-2 border-t border-bridal-border space-y-2">
            <span className="text-[10px] text-bridal-lightText font-semibold uppercase tracking-wider block text-center">
              Quick Test Autofill
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickFillCustomer}
                className="py-2 px-2 bg-bridal-cream/60 hover:bg-bridal-sand border border-bridal-border rounded-md text-[11px] font-medium text-bridal-charcoal transition flex items-center justify-center gap-1"
              >
                <User size={12} className="text-bridal-gold" />
                <span>Bride Client</span>
              </button>
              <button
                type="button"
                onClick={handleQuickFillAdmin}
                className="py-2 px-2 bg-bridal-cream/60 hover:bg-bridal-sand border border-bridal-border rounded-md text-[11px] font-medium text-bridal-charcoal transition flex items-center justify-center gap-1"
              >
                <ShieldCheck size={12} className="text-bridal-gold" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Register Prompt */}
          <div className="text-center pt-2 text-xs text-bridal-mutedText">
            <span>New to Zurielle Atelier? </span>
            <Link to={`/register?redirect=${redirect}`} className="text-bridal-deepGold font-semibold hover:underline">
              Create VIP Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
