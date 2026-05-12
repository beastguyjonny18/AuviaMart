'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, X, ArrowRight, Menu } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCartStore, useWishlistStore } from '@/store/use-store';
import { getSessionAction, logoutAction } from '@/lib/actions';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[100] w-full transition-all duration-500 border-b border-white/5",
          isScrolled 
            ? "bg-brand-navy/95 backdrop-blur-xl py-2 shadow-2xl shadow-black/20" 
            : "bg-brand-navy py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo shrink={isScrolled} transparent={true} />
          </div>

          {/* Main Menu (Goru Style) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[16px] font-bold uppercase tracking-widest transition-colors duration-400 font-heading",
                  pathname === link.href ? "text-accent-gold" : "text-white hover:text-accent-gold"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Icons (Goru Style) */}
          <div className="flex items-center gap-6 text-white">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="tap-target hover:text-accent-gold transition-all duration-400"
            >
              <Search size={22} strokeWidth={2} />
            </button>

            <Link href="/wishlist" title="Wishlist" className="tap-target relative hover:text-accent-gold transition-all duration-400 hidden sm:flex">
              <Heart size={22} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 bg-accent-gold text-brand-navy text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" title="Cart" className="tap-target relative hover:text-accent-gold transition-all duration-400">
               <div className="flex items-center gap-2">
                 <ShoppingCart size={22} strokeWidth={2} />
                 <span className="text-[14px] font-bold">{cartCount}</span>
               </div>
            </Link>

            <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />

            {session ? (
              <div className="flex items-center gap-4">
                <Link 
                  href={isAdmin ? "/dashboard" : "/profile"} 
                  className="hidden md:flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest hover:text-accent-gold transition-colors"
                >
                  <User size={18} />
                  <span>{isAdmin ? 'Admin' : 'Account'}</span>
                </Link>
              </div>
            ) : (
              <Link 
                href="/auth/signin"
                className="hidden md:flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest hover:text-accent-gold transition-colors"
              >
                <User size={18} />
                <span>Account</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden tap-target hover:text-accent-gold transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Goru-style Immersive Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-brand-navy/95 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <motion.button 
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors p-4"
            >
              <X size={40} strokeWidth={1} />
            </motion.button>

            <div className="w-full max-w-4xl space-y-12">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Search Products..."
                  className="w-full bg-transparent border-b-2 border-white/10 py-8 text-4xl md:text-7xl font-heading font-bold italic text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal transition-all"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-teal hover:scale-110 transition-transform">
                  <ArrowRight size={48} strokeWidth={1.5} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%', skewX: 2 }}
              animate={{ x: 0, skewX: 0 }}
              exit={{ x: '100%', skewX: 2 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="fixed inset-y-0 right-0 z-[160] w-full max-w-[320px] bg-brand-navy p-8 lg:hidden text-white"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo transparent={true} />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-2xl font-bold uppercase tracking-widest font-heading transition-colors",
                        pathname === link.href ? "text-accent-gold" : "text-white hover:text-accent-gold"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
