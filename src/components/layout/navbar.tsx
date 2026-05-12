'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/store/use-store';
import { getSessionAction, logoutAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
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
    <>
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

          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex flex-1 max-w-[480px] relative group cursor-pointer"
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-navy/40">
              <Search size={18} />
            </div>
            <div className="w-full bg-white rounded-2xl py-3 pl-14 pr-12 text-gray-400 text-sm shadow-inner select-none">
              Search premium curation...
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5 text-white">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden tap-target hover:text-accent-gold transition-all"
            >
              <Search size={22} />
            </button>

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
                href="/profile"
                className="flex items-center gap-2 bg-white/10 hover:bg-brand-teal text-white px-6 py-2.5 rounded-2xl transition-all active:scale-95 font-bold text-xs uppercase tracking-widest shadow-xl shadow-black/10 group"
              >
                <User size={16} className="group-hover:text-white transition-colors" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Goru-style Immersive Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-navy/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-4"
            >
              <X size={40} strokeWidth={1} />
            </button>

            <div className="w-full max-w-4xl space-y-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative group"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b-2 border-white/10 py-8 text-4xl md:text-7xl font-serif italic text-white placeholder:text-white/10 focus:outline-none focus:border-accent-gold transition-all"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-accent-gold hover:scale-110 transition-transform">
                  <ArrowRight size={48} strokeWidth={1.5} />
                </button>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-12"
              >
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-gold mb-6">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Air Cooler', 'DIY Clock', 'Smart Watch', 'Phone Case', 'Headphones'].map(tag => (
                      <button key={tag} className="px-4 py-2 bg-white/5 hover:bg-brand-teal text-white rounded-xl text-sm transition-all">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-gold mb-6">Quick Links</h3>
                  <div className="space-y-4">
                    {['New Arrivals', 'Best Sellers', 'Exclusive Deals', 'Our Standards'].map(link => (
                      <button key={link} className="block text-white/60 hover:text-white transition-colors text-lg italic font-serif">
                        {link}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-brand-teal/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-serif italic text-white mb-2">Need Help?</h3>
                    <p className="text-sm text-white/40 mb-6">Our experts are available on WhatsApp to assist you.</p>
                    <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">Contact Support</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
