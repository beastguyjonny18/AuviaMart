'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AnnouncementTicker } from "@/components/layout/announcement-ticker";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { CategorySection } from "@/components/home/category-section";
import { WeeklyDeal } from "@/components/home/weekly-deal";
import { ProductCard } from "@/components/products/product-card";
import { Footer } from "@/components/layout/footer";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProductsAction, getSiteSettingsAction } from "@/lib/actions";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const [productsData, settingsData] = await Promise.all([
        getProductsAction(),
        getSiteSettingsAction()
      ]);
      setFeaturedProducts(productsData.slice(0, 4));
      setSettings(settingsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementTicker />
      <Navbar />
      
      <main className="flex-1">
        <HeroCarousel />
        
        <CategorySection />

        {/* Goru-style Trending Products Section */}
        <section className="py-24 bg-white overflow-hidden relative border-b border-gray-100">
          <div className="hidden xl:block absolute right-[5%] top-1/2 -translate-y-1/2">
            <span className="text-[24px] font-bold uppercase text-text-primary [writing-mode:vertical-lr] font-heading">
              Trending <span className="font-light">Products</span>
            </span>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div className="max-w-2xl">
                <h2 className="goru-section-title">Trending Products</h2>
                <p className="goru-section-desc">
                  Explore our most coveted premium pieces, hand-picked for the modern home in Pakistan.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-brand-teal" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-100">
                {featuredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="border-r border-b border-gray-100 p-6 md:p-8 hover:bg-[#f4f7f9] transition-all duration-400"
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-16 text-center">
              <Link href="/products" className="goru-btn">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        <WeeklyDeal />

        {/* The AuviaMart Standard Section */}
        <section className="section-padding bg-white overflow-hidden relative">
           {/* Goru-style Vertical Label */}
           <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2">
            <span className="text-[10px] font-black uppercase tracking-[1em] text-brand-teal/10 [writing-mode:vertical-lr]">
              Our *Philosophy*
            </span>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-2/5 text-center lg:text-left"
              >
                <span className="text-brand-teal font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Excellence in detail</span>
                <h2 className="text-4xl md:text-7xl mb-8 italic leading-tight">The *AuviaMart* Standard</h2>
                <p className="text-lg md:text-xl opacity-80 mb-10 leading-relaxed font-light">
                  We curate high-end tech, home essentials, and lifestyle products for the modern home in Pakistan.
                </p>
                <Link href="/about" className="inline-flex items-center gap-4 bg-brand-teal text-white px-10 py-5 rounded-full font-bold hover:bg-brand-navy transition-all group shadow-2xl shadow-brand-teal/20 active:scale-95">
                  Our Philosophy
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full">
                {[
                  { title: 'Premium Quality', desc: 'Sourced from top manufacturers globally.' },
                  { title: 'Nationwide Delivery', desc: 'Same-day delivery in Islamabad, next-day across Pakistan.' },
                  { title: 'Personally Curated', desc: 'Every product is tested for quality and durability.' },
                  { title: 'Modern Living', desc: 'Enhance your lifestyle with our innovative collections.' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="p-10 bg-surface-light rounded-[2.5rem] border border-transparent hover:border-brand-teal/20 transition-all group shadow-sm hover:shadow-2xl marble-gloss"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-teal mb-8 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl mb-4 italic font-serif">{item.title}</h3>
                    <p className="text-base text-gray-500 leading-relaxed font-light">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Smart Living Section (CTA) */}
        <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={settings?.ctaImage || "/products/1778482258100.jpeg"}
              alt="Happy House"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[1px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl text-white text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-accent-gold font-black uppercase tracking-[0.5em] text-xs mb-6 block">Ready to transform?</span>
                <h2 className="text-6xl md:text-9xl mb-8 font-serif leading-tight italic">
                  {settings?.ctaTitle?.split('*').map((part: string, i: number) => 
                    i % 2 === 1 ? <span key={i} className="text-accent-gold">{part}</span> : part
                  ) || "Smart Living"}
                </h2>
                <p className="text-xl md:text-3xl mb-12 opacity-90 leading-relaxed font-light max-w-2xl">
                  {settings?.ctaDescription || "Discover the future of home decor and appliances."}
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-6 bg-brand-teal text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-brand-teal transition-all group shadow-2xl shadow-black/40 active:scale-95"
                >
                  {settings?.ctaButtonText || "Shop Now"}
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog / Articles Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-brand-teal font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Journal</span>
              <h2 className="text-4xl md:text-6xl mb-6 italic font-serif">The *Journal*</h2>
              <p className="opacity-70 text-lg leading-relaxed">Insights into modern living, decor tips, and the stories behind our curation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Choosing the Perfect Wall Clock', cat: 'DECOR', image: '/products/1778482277813.jpeg' },
                { title: 'Staying Cool: Portable Solutions', cat: 'LIFESTYLE', image: '/products/1778482277815.jpeg' },
                { title: 'Smart Tech for Daily Vitality', cat: 'TECHNOLOGY', image: '/products/1778482293739.jpeg' },
              ].map((article, i) => (
                <Link key={i} href={`/blog/${i}`} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black tracking-[0.3em] text-brand-teal shadow-xl">
                      {article.cat}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif mb-4 group-hover:text-brand-teal transition-colors italic leading-tight">{article.title}</h3>
                  <span className="text-brand-teal font-black text-xs flex items-center gap-3 uppercase tracking-widest">
                    Read Story <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-32 bg-surface-light border-t">
          <div className="container mx-auto px-4 text-center">
             <span className="text-brand-teal font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Social Discovery</span>
            <h2 className="text-5xl md:text-7xl mb-8 italic font-serif leading-tight">Follow Our *Journey*</h2>
            <Link 
              href={settings?.instagram || "https://instagram.com/auvia_org"} 
              target="_blank"
              className="text-brand-teal font-black text-2xl hover:text-brand-navy transition-all mb-20 inline-block tracking-[0.3em] border-b-2 border-brand-teal/10 hover:border-brand-teal pb-2"
            >
              @AUVIA_MART
            </Link>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                '/products/1778480431596.jpeg',
                '/products/1778480407790.jpeg',
                '/products/1778480407791.jpeg',
                '/products/1778480422145.jpeg',
                '/products/1778482106500.jpeg',
                '/products/1778482194382.jpeg',
              ].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.98 }}
                  className="relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer shadow-lg group"
                >
                  <Image src={img} alt="Instagram Post" fill className="object-cover" />
                  <div className="absolute inset-0 bg-brand-teal/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      📸
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppButton />
      <MobileNav />
    </div>
  );
}
