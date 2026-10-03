import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
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
        <meta
          name="description"
          content="Register your VIP bridal profile to save bespoke lehenga designs, manage custom measurements, and track order stitching."
        />
      </Helmet>

      <div className="min-h-[85vh] bg-[#FAF8F5] py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-[4px] shadow-sm p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#991B1B] font-semibold block">
              VIP Atelier Membership
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal">
              Create Your Account
            </h1>
            <p className="text-xs text-gray-500">
              Save your bespoke lehenga customizations, bridal measurements, and live order tracking.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
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
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
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
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
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
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-gray-200 rounded-[4px] text-xs text-[#111827] focus:outline-none focus:border-[#111827] transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#111827] hover:bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-widest rounded-[4px] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating VIP Profile...' : 'Complete VIP Registration'}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Login Prompt */}
          <div className="text-center pt-2 text-xs text-gray-500 border-t border-gray-100">
            <span>Already have an Atelier account? </span>
            <Link to={`/login?redirect=${redirect}`} className="text-[#991B1B] font-semibold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
