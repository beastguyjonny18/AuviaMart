'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ProductCard } from '@/components/products/product-card';
import { SlidersHorizontal, X, ChevronDown, Loader2, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductsAction } from '@/lib/actions';

const categories = ['All', 'Home Decor', 'Home Appliances', 'Electronics', 'Beauty'];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('Featured');

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsAction();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Goru-style Page Header */}
      <section className="bg-[#f4f7f9] py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-[48px] font-bold text-text-primary font-heading">Shop</h1>
          <p className="text-text-secondary text-[16px] font-medium">Home / <span className="text-brand-teal">Product Collection</span></p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Goru-style Sidebar */}
          <aside className="hidden lg:block w-72 space-y-12">
            <div>
              <h3 className="text-[20px] font-bold text-text-primary font-heading mb-8 border-b border-gray-100 pb-4 relative">
                Product Categories
                <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-brand-teal" />
              </h3>
              <div className="space-y-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "flex items-center justify-between w-full text-[16px] transition-all duration-300 hover:text-brand-teal font-medium",
                      selectedCategory === cat ? "text-brand-teal" : "text-text-secondary"
                    )}
                  >
                    <span>{cat}</span>
                    <span className="text-[12px] opacity-40">({products.filter(p => p.category === cat || cat === 'All').length})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#f4f7f9] p-8">
              <h3 className="text-[20px] font-bold text-text-primary font-heading mb-6">Price Filter</h3>
              <div className="space-y-6">
                <input type="range" className="w-full accent-brand-teal h-1 bg-gray-200 rounded-none appearance-none cursor-pointer" />
                <div className="flex items-center justify-between text-[14px] font-bold text-text-primary">
                  <span>Rs. 0</span>
                  <span>Rs. 50,000+</span>
                </div>
                <button className="w-full py-3 border-2 border-text-primary text-[12px] font-bold uppercase tracking-widest hover:bg-text-primary hover:text-white transition-all">
                  Filter Now
                </button>
              </div>
            </div>
          </aside>

          {/* Goru-style Product Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
              <p className="text-[16px] text-text-secondary font-medium">
                {loading ? 'Discovering...' : (
                  <>Showing <span className="text-text-primary font-bold">{filteredProducts.length}</span> results</>
                )}
              </p>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-2">
                  <Grid size={20} className="text-brand-teal" />
                  <span className="text-gray-200">|</span>
                </div>
                <div className="relative">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="bg-transparent text-[14px] font-bold text-text-primary outline-none cursor-pointer pr-8 appearance-none"
                  >
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-40">
                <Loader2 className="animate-spin text-brand-teal" size={48} strokeWidth={1.5} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100 bg-white">
                {filteredProducts.map(product => (
                  <div key={product.id} className="border-r border-b border-gray-100 p-8 hover:bg-[#f4f7f9] transition-all duration-400">
                    <ProductCard {...(product as any)} />
                  </div>
                ))}
              </div>
            )}
            
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-40 bg-[#f4f7f9]">
                <h3 className="text-[24px] font-bold text-text-primary font-heading mb-4">No Products Found</h3>
                <p className="text-text-secondary font-medium">Try selecting a different category or adjusting filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[210] w-[80%] bg-white p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-[24px] font-bold text-text-primary font-heading">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 border-2 border-gray-100">
                  <X size={20} />
                </button>
              </div>
              
              {/* Filter Content */}
              <div className="space-y-12">
                <div>
                  <h3 className="text-[18px] font-bold text-text-primary font-heading mb-6 border-b-2 border-brand-teal w-fit pb-1">Categories</h3>
                  <div className="flex flex-col gap-4">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                        className={cn(
                          "text-left text-[16px] font-medium transition-all",
                          selectedCategory === cat ? "text-brand-teal font-bold translate-x-2" : "text-text-secondary"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Filter Button */}
      <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
         <button 
           onClick={() => setIsFilterOpen(true)}
           className="bg-brand-navy text-white px-8 py-4 rounded-none shadow-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-[12px]"
         >
           <SlidersHorizontal size={16} />
           Filters
         </button>
      </div>

      <MobileNav />
    </div>
  );
}
