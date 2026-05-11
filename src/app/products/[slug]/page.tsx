'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Star, ShieldCheck, Truck, RefreshCcw, Minus, Plus, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/store/use-store';

const product = {
  id: '1',
  name: 'Premium Manuka Honey MGO 500+',
  brand: 'NEW ZEALAND PURE',
  price: 245.00,
  rating: 4.9,
  reviews: 128,
  description: 'Sourced from the pristine forests of New Zealand, our MGO 500+ Manuka Honey is certified for its high methylglyoxal content. This premium honey offers unique wellness properties and a rich, complex flavor profile that is unmatched.',
  images: [
    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1471943033881-a173bb01c046?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1200&auto=format&fit=crop',
  ],
  ingredients: '100% Raw New Zealand Manuka Honey',
  nutrition: {
    energy: '1400kJ / 335kcal',
    protein: '0.2g',
    fat: '0g',
    carbs: '82g',
    sugars: '82g'
  }
};

export default function ProductDetailPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  const handleAddToCart = () => {
    addItem({ ...product, image: product.images[0], quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 lg:py-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 uppercase tracking-widest">
          <Link href="/">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products">Products</Link>
          <ChevronRight size={12} />
          <span className="text-brand-teal font-bold">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 dark:bg-surface-card-dark">
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImg === i ? "border-brand-teal" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-xs font-bold text-brand-teal uppercase tracking-[0.2em] mb-4 block">
                {product.brand}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        "fill-accent-gold",
                        i < Math.floor(product.rating) ? "text-accent-gold" : "text-gray-200 dark:text-gray-700"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-brand-teal mb-10">
              QAR {product.price.toFixed(2)}
            </div>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center border dark:border-white/10 rounded-full px-4 py-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="tap-target hover:text-brand-teal">
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="tap-target hover:text-brand-teal">
                    <Plus size={18} />
                  </button>
                </div>
                
                <button
                  onClick={() => toggleItem(product.id)}
                  className={cn(
                    "tap-target rounded-full border dark:border-white/10 transition-colors",
                    isWishlisted ? "text-red-500 bg-red-50 dark:bg-red-500/10 border-red-200" : "hover:text-brand-teal"
                  )}
                >
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={cn(
                  "w-full py-5 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 shadow-xl",
                  isAdded 
                    ? "bg-green-500 text-white" 
                    : "bg-brand-teal text-white hover:bg-brand-navy shadow-brand-teal/20"
                )}
              >
                {isAdded ? (
                  <>✓ Added to Cart</>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t dark:border-white/10">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="text-brand-teal" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Pure & Certified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="text-brand-teal" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCcw className="text-brand-teal" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24">
          <div className="flex border-b dark:border-white/10 mb-12 relative">
            {['description', 'ingredients', 'nutrition', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                  activeTab === tab ? "text-brand-teal" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-teal"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-3xl leading-relaxed opacity-80">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p>{product.description}</p>
                </motion.div>
              )}
              {activeTab === 'ingredients' && (
                <motion.div
                  key="ing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="font-bold">{product.ingredients}</p>
                  <p className="mt-4">Free from additives, preservatives, and artificial colors.</p>
                </motion.div>
              )}
              {activeTab === 'nutrition' && (
                <motion.div
                  key="nut"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4 max-w-xs"
                >
                  {Object.entries(product.nutrition).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b dark:border-white/10 pb-2">
                      <span className="capitalize">{key}</span>
                      <span className="font-bold">{val}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}

// Simple Link placeholder since I forgot to import it
function Link({ href, children, className }: any) {
  return <a href={href} className={className}>{children}</a>;
}
