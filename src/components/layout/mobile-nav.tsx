'use client';

import { motion } from 'framer-motion';
import { Home, LayoutGrid, ShoppingCart, Heart, User, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: LayoutGrid, label: 'Categories', href: '/categories' },
  { icon: ShoppingBag, label: 'Orders', href: '/orders' },
  { icon: ShoppingCart, label: 'Cart', href: '/cart' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-morphism h-20 px-4">
      <div className="flex items-center justify-between h-full max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors relative",
                isActive ? "text-brand-teal" : "text-gray-400"
              )}
            >
              <item.icon size={24} fill={isActive ? "currentColor" : "none"} />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-1 w-1 h-1 bg-brand-teal rounded-full"
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
