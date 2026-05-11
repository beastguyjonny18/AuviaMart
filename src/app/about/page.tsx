'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Zap, Heart, Globe } from "lucide-react";

const stats = [
  { label: 'Products Curated', value: '500+' },
  { label: 'Happy Customers', value: '10k+' },
  { label: 'Delivery Speed', value: '24h' },
  { label: 'Support Quality', value: '24/7' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-navy dark:bg-brand-navy">
          <div className="absolute inset-0 z-0">
            <Image
              src="/products/1778482194382.jpeg"
              alt="About AuviaMart"
              fill
              className="object-cover opacity-40 grayscale"
            />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif italic mb-6"
            >
              The *AuviaMart* Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto"
            >
              Redefining modern living in Qatar through premium curation and exceptional service.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Our Mission</h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-70 mb-12">
              At Auvia Mart, we believe that your home is your sanctuary. Our mission is to provide Qatar with a 
              personally curated selection of high-end home decor, innovative appliances, and lifestyle essentials 
              that blend aesthetic beauty with modern functionality.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="p-6 bg-gray-50 dark:bg-surface-dark rounded-2xl">
                  <div className="text-3xl font-bold text-brand-teal mb-2">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-white dark:bg-surface-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif mb-16 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Every product in our catalog undergoes rigorous quality checks before reaching your door.' },
                { icon: Zap, title: 'Innovation First', desc: 'We source the latest tech and trends to keep your home at the forefront of modern living.' },
                { icon: Heart, title: 'Customer Obsession', desc: 'Our relationship with you begins at checkout. We provide 24/7 support for all our products.' },
                { icon: Globe, title: 'Global Sourcing', desc: 'We travel the world to bring unique, exclusive pieces that you won’t find anywhere else in Qatar.' },
              ].map((value, i) => (
                <div key={i} className="p-8 bg-white dark:bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow group">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal mb-6 group-hover:scale-110 transition-transform">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative aspect-[4/5] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/products/1778480800636.jpeg"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-brand-teal font-bold uppercase tracking-widest text-xs mb-4 block">A Message from our Founder</span>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-8">&ldquo;We curate for the discerning home.&rdquo;</h2>
              <div className="space-y-6 opacity-70 text-lg leading-relaxed">
                <p>
                  AuviaMart was born out of a simple need: the desire for premium, reliable, and stylish home essentials in Qatar. 
                  As a resident of Doha, I found it difficult to find a single destination that offered both quality and aesthetic appeal.
                </p>
                <p>
                  Today, we are proud to be that destination. Whether it is our signature 3D DIY clocks or our ultra-portable 
                  cooling solutions, every item we sell is something we would (and do) use in our own homes.
                </p>
              </div>
              <div className="mt-12">
                <div className="text-2xl font-serif italic">Roshaan Tasneem</div>
                <div className="text-sm uppercase tracking-widest font-bold opacity-40 mt-1">Founder, Auvia Mart</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}
