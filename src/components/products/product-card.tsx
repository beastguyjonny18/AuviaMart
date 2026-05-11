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
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, brand, price, image, quantity: 1 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-surface-dark mb-4">
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10 bg-brand-teal text-white text-[10px] font-bold px-2 py-1 rounded">
              {badge}
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 w-10 h-10 bg-white dark:bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              className={isWishlisted ? "text-red-500" : "text-gray-400"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.div>
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
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
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-brand-teal uppercase tracking-widest font-bold">
              {brand}
            </span>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-accent-gold text-accent-gold" />
              <span className="text-[10px] font-medium">{rating}</span>
            </div>
          </div>
          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px] group-hover:text-brand-teal transition-colors">
            {name}
          </h3>
          <p className="text-lg font-bold text-brand-teal">QAR {price.toFixed(2)}</p>
        </div>
      </Link>
      
      <button
        onClick={handleAddToCart}
        className={cn(
          "w-full mt-4 py-3 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium",
          isAdded
            ? "bg-green-500 border-green-500 text-white"
            : "border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
        )}
      >
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.div
              key="added"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <span>✓ Added</span>
            </motion.div>
          ) : (
            <motion.div
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

