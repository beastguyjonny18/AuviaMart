'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/store/use-store';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  badge?: 'BEST SELLER' | 'NEW' | 'SALE';
  rating: number;
}

export function ProductCard({ id, slug, name, brand, price, image, badge, rating }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const isWishlisted = mounted && hasItem(id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, brand, price, image, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({ id, name, brand, price, image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <Link 
        href={`/products/${slug}`} 
        className="block h-full bg-white dark:bg-white rounded-[2.5rem] overflow-hidden marble-gloss border border-transparent hover:border-brand-teal/20 transition-all duration-700 hover:shadow-2xl p-4"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-light">
          {/* Goru-style Badge */}
          {badge && (
            <div className="absolute top-5 left-5 z-10 bg-brand-navy text-white text-[9px] font-black px-4 py-2 rounded-full tracking-[0.2em] shadow-2xl flex items-center gap-2 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
              {badge}
            </div>
          )}
          
          {/* Floating Actions (Visible on Hover) */}
          <div className="absolute top-5 right-5 z-10 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300",
                isWishlisted ? "bg-red-500 text-white" : "bg-white/90 text-brand-navy hover:bg-brand-teal hover:text-white"
              )}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <div className="w-11 h-11 bg-white/90 text-brand-navy rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md hover:bg-brand-teal hover:text-white transition-all duration-300">
               <Eye size={20} />
            </div>
          </div>

          {/* Product Image with Goru-style Zoom */}
          <div className="relative w-full h-full group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000 ease-out">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>

          {/* Mobile Quick Add (Visible only on mobile/touch) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] lg:hidden">
             <button 
               onClick={handleAddToCart}
               className="w-full py-3 bg-brand-teal text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl"
             >
               Quick Add
             </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-brand-teal uppercase tracking-[0.3em] font-black opacity-40">
              {brand}
            </span>
            <div className="flex items-center gap-1.5">
              <Star size={12} className="fill-accent-gold text-accent-gold" />
              <span className="text-[10px] font-black">{rating}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-serif italic line-clamp-2 min-h-[56px] group-hover:text-brand-teal transition-colors leading-tight">
            {name}
          </h3>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest line-through mb-0.5">Rs. {(price * 1.2).toLocaleString()}</span>
               <p className="text-2xl font-black text-brand-navy">Rs. {price.toLocaleString()}</p>
            </div>
            
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-14 h-14 rounded-2xl transition-all flex items-center justify-center shadow-2xl relative overflow-hidden group/btn",
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-brand-teal text-white hover:bg-brand-navy shadow-brand-teal/20"
              )}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>✓</motion.span>
                ) : (
                  <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                    <ShoppingCart size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

