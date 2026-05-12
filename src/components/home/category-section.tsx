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
    <section id="featured-categories" className="py-24 bg-white overflow-hidden relative border-b border-gray-100">
      {/* Goru-style Vertical Label */}
      <div className="hidden xl:block absolute left-[5%] top-1/2 -translate-y-1/2">
        <span className="text-[24px] font-bold uppercase text-text-primary [writing-mode:vertical-lr] rotate-180 font-heading">
          Product <span className="font-light">Categories</span>
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="row mb-12">
          <div className="col-lg-12">
            <h2 className="goru-section-title">Product Categories</h2>
            <p className="goru-section-desc">
              Sed ut perspiciatis unde omnis iste natus error sit <br className="hidden md:block"/> voluptatem accusantium dolore.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4 md:gap-0">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-r border-b border-gray-100 last:border-r-0 md:[&:nth-child(9)]:border-r-0"
            >
              <Link 
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center py-12 px-4 transition-all duration-400 hover:bg-[#f4f7f9]"
              >
                <div className="text-text-primary group-hover:text-brand-teal transition-colors duration-400 mb-6">
                  <cat.icon size={48} strokeWidth={1} />
                </div>
                <span className="text-[14px] font-bold uppercase tracking-widest text-text-primary text-center">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Goru-style Decorative Shape */}
      <div className="absolute right-0 bottom-0 -z-10 opacity-10">
         <div className="w-64 h-64 bg-brand-teal rounded-full blur-3xl" />
      </div>
    </section>
  );
}
