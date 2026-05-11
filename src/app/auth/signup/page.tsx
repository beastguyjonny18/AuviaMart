'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/logo';
import { Eye, EyeOff, Mail, Lock, User, Phone, Globe } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { signUpAction, signInWithGoogleAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signUpAction({ email, password, fullName, phoneNumber });

    if (result?.success) {
      // New signups are always normal users
      router.push('/');
    } else {
      setError(result?.error || 'Failed to create account. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      const serverResult = await signInWithGoogleAction(idToken);
      
      if (serverResult.success) {
        if (serverResult.email === 'sololvlar@gmail.com') {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      } else {
        throw new Error(serverResult.error);
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      setError(error.message || 'Failed to sign in with Google');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Lifestyle Image (Desktop) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
          <Logo />
          <div>
            <h2 className="text-4xl font-serif mb-4">Elevate Your Living</h2>
            <p className="text-lg opacity-80 max-w-md">
              Discover a world of premium organic essentials and curated lifestyle products tailored for you.
            </p>
          </div>
          <div className="text-sm opacity-60">
            © 2026 AuviaMart Pakistan. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-surface-dark relative overflow-hidden">
        {/* Mobile Backdrop */}
        <div className="lg:hidden absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center blur-sm opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
            <div className="lg:hidden mb-8 flex justify-center">
              <Logo />
            </div>
            
            <h1 className="text-3xl font-serif mb-2">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Start your journey with AuviaMart today.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 py-3 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-white/10 transition-all mb-6"
            >
              {isGoogleLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-brand-teal/30 border-t-brand-teal rounded-full"
                />
              ) : (
                <>
                  <Globe size={20} className="text-brand-teal" />
                  <span>Sign up with Google</span>
                </>
              )}
            </button>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#151b1e] px-4 text-gray-500">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-brand-teal outline-none transition-all text-sm"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-widest text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-white border border-gray-200 dark:border-gray-300 rounded-xl py-2.5 pl-12 pr-12 focus:ring-2 focus:ring-brand-teal outline-none transition-all text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-teal"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-teal text-white py-3.5 rounded-xl font-medium hover:bg-brand-navy transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/20 mt-4"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
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
