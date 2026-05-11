'use client';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, ShoppingCart, Heart, User, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getSessionAction } from '@/lib/actions';
import { useEffect, useState } from 'react';

export function MobileNav() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const session = await getSessionAction();
      const ADMIN_EMAILS = ['sololvlar@gmail.com', 'sololvlar69@gmail.com', 'roshiim1001@gmail.com'];
      if (session?.email && ADMIN_EMAILS.includes(session.email.toLowerCase())) {
        setIsAdmin(true);
      }
    }
    checkAdmin();
  }, []);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: LayoutGrid, label: 'Shop', href: '/products' },
    { icon: isAdmin ? LayoutDashboard : ShoppingBag, label: isAdmin ? 'Admin' : 'Orders', href: isAdmin ? '/dashboard' : '/orders' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: ShoppingCart, label: 'Cart', href: '/cart' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-morphism h-20 px-2 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 transition-all relative flex-1 min-w-0",
                isActive ? "text-brand-teal scale-110" : "text-gray-400"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-brand-teal/10 shadow-inner" : ""
              )}>
                <item.icon size={20} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-tight truncate w-full text-center">
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-brand-teal rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
