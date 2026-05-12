'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    image: '/products/Portable fan cooler.jpeg',
    title: 'Beat the *Heat*',
    subtitle: 'Stay cool with our premium portable air coolers. Designed for the Pakistani summer.',
    cta: 'Explore Coolers',
  },
  {
    image: '/products/Airpods.jpeg',
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
    <section className="relative h-[80svh] lg:h-[90vh] w-full overflow-hidden bg-brand-navy">
      {/* Goru-style Scroll Down Link */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-24">
        <div className="h-20 w-px bg-white/20" />
        <a 
          href="#featured-categories" 
          className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-accent-gold transition-colors [writing-mode:vertical-lr] rotate-180"
        >
          Scroll to explore
        </a>
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-accent-gold"
          >
            <MousePointer2 size={14} className="rotate-180" />
          </motion.div>
        </div>
      </div>

      {/* Goru-style Slider Counter */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4">
        <span className="text-2xl font-serif italic text-white">0{current + 1}</span>
        <div className="h-16 w-px bg-white/20 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-accent-gold"
            initial={{ height: 0 }}
            animate={{ height: `${((current + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs font-bold text-white/40">0{slides.length}</span>
      </div>

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
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy lg:bg-gradient-to-r lg:from-brand-navy lg:via-brand-navy/40 lg:to-transparent" />
          
          <div className="relative h-full container mx-auto px-6 lg:px-24 flex flex-col justify-center items-start text-white">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="text-accent-gold font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                AuviaMart *Exclusive* Selection
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-8xl font-serif mb-6 max-w-4xl leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: slides[current].title }}
            />
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-2xl font-sans opacity-90 max-w-xl mb-12 leading-relaxed font-light"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <Link
                href="/products"
                className="group relative px-12 py-5 bg-brand-teal text-white rounded-full transition-all text-lg font-bold overflow-hidden shadow-2xl shadow-brand-teal/20 active:scale-95"
              >
                <span className="relative z-10">{slides[current].cta}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-brand-teal font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  SHOP NOW
                </span>
              </Link>
              
              <Link href="/about" className="hidden sm:block text-sm font-bold uppercase tracking-widest hover:text-accent-gold transition-colors border-b border-white/20 pb-1">
                Our Philosophy
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Bottom Right */}
      <div className="absolute bottom-10 right-8 lg:right-24 flex gap-4 z-20">
        <button 
          onClick={prev} 
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-teal hover:border-brand-teal transition-all group active:scale-90"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={next} 
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-teal hover:border-brand-teal transition-all group active:scale-90"
        >
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Indicators - Bottom Center for Mobile */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex lg:hidden gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? 'w-10 bg-accent-gold' : 'w-4 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
}
