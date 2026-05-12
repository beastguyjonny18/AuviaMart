'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function WeeklyDeal() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set target date to next Sunday at midnight
    const target = new Date();
    target.setDate(target.getDate() + (7 - target.getDay()));
    target.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-navy overflow-hidden relative">
      {/* Goru-style Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="lg:w-1/2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="flex items-center gap-3 text-accent-gold">
                <Zap size={20} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-[0.4em]">Limited Time *Offer*</span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif text-white italic leading-tight">
                Weekly *Deal* of the Moment
              </h2>

              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                Our most coveted curation at an exceptional value. Hand-picked for the discerning home, available only until the clock runs out.
              </p>

              {/* Countdown Timer */}
              <div className="flex gap-4 md:gap-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white mb-3 border border-white/10 shadow-2xl">
                      <span className="text-2xl md:text-4xl font-black font-serif italic">
                        {item.value < 10 ? `0${item.value}` : item.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-8 pt-6">
                <Link
                  href="/products/air-cooler" 
                  className="px-12 py-5 bg-accent-gold text-brand-navy rounded-full text-lg font-black hover:bg-white transition-all shadow-2xl shadow-accent-gold/20 flex items-center gap-3 active:scale-95"
                >
                  Shop the Deal
                  <ArrowRight size={20} />
                </Link>
                <div className="hidden sm:block">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-1">Was Rs. 12,000</span>
                  <span className="text-white text-2xl font-black">Rs. 8,500</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square w-full max-w-xl mx-auto"
            >
              <div className="absolute inset-0 bg-brand-teal/20 rounded-[3rem] blur-3xl" />
              <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5">
                <Image
                  src="/products/Portable fan cooler.jpeg"
                  alt="Weekly Deal Product"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-8 right-8 bg-brand-teal text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl animate-pulse">
                  <span className="text-xl font-black">-30%</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest">OFF</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
