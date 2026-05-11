'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Mic, Globe } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/store/use-store';
import { getSessionAction, logoutAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    
    async function checkSession() {
      const sess = await getSessionAction();
      setSession(sess);
    }
    checkSession();

    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleLogout = async () => {
    await logoutAction();
    setSession(null);
    router.push('/');
    router.refresh();
  };

  if (!mounted) return null;

  const isAdmin = session?.email === 'sololvlar@gmail.com';

  return (
    <nav
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300 border-b border-white/10",
        isScrolled 
          ? "bg-brand-navy/95 backdrop-blur-md py-1 shadow-lg" 
          : "bg-brand-navy py-2"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
        <Logo shrink={isScrolled} />

        <div className="hidden lg:flex flex-1 max-w-[480px] relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for tech, decor, and more..."
            className="w-full bg-white rounded-full py-2.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all text-brand-navy placeholder:text-gray-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
            <Mic size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-white">
          <Link href="/wishlist" className="tap-target relative hover:text-accent-gold transition-colors hidden sm:flex">
            <Heart size={24} />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent-gold text-brand-navy text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>

          <Link href="/cart" className="tap-target relative hover:text-accent-gold transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent-gold text-brand-navy text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          <button className="tap-target hover:text-accent-gold transition-colors hidden md:flex items-center gap-1">
            <Globe size={20} />
            <span className="text-sm font-medium">EN</span>
          </button>

          {session ? (
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 bg-accent-gold/20 hover:bg-accent-gold/30 border border-accent-gold/30 text-accent-gold px-4 lg:px-6 py-2 rounded-full transition-all group active:scale-95"
                >
                  <User size={20} />
                  <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
                </Link>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 lg:px-6 py-2 rounded-full transition-all group active:scale-95"
                >
                  <User size={20} className="group-hover:text-accent-gold transition-colors" />
                  <span className="text-sm font-medium hidden sm:inline">Sign Out</span>
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={() => {
                console.log('Sign In Clicked');
                router.push('/auth/signin');
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 lg:px-6 py-2 rounded-full transition-all group active:scale-95 cursor-pointer"
            >
              <User size={20} className="group-hover:text-accent-gold transition-colors" />
              <span className="text-sm font-medium hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

