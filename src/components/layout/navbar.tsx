'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Mic, Globe, ShoppingBag } from 'lucide-react';
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

    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleLogout = async () => {
    await logoutAction();
    setSession(null);
    router.push('/');
    router.refresh();
  };

  if (!mounted) return null;

  const ADMIN_EMAILS = ['sololvlar@gmail.com', 'sololvlar69@gmail.com', 'roshiim1001@gmail.com'];
  const isAdmin = session && ADMIN_EMAILS.includes(session.email);

  return (
    <nav
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-500 border-b border-white/5",
        isScrolled 
          ? "bg-brand-navy/90 backdrop-blur-xl py-2 shadow-2xl shadow-black/20" 
          : "bg-brand-navy py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
        <Logo shrink={isScrolled} />

        <div className="hidden lg:flex flex-1 max-w-[480px] relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-navy/40">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search premium curation..."
            className="w-full bg-white rounded-2xl py-3 pl-14 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all text-brand-navy placeholder:text-gray-400 text-sm shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-5 text-white">
          <Link href="/orders" title="My Orders" className="tap-target relative hover:text-accent-gold transition-all hover:scale-110 active:scale-95 hidden sm:flex">
            <ShoppingBag size={22} />
          </Link>

          <Link href="/wishlist" title="Wishlist" className="tap-target relative hover:text-accent-gold transition-all hover:scale-110 active:scale-95 hidden sm:flex">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-accent-gold text-brand-navy text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black shadow-lg"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>

          <Link href="/cart" title="Cart" className="tap-target relative hover:text-accent-gold transition-all hover:scale-110 active:scale-95">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 bg-brand-teal text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black shadow-lg border border-white/20"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />

          {session ? (
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 bg-accent-gold text-brand-navy px-5 py-2.5 rounded-2xl transition-all hover:bg-white active:scale-95 shadow-xl shadow-accent-gold/10 font-bold text-xs uppercase tracking-widest"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-2xl transition-all active:scale-95 font-bold text-xs uppercase tracking-widest"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              )}
            </div>
          ) : (
            <Link 
              href="/auth/signin"
              className="flex items-center gap-2 bg-white/10 hover:bg-brand-teal text-white px-6 py-2.5 rounded-2xl transition-all active:scale-95 font-bold text-xs uppercase tracking-widest shadow-xl shadow-black/10 group"
            >
              <User size={16} className="group-hover:text-white transition-colors" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
