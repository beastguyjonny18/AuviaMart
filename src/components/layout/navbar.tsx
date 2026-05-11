'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Mic, Globe } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/store/use-store';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/95 dark:bg-surface-dark/90 backdrop-blur-md py-2" 
          : "bg-white dark:bg-surface-dark py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-8">
        <Logo shrink={isScrolled} />

        <div className="hidden lg:flex flex-1 max-w-[480px] relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for tech, decor, and more..."
            className="w-full bg-white dark:bg-white rounded-full py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Mic size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/wishlist" className="tap-target relative hover:text-brand-teal transition-colors hidden sm:flex">
            <Heart size={24} />
            {wishlistCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-brand-teal text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full"
              >
                {wishlistCount}
              </motion.span>
            )}
          </Link>

          <Link href="/cart" className="tap-target relative hover:text-brand-teal transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-brand-teal text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          <button className="tap-target hover:text-brand-teal transition-colors hidden md:flex items-center gap-1">
            <Globe size={20} />
            <span className="text-sm font-medium">EN</span>
          </button>

          <Link href="/auth/signin" className="hidden lg:flex items-center gap-2 bg-brand-teal text-white px-6 py-2.5 rounded-full hover:bg-brand-navy transition-colors">
            <User size={20} />
            <span className="text-sm font-medium">Sign In</span>
          </Link>
          
          <Link href="/profile" className="lg:hidden tap-target">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
