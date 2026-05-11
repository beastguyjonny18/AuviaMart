'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ProductCard } from '@/components/products/product-card';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { products as allProducts } from '@/lib/products';

const categories = ['All', 'Home Decor', 'Home Appliances', 'Electronics', 'Beauty'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('Featured');

  const filteredProducts = allProducts.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 space-y-10 sticky top-28 h-fit">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "block text-sm transition-colors hover:text-brand-teal",
                      selectedCategory === cat ? "text-brand-teal font-bold" : "text-gray-500"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-6">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-brand-teal" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>QAR 0</span>
                  <span>QAR 500+</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-6">Availability</h3>
              <div className="space-y-3">
                {['In Stock', 'Pre-Order'].map(status => (
                  <label key={status} className="flex items-center gap-3 text-sm text-gray-500 cursor-pointer hover:text-brand-teal">
                    <input type="checkbox" className="w-4 h-4 rounded accent-brand-teal" />
                    {status}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-white dark:bg-white px-6 py-3 rounded-full border shadow-sm"
            >
              <SlidersHorizontal size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>
            
            <div className="relative">
              <select className="bg-white dark:bg-white border rounded-full px-6 py-3 text-sm outline-none appearance-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-end justify-between mb-8 hidden lg:flex">
              <p className="text-sm text-gray-500">
                Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Sort By:</span>
                <select className="bg-transparent border-b border-gray-200 py-1 text-sm outline-none focus:border-brand-teal transition-colors">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...(product as any)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-[70] bg-white dark:bg-surface-dark rounded-t-3xl max-h-[85vh] overflow-y-auto p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif italic">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="tap-target">
                  <X size={24} />
                </button>
              </div>
              
              {/* Filter Content */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-6 py-2 rounded-full border text-sm transition-all",
                          selectedCategory === cat 
                            ? "bg-brand-teal text-white border-brand-teal" 
                            : "bg-gray-50 dark:bg-white/5"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-4">Availability</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['In Stock', 'Pre-Order'].map(status => (
                      <label key={status} className="flex items-center gap-3 text-sm text-gray-500 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded-lg accent-brand-teal" />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-teal/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileNav />
    </div>
  );
}
