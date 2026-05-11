'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    image: '/products/Portable fan cooler.jpeg',
    title: 'Beat the *Heat*',
    subtitle: 'Stay cool with our premium portable air coolers. Designed for the Pakistani summer.',
    cta: 'Explore Coolers',
  },
  {
    image: '/products/1778480407790.jpeg',
    title: 'Modern *Decor*',
    subtitle: 'Luxury 3D DIY clocks to transform your home into a masterpiece.',
    cta: 'Shop Decor',
  },
  {
    image: '/products/10 series apple watch.jpeg',
    title: 'Future *Tech*',
    subtitle: 'Stay ahead with the latest Series 10 Smart Watches. Style meets performance.',
    cta: 'View Watches',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[80svh] lg:h-[85vh] w-full overflow-hidden bg-brand-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center sm:bg-[center_top] transition-transform duration-[10s] scale-105 animate-slow-zoom opacity-60 sm:opacity-100"
            style={{ backgroundImage: `url("${slides[current].image}")` }}
          />
          {/* Mobile Overlay: Stronger gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy lg:bg-gradient-to-r lg:from-brand-navy lg:via-brand-navy/40 lg:to-transparent" />
          
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start text-white">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif mb-6 max-w-3xl leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: slides[current].title }}
            />
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-2xl font-sans opacity-90 max-w-xl mb-10 leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                href="/products"
                className="px-10 py-4 bg-brand-teal text-white rounded-full transition-all text-lg font-bold shadow-xl shadow-brand-teal/20 hover:bg-white hover:text-brand-navy"
              >
                {slides[current].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-10 right-4 lg:right-12 flex gap-4 z-20">
        <button onClick={prev} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-4 lg:left-12 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
