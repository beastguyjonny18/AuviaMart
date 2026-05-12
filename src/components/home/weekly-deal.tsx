'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
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
    <section className="py-24 bg-white overflow-hidden relative border-b border-gray-100" id="coupone">
      {/* Goru-style Vertical Label */}
      <div className="hidden xl:block absolute left-[5%] top-1/2 -translate-y-1/2">
        <span className="text-[24px] font-bold uppercase text-text-primary [writing-mode:vertical-lr] rotate-180 font-heading">
          Weekly <span className="font-light">Deals</span>
        </span>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -80, skewX: -5 }}
              whileInView={{ opacity: 1, x: 0, skewX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h2 className="text-[48px] font-bold text-text-primary font-heading">Weekly Deal</h2>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[24px] font-bold text-brand-teal font-heading"
              >
                Rs. 8,500.00
              </motion.div>

              <p className="text-text-secondary text-[18px] leading-[30px] max-w-lg font-medium">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequid.
              </p>

              {/* Goru-style Countdown */}
              <div className="flex gap-4 md:gap-6 py-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), duration: 0.8 }}
                    className="flex flex-col items-center min-w-[70px] border-r last:border-0 border-gray-100 pr-4 md:pr-6"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={item.value}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-[36px] font-bold text-text-primary font-heading leading-tight mb-1"
                      >
                        {item.value < 10 ? `0${item.value}` : item.value}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[14px] font-medium text-text-secondary">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <Link href="/products/air-cooler" className="goru-btn">
                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 80, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full group"
            >
              <div className="absolute inset-0 bg-[#f4f7f9] rounded-none -z-10 translate-x-12 translate-y-12 transition-transform duration-1000 group-hover:translate-x-16 group-hover:translate-y-16" />
              <div className="relative w-full h-full bg-white p-8 overflow-hidden">
                <Image
                  src="/products/Portable fan cooler.jpeg"
                  alt="Weekly Deal Product"
                  fill
                  className="object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

