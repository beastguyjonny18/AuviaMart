'use client';

import { motion } from 'framer-motion';
import { 
  Watch, 
  Smartphone, 
  Tv, 
  Headphones, 
  Camera, 
  Gamepad2, 
  Lamp, 
  Wind, 
  Clock 
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Smart Watches', icon: Watch, slug: 'electronics' },
  { name: 'Smartphones', icon: Smartphone, slug: 'electronics' },
  { name: 'TV & Video', icon: Tv, slug: 'electronics' },
  { name: 'Audio', icon: Headphones, slug: 'electronics' },
  { name: 'Photography', icon: Camera, slug: 'electronics' },
  { name: 'Gaming', icon: Gamepad2, slug: 'electronics' },
  { name: 'Home Decor', icon: Lamp, slug: 'home-decor' },
  { name: 'Air Cooling', icon: Wind, slug: 'home-appliances' },
  { name: 'Wall Clocks', icon: Clock, slug: 'home-decor' },
];

export function CategorySection() {
  return (
    <section id="featured-categories" className="py-24 bg-white dark:bg-surface-dark overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Goru-style Vertical Label */}
        <div className="hidden xl:block absolute -left-12 top-1/2 -translate-y-1/2">
          <span className="text-[10px] font-black uppercase tracking-[1em] text-brand-teal/20 [writing-mode:vertical-lr] rotate-180">
            Product *Categories*
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif italic mb-6"
            >
              Curated *Collections*
            </motion.h2>
            <p className="text-gray-500 text-lg max-w-lg">
              Explore our hand-picked selections across premium categories, designed for modern living in Pakistan.
            </p>
          </div>
          
          <Link href="/products" className="text-brand-teal font-black text-sm uppercase tracking-widest border-b-2 border-brand-teal/20 hover:border-brand-teal transition-all pb-1">
            Browse All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-brand-teal/20 hover:bg-white dark:hover:bg-brand-navy hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:scale-110">
                  <cat.icon size={32} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-center opacity-60 group-hover:opacity-100 transition-opacity">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
