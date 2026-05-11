'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/logo';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    // Basic password strength logic
    let s = 0;
    if (password.length > 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    setStrength(s);
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1a5f7a', '#0d3b55', '#e8a44a']
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Lifestyle Image (Desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
          <Logo />
          <div>
            <h2 className="text-4xl font-serif mb-4">Start Your Wellness Journey.</h2>
            <p className="text-lg opacity-80 max-w-md">
              Create an account to access exclusive organic collections and personalized health essentials.
            </p>
          </div>
          <div className="text-sm opacity-60">
            © 2026 AuviaMart. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-light dark:bg-surface-dark relative overflow-hidden">
        <div className="lg:hidden absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center blur-sm opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10 my-8"
        >
          <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="lg:hidden mb-8 flex justify-center">
              <Logo />
            </div>
            
            <h1 className="text-3xl font-serif mb-2">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Join the AuviaMart community today.</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    className="w-full bg-white dark:bg-surface-input-dark border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    className="w-full bg-white dark:bg-surface-input-dark border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <div className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 font-medium">+974</div>
                  <input
                    type="tel"
                    required
                    className="w-full bg-white dark:bg-surface-input-dark border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-24 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    placeholder="1234 5678"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-surface-input-dark border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-12 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-teal"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Password Strength Meter */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i <= strength 
                          ? strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-orange-500' : strength === 3 ? 'bg-yellow-500' : 'bg-brand-teal'
                          : 'bg-gray-200 dark:bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" required className="w-4 h-4 mt-1 accent-brand-teal" />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <Link href="/terms" className="text-brand-teal hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-teal hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-teal text-white py-4 rounded-xl font-medium hover:bg-brand-navy transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : 'Create Account'}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                </div>
                <span className="relative px-4 bg-transparent text-sm text-gray-500">or sign up with</span>
              </div>

              <button
                type="button"
                className="w-full bg-white dark:bg-surface-card-dark border border-gray-200 dark:border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <Globe size={20} />
                <span className="font-medium">Sign up with Google</span>
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-brand-teal font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
