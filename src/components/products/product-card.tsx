'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
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
  badge?: 'BEST SELLER' | 'NEW';
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        className="block h-full bg-white dark:bg-white rounded-[2rem] overflow-hidden marble-gloss border border-transparent hover:border-brand-teal/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 p-3"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10 bg-brand-teal text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest shadow-xl">
              {badge}
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md hover:scale-110 hover:bg-brand-teal hover:text-white transition-all"
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              className={isWishlisted ? "text-red-500" : "currentColor"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.div>
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-brand-teal uppercase tracking-[0.2em] font-bold opacity-60">
              {brand}
            </span>
            <div className="flex items-center gap-1 bg-accent-gold/10 px-2 py-1 rounded-lg">
              <Star size={12} className="fill-accent-gold text-accent-gold" />
              <span className="text-[10px] font-bold">{rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-serif italic line-clamp-2 min-h-[56px] group-hover:text-brand-teal transition-colors leading-tight">
            {name}
          </h3>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xl font-bold text-brand-navy">Rs. {price.toLocaleString()}</p>
            
            <button
              onClick={handleAddToCart}
              className={cn(
                "w-12 h-12 rounded-2xl transition-all flex items-center justify-center shadow-lg",
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-brand-teal text-white hover:bg-brand-navy shadow-brand-teal/20"
              )}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>✓</motion.span>
                ) : (
                  <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ShoppingCart size={20} />
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

