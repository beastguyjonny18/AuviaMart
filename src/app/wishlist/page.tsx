'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore, useCartStore } from '@/store/use-store';
import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pb-32">
        <h1 className="text-4xl font-serif mb-12 italic">Your *Wishlist*</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Heart size={40} />
            </div>
            <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Save your favorite items to your wishlist and they will appear here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-surface-card-dark rounded-2xl border shadow-sm overflow-hidden group"
                >
                  <div className="relative aspect-square">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block mb-1">
                      {item.brand}
                    </span>
                    <h3 className="text-lg font-medium mb-4 line-clamp-1">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-brand-teal">
                        QAR {item.price.toFixed(2)}
                      </div>
                      <button
                        onClick={() => addItem({ ...item, quantity: 1 })}
                        className="p-3 bg-brand-teal text-white rounded-xl hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
