'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Zap, Heart, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: 'Products Curated', value: '500+' },
  { label: 'Happy Customers', value: '10k+' },
  { label: 'Delivery Speed', value: '24h' },
  { label: 'Support Quality', value: '24/7' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Goru-style Hero Section */}
        <section className="relative h-[50vh] flex items-center bg-[#f4f7f9] overflow-hidden border-b border-gray-100">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-[48px] md:text-[72px] font-bold text-text-primary font-heading leading-tight mb-6">
                The AuviaMart <br/><span className="text-brand-teal font-light">Story</span>
              </h1>
              <p className="text-[18px] md:text-[20px] text-text-secondary font-medium max-w-xl">
                Redefining modern living in Pakistan through premium curation and exceptional service.
              </p>
            </motion.div>
          </div>
          
          <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
            <Image
              src="/products/1778482194382.jpeg"
              alt="About AuviaMart"
              fill
              className="object-cover grayscale opacity-20"
            />
          </div>
        </section>

        {/* Goru-style Mission Section */}
        <section className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
          <div className="hidden xl:block absolute left-[5%] top-1/2 -translate-y-1/2">
            <span className="vertical-label !text-text-primary/10 text-[24px]">Our <span className="font-light">Mission</span></span>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="goru-section-title">Our Mission</h2>
                <p className="text-[18px] leading-[32px] text-text-secondary font-medium mb-12">
                  At Auvia Mart, we believe that your home is your sanctuary. Our mission is to provide Pakistan with a 
                  personally curated selection of high-end home decor, innovative appliances, and lifestyle essentials 
                  that blend aesthetic beauty with modern functionality.
                </p>
                <div className="grid grid-cols-2 gap-0 border-t border-l border-gray-100 bg-white">
                  {stats.map((stat, i) => (
                    <div key={i} className="p-10 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-colors duration-400">
                      <div className="text-[36px] font-bold text-brand-teal font-heading mb-2">{stat.value}</div>
                      <div className="text-[12px] font-bold uppercase tracking-widest text-text-secondary">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                 <div className="relative aspect-[4/3] bg-[#f4f7f9] p-8">
                    <Image
                      src="/products/1778480800636.jpeg"
                      alt="Mission"
                      fill
                      className="object-cover border-[15px] border-white shadow-2xl"
                    />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goru-style Values Section */}
        <section className="py-24 bg-[#f4f7f9] border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="goru-section-title">Our Core Values</h2>
               <p className="goru-section-desc mx-auto">We travel the world to bring unique, exclusive pieces found nowhere else.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100 bg-white">
              {[
                { icon: ShieldCheck, title: 'Quality', desc: 'Every product undergoes rigorous quality checks before reaching your door.' },
                { icon: Zap, title: 'Innovation', desc: 'We source the latest tech to keep your home at the forefront of modern living.' },
                { icon: Heart, title: 'Service', desc: 'Our relationship begins at checkout. We provide 24/7 support for all products.' },
                { icon: Globe, title: 'Sourcing', desc: 'Unique, exclusive pieces that you won’t find anywhere else in Pakistan.' },
              ].map((value, i) => (
                <div key={i} className="p-12 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-all duration-400 group">
                  <div className="w-20 h-20 bg-white border-2 border-gray-100 flex items-center justify-center text-text-primary mb-8 group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal transition-all duration-400">
                    <value.icon size={40} strokeWidth={1} />
                  </div>
                  <h3 className="text-[20px] font-bold font-heading mb-4 uppercase tracking-widest text-text-primary">{value.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed font-medium">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goru-style CTA */}
        <section className="py-24 bg-white text-center">
           <div className="container mx-auto px-4">
              <h2 className="text-[48px] font-bold text-text-primary font-heading mb-8">Ready to transform your home?</h2>
              <Link href="/products" className="goru-btn">
                 Shop Collection
              </Link>
           </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}
