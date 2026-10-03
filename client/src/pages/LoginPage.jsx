import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../redux/slices/authSlice.js';
import { ADMIN_BASE_PATH } from '../constants/theme.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    dispatch(setLoading(true));
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        dispatch(setCredentials(data.data));
        toast.success(`Welcome back, ${data.data.name}!`);
        if (data.data.role === 'admin' && redirect === '/account') {
          navigate(ADMIN_BASE_PATH);
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

  return (
    <>
      <Helmet>
        <title>Sign In | ZURIELLE ATELIER</title>
        <meta
          name="description"
          content="Sign in to your Zurielle Atelier account to manage bespoke orders, saved custom designs, and fitting measurements."
        />
      </Helmet>

      <div className="min-h-[88vh] bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-[4px] shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* ========================================================= */}
          {/* LEFT PANEL: LUXURY EDITORIAL COUTURE IMAGE & BRANDING */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-[#111827] text-white p-10 flex-col justify-between overflow-hidden">
            {/* Background Editorial Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=85"
                alt="Zurielle Bridal Couture"
                className="w-full h-full object-cover object-center opacity-45 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-black/30" />
            </div>

            {/* Top Brand Header */}
            <div className="relative z-10 space-y-1">
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold block text-white">
                ZURIELLE
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#991B1B] uppercase font-bold block">
                Atelier Couture
              </span>
            </div>

            {/* Center Editorial Quote & Features */}
            <div className="relative z-10 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
                  Heirloom Craftsmanship
                </span>
                <h3 className="font-serif text-xl font-normal leading-snug text-white">
                  Where timeless heritage meets modern bridal romance.
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Track your bespoke bridal stitching live</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Save customized 3D silhouettes & swatches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Complimentary insured worldwide delivery</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="relative z-10 text-[10px] text-gray-400 tracking-wider">
              &copy; {new Date().getFullYear()} Zurielle Atelier. All rights reserved.
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT PANEL: SIGN IN FORM */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Form Title */}
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
                  Welcome Back
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal">
                  Sign In to Your Account
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter your credentials to access your saved bridal designs and order history.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => toast('Password reset link has been dispatched to your email.', { icon: '📧' })}
                      className="text-[11px] text-[#991B1B] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                  <ArrowRight size={14} />
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="text-center pt-4 text-xs text-gray-500 border-t border-gray-100">
                <span>Don't have an account yet? </span>
                <Link to={`/register?redirect=${redirect}`} className="text-[#991B1B] font-semibold hover:underline">
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
