import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../redux/slices/authSlice.js';
import { ADMIN_BASE_PATH } from '../constants/theme.js';
import api from '../services/api.js';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);
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
        <title>Client Sign In | ZURIELLE ATELIER</title>
        <meta
          name="description"
          content="Sign in to your Zurielle Atelier bridal account to view orders, saved custom designs, and fitting measurements."
        />
      </Helmet>

      <div className="min-h-[85vh] bg-[#FAF8F5] py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-[4px] shadow-sm p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#991B1B] font-semibold block">
              VIP Client Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-normal">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-gray-500">
              Access your saved bespoke lehenga designs and live order tracking.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                Email Address
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
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => toast('Password reset link has been dispatched to your email.', { icon: '📧' })}
                  className="text-[11px] text-[#991B1B] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              {loading ? 'Authenticating...' : 'Sign In to Atelier'}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Register Prompt */}
          <div className="text-center pt-4 text-xs text-gray-500 border-t border-gray-100">
            <span>New to Zurielle Atelier? </span>
            <Link to={`/register?redirect=${redirect}`} className="text-[#991B1B] font-semibold hover:underline">
              Create VIP Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
