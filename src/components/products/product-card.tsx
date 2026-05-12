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
      className="group relative"
    >
      {/* Goru-style Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white mb-6">
        {/* Badge */}
        {badge && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute top-4 left-4 z-10"
          >
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-white",
              badge === 'SALE' ? "bg-red-500" : "bg-brand-teal"
            )}>
              {badge}
            </p>
          </motion.div>
        )}

        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Goru-style Hover Actions */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] bg-white/95 backdrop-blur-sm border-t border-gray-100 flex items-center justify-between z-20"
        >
           <button 
             onClick={handleAddToCart}
             className="flex-1 py-4 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest text-text-primary hover:text-brand-teal transition-colors"
           >
             <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <ShoppingCart size={16} />
             </motion.div>
             <span>{isAdded ? 'Added' : 'Add To Cart'}</span>
           </button>
           <div className="w-px h-10 bg-gray-100" />
           <button 
             onClick={handleWishlist}
             className={cn(
               "px-6 py-4 transition-colors",
               isWishlisted ? "text-red-500" : "text-text-primary hover:text-brand-teal"
             )}
           >
             <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
             </motion.div>
           </button>
        </motion.div>
      </div>

      {/* Goru-style Details */}
      <div className="space-y-2 text-center">
        <h4 className="text-[18px] font-bold text-text-primary font-heading line-clamp-1 group-hover:text-brand-teal transition-colors duration-400">
          <Link href={`/products/${slug}`}>{name}</Link>
        </h4>
        
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
            >
              <Star 
                size={12} 
                className={cn(
                  "fill-accent-gold text-accent-gold",
                  i >= Math.floor(rating) && "fill-gray-200 text-gray-200"
                )} 
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[16px] font-bold text-text-primary"
        >
          <span className="text-brand-teal">Rs. {price.toLocaleString()}</span>
          {badge === 'SALE' && (
            <span className="ml-2 text-[14px] text-gray-400 line-through">Rs. {(price * 1.2).toLocaleString()}</span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
