'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Star, ShieldCheck, Truck, RefreshCcw, Minus, Plus, Heart, ShoppingCart, ChevronRight, Loader2, Grid } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/store/use-store';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlugAction } from '@/lib/actions';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    async function fetchProduct() {
      if (typeof slug === 'string') {
        const data = await getProductBySlugAction(slug);
        setProduct(data);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-brand-teal" size={48} strokeWidth={1.5} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="text-center">
          <h1 className="text-[32px] font-bold text-text-primary font-heading mb-6">Product Not Found</h1>
          <Link href="/products" className="goru-btn">Return To Shop</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = mounted && hasItem(product.id);

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Goru-style Breadcrumb Header */}
      <section className="bg-[#f4f7f9] py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-[48px] font-bold text-text-primary font-heading line-clamp-1">{product.name}</h1>
          <div className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-text-secondary">
             <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
             <span className="opacity-20">/</span>
             <Link href="/products" className="hover:text-brand-teal transition-colors">Shop</Link>
             <span className="opacity-20">/</span>
             <span className="text-brand-teal">{product.name}</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Goru-style Image Section */}
          <div className="relative aspect-[4/5] bg-white border-t border-l border-gray-100 p-8 md:p-12 hover:bg-[#f4f7f9] transition-all duration-400 group">
             <div className="absolute right-0 bottom-0 border-r border-b border-gray-100 w-full h-full pointer-events-none" />
             <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                  priority
                />
             </div>
          </div>

          {/* Goru-style Product Details */}
          <div className="flex flex-col">
            <div className="mb-10 pb-10 border-b border-gray-100">
              <span className="text-[12px] font-bold text-brand-teal uppercase tracking-[0.3em] mb-4 block">
                {product.brand}
              </span>
              <h1 className="text-[40px] md:text-[56px] font-bold text-text-primary font-heading leading-tight mb-8">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-8">
                <div className="text-[28px] font-bold text-text-primary">
                   Rs. {Number(product.price).toLocaleString()}.00
                </div>
                <div className="flex items-center gap-1 border-l border-gray-100 pl-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        "fill-accent-gold",
                        i < Math.floor(product.rating || 5) ? "text-accent-gold" : "text-gray-200"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-[14px] font-bold text-text-primary">({product.rating || 5.0})</span>
                </div>
              </div>
            </div>

            <div className="text-[16px] text-text-secondary leading-[30px] font-medium mb-12 max-w-xl">
               {product.description?.substring(0, 200)}...
            </div>

            <div className="space-y-12 mb-12">
              <div className="flex items-center gap-8">
                <div className="flex items-center border-2 border-gray-100 bg-white h-16">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    className="px-6 hover:text-brand-teal transition-colors"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                  <span className="w-12 text-center font-bold text-text-primary text-[18px]">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="px-6 hover:text-brand-teal transition-colors"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                
                <button
                  onClick={() => toggleItem(product)}
                  className={cn(
                    "w-16 h-16 border-2 border-gray-100 flex items-center justify-center transition-all duration-400 group",
                    isWishlisted ? "bg-red-500 border-red-500 text-white" : "hover:border-brand-teal text-text-primary hover:text-brand-teal"
                  )}
                >
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="goru-btn !h-[70px] !px-12 flex-1 !bg-text-primary !text-white hover:!bg-brand-teal !border-none flex items-center justify-center gap-4"
                >
                  <ShoppingCart size={20} strokeWidth={2} />
                  <span>{isAdded ? 'SUCCESSFULLY ADDED' : 'ADD TO CART'}</span>
                </button>
              </div>
            </div>

            {/* Goru-style Meta Info */}
            <div className="space-y-4 pt-10 border-t border-gray-100">
               <p className="text-[14px] font-bold text-text-primary uppercase tracking-widest flex items-center gap-3">
                 <span className="opacity-40">SKU:</span> 
                 <span>AUV-{product.id.substring(0, 8).toUpperCase()}</span>
               </p>
               <p className="text-[14px] font-bold text-text-primary uppercase tracking-widest flex items-center gap-3">
                 <span className="opacity-40">Category:</span> 
                 <Link href={`/products?category=${product.category}`} className="hover:text-brand-teal transition-colors">{product.category}</Link>
               </p>
            </div>
          </div>
        </div>

        {/* Goru-style Tabs Section */}
        <div className="mt-32">
          <div className="flex border-b border-gray-100 gap-12 overflow-x-auto no-scrollbar">
            {['Description', 'Additional Info', 'Reviews (0)'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.split(' ')[0].toLowerCase())}
                className={cn(
                  "pb-6 text-[18px] font-bold font-heading transition-all relative whitespace-nowrap",
                  activeTab === tab.split(' ')[0].toLowerCase() 
                    ? "text-brand-teal" 
                    : "text-text-primary/40 hover:text-text-primary"
                )}
              >
                {tab}
                {activeTab === tab.split(' ')[0].toLowerCase() && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-brand-teal"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-16 max-w-4xl">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[18px] leading-[32px] text-text-secondary font-medium"
                >
                  <p>{product.description}</p>
                </motion.div>
              )}
              {activeTab === 'additional' && (
                <motion.div
                  key="feat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="border-t border-l border-gray-100 grid grid-cols-1 md:grid-cols-2">
                    {product.features?.map((feature: string, i: number) => (
                      <div key={i} className="p-6 border-r border-b border-gray-100 flex items-center gap-4 text-[16px] font-bold text-text-primary uppercase tracking-widest">
                        <div className="w-2 h-2 bg-brand-teal" />
                        {feature}
                      </div>
                    ))}
                  </div>
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
