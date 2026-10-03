import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../redux/slices/authSlice.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
  const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

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
        toast.success(`Welcome to Fashion House Sialkot, ${data.data.name}!`);
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
        <title>Create Your Account | Fashion House Sialkot</title>
        <meta
          name="description"
          content="Create your Fashion House Sialkot bridal account to save bespoke customizations, manage bridal measurements, and track order stitching."
        />
      </Helmet>

      <div className="min-h-[90vh] bg-[#FAF8F5] flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-[4px] shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* ========================================================= */}
          {/* LEFT PANEL: LUXURY EDITORIAL COUTURE IMAGE & BRANDING */}
          {/* ========================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-[#111827] text-white p-10 flex-col justify-between overflow-hidden">
            {/* Background Editorial Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Fashion House Sialkot Bridal Couture"
                className="w-full h-full object-cover object-center opacity-45 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-black/30" />
            </div>

            {/* Top Brand Header */}
            <div className="relative z-10 space-y-1">
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold block text-white">
                FASHION HOUSE
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#991B1B] uppercase font-bold block">
                Sialkot Couture
              </span>
            </div>

            {/* Center Editorial Quote & Benefits */}
            <div className="relative z-10 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
                  Bespoke Bridal Journey
                </span>
                <h3 className="font-serif text-xl font-normal leading-snug text-white">
                  Begin your handcrafted bridal story with our master artisans.
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Personalized measurement & fitting profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Save wishlist & customized bridal lookbooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#991B1B] flex-shrink-0" />
                  <span>Real-time handcrafted stitching milestone updates</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="relative z-10 text-[10px] text-gray-400 tracking-wider">
              &copy; {new Date().getFullYear()} Fashion House Sialkot. All rights reserved.
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT PANEL: REGISTRATION FORM */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Form Title */}
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#991B1B] font-semibold block">
                  Join Our Atelier
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal">
                  Create Your Account
                </h1>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter your details to manage bespoke bridal designs, measurements, and orders.
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleRegister} className="space-y-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Malik"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 mt-3"
                >
                  {loading ? 'Creating Profile...' : 'Create Account'}
                  <ArrowRight size={14} />
                </button>
              </form>

              {/* Bottom Switch Link */}
              <div className="text-center pt-3 text-xs text-gray-500 border-t border-gray-100">
                <span>Already have an account? </span>
                <Link to={`/login?redirect=${redirect}`} className="text-[#991B1B] font-semibold hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
