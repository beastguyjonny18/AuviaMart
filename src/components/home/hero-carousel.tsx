'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    image: '/products/Portable fan cooler.jpeg',
    title: 'The Device That <br/> Takes You Higher.',
    subtitle: 'Stay cool with our premium portable air coolers. Designed for the Pakistani summer.',
    cta: 'Explore Now',
  },
  {
    image: '/products/Airpods.jpeg',
    title: 'Luxury Decor <br/> For Modern Living.',
    subtitle: 'Luxury 3D DIY clocks to transform your home into a masterpiece.',
    cta: 'Shop Decor',
  },
  {
    image: '/products/10 series apple watch.jpeg',
    title: 'Precision Tech <br/> On Your Wrist.',
    subtitle: 'Stay ahead with the latest Series 10 Smart Watches. Style meets performance.',
    cta: 'View Collection',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[85svh] lg:h-[95vh] w-full overflow-hidden bg-[#f4f7f9]">
      {/* Goru-style Scroll Down */}
      <div className="hidden lg:flex absolute left-[5%] top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-24">
        <a 
          href="#featured-categories" 
          className="text-[18px] font-bold uppercase tracking-widest text-text-primary [writing-mode:vertical-lr] rotate-180 relative group"
        >
          <span className="relative z-10">scroll to explore</span>
          <div className="absolute -top-[140px] right-[12px] w-[3px] h-[120px] bg-text-primary group-hover:bg-brand-teal transition-colors duration-400" />
        </a>
        <div className="mt-16">
           <img src="/public/products/Airpods.jpeg" alt="" className="hidden" /> {/* Placeholder for scroll icon if needed */}
        </div>
      </div>

      {/* Goru-style Slider Counter */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[24px] font-bold text-text-primary">0{current + 1}</span>
        <div className="h-[60px] w-[2px] bg-gray-200 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-brand-teal"
            initial={{ height: 0 }}
            animate={{ height: `${((current + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <span className="text-[14px] font-medium text-text-secondary">0{slides.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              
              <div className="relative z-10 order-2 lg:order-1">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 
                    className="text-[40px] md:text-[60px] lg:text-[72px] leading-[1.1] font-bold text-text-primary mb-8"
                    dangerouslySetInnerHTML={{ __html: slides[current].title }}
                  />
                  <p className="text-[18px] md:text-[24px] text-text-secondary mb-12 max-w-xl leading-relaxed">
                    {slides[current].subtitle}
                  </p>
                  <Link href="/products" className="goru-btn">
                    {slides[current].cta}
                  </Link>
                </motion.div>
              </div>

              <div className="relative order-1 lg:order-2 h-[40vh] lg:h-[70vh] flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, x: 50 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <img 
                    src={slides[current].image} 
                    alt="Slider Image" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Decorative Shapes (Goru Style) */}
                <div className="absolute -z-10 w-full h-full flex items-center justify-center">
                   <div className="w-[80%] aspect-square bg-brand-teal/5 rounded-full animate-pulse" />
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Bottom Center (Mobile) / Bottom Right (Desktop) */}
      <div className="absolute bottom-10 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-[10%] flex gap-4 z-20">
        <button 
          onClick={prev} 
          className="w-14 h-14 border-2 border-text-primary flex items-center justify-center text-text-primary hover:bg-brand-teal hover:border-brand-teal hover:text-white transition-all duration-400 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={next} 
          className="w-14 h-14 border-2 border-text-primary flex items-center justify-center text-text-primary hover:bg-brand-teal hover:border-brand-teal hover:text-white transition-all duration-400 active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
