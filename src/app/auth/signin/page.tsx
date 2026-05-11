'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/logo';
import { Eye, EyeOff, Mail, Lock, Globe } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Lifestyle Image (Desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516594798141-f735d5108f3b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
          <Logo />
          <div>
            <h2 className="text-4xl font-serif mb-4">Pure. Curated. Delivered.</h2>
            <p className="text-lg opacity-80 max-w-md">
              Join the AuviaMart community and experience the finest organic essentials delivered to your doorstep.
            </p>
          </div>
          <div className="text-sm opacity-60">
            © 2026 AuviaMart. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-surface-dark relative overflow-hidden">
        {/* Mobile Backdrop */}
        <div className="lg:hidden absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516594798141-f735d5108f3b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center blur-sm opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <div className="lg:hidden mb-8 flex justify-center">
              <Logo />
            </div>
            
            <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please enter your details to sign in.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <button type="button" className="text-sm text-brand-teal hover:underline">Forgot password?</button>
                </div>
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
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-brand-teal" />
                <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">Remember me for 30 days</label>
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
                ) : 'Sign In'}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                </div>
                <span className="relative px-4 bg-transparent text-sm text-gray-500">or continue with</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-100 transition-all"
              >
                <Globe size={20} />
                <span className="font-medium">Sign in with Google</span>
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-brand-teal font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
