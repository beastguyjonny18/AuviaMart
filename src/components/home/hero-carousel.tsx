'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/products/1778480431596.jpeg',
    title: 'Smart *Living*',
    subtitle: 'Innovative portable solutions for the modern lifestyle in Qatar.',
    cta: 'Shop Appliances',
  },
  {
    image: '/products/1778480407791.jpeg',
    title: 'Modern *Art*',
    subtitle: 'Transform your space with our premium 3D DIY wall clocks.',
    cta: 'Explore Decor',
  },
  {
    image: '/products/1778480422145.jpeg',
    title: 'Tech *Companion*',
    subtitle: 'Stay connected with the latest Ultra Series smartwatches.',
    cta: 'View Tech',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[100svh] lg:h-[75vh] w-full overflow-hidden bg-brand-teal/10 dark:bg-brand-navy">
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
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 animate-slow-zoom"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-brand-navy dark:via-brand-navy/20" />
          
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-slate-900 dark:text-white">
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
              className="text-lg md:text-2xl font-sans opacity-80 max-w-xl mb-10"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.05, backgroundColor: '#1a5f7a' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white rounded-full transition-all text-lg font-medium"
            >
              {slides[current].cta}
            </motion.button>
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
