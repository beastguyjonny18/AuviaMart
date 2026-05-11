'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AnnouncementTicker } from "@/components/layout/announcement-ticker";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroCarousel } from "@/components/home/hero-carousel";
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

        {/* AuviaMart Exclusives Section */}
        <section className="section-padding relative overflow-hidden bg-surface-dark">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-teal rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-gold rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-end justify-between mb-8 md:mb-12"
            >
              <div className="max-w-md">
                <h2 className="text-3xl md:text-5xl mb-4 italic">AuviaMart *Exclusives*</h2>
                <p className="opacity-70 text-sm md:text-lg">Hand-picked premium selections found nowhere else in Pakistan.</p>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-brand-teal font-bold hover:gap-4 transition-all group">
                Shop all 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-brand-teal" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Mobile Shop All CTA */}
            <div className="mt-8 md:mt-12 sm:hidden">
              <Link 
                href="/products" 
                className="w-full flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-2xl font-bold hover:bg-brand-teal transition-all shadow-xl shadow-brand-navy/20 active:scale-95"
              >
                View all products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* The AuviaMart Standard Section */}
        <section className="section-padding bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-2/5 text-center lg:text-left"
              >
                <h2 className="text-4xl md:text-6xl mb-6 md:mb-8 italic leading-tight">The *AuviaMart* <br className="hidden md:block"/>Standard</h2>
                <p className="text-base md:text-xl opacity-80 mb-8 md:mb-10 leading-relaxed">
                  Excellence in every detail. We curate high-end tech, home essentials, and lifestyle products for the modern home in Pakistan.
                </p>
                <Link href="/about" className="inline-flex items-center gap-4 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all group shadow-xl shadow-brand-teal/20 active:scale-95">
                  Our Philosophy
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
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
                    className="p-8 md:p-10 bg-surface-dark rounded-3xl border border-transparent hover:border-brand-teal/20 transition-all group shadow-sm hover:shadow-2xl marble-gloss"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-brand-teal mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl md:text-2xl mb-3 md:mb-4 italic">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Smart Living Section (CTA) */}
        <section className="relative h-[60vh] md:h-[70vh] min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
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
          <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-[2px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-8xl mb-6 md:mb-8 font-serif leading-tight italic">
                  {settings?.ctaTitle?.split('*').map((part: string, i: number) => 
                    i % 2 === 1 ? <span key={i} className="text-accent-gold">{part}</span> : part
                  ) || "Smart Living"}
                </h2>
                <p className="text-lg md:text-2xl mb-8 md:mb-12 opacity-90 leading-relaxed font-light">
                  {settings?.ctaDescription || "Discover the future of home decor and appliances."}
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-4 bg-brand-teal text-white px-10 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold hover:bg-white hover:text-brand-teal transition-all group shadow-2xl shadow-black/20 active:scale-95"
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
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl mb-4 italic">The Journal</h2>
              <p className="opacity-70 text-sm md:text-lg">Insights into modern living, decor tips, and the stories behind our curation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { title: 'Choosing the Perfect Wall Clock', cat: 'DECOR', image: '/products/1778482277813.jpeg' },
                { title: 'Staying Cool: Portable Solutions', cat: 'LIFESTYLE', image: '/products/1778482277815.jpeg' },
                { title: 'Smart Tech for Daily Vitality', cat: 'TECHNOLOGY', image: '/products/1778482293739.jpeg' },
              ].map((article, i) => (
                <Link key={i} href={`/blog/${i}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-4 md:mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest text-brand-teal shadow-lg">
                      {article.cat}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-3 group-hover:text-brand-teal transition-colors italic">{article.title}</h3>
                  <span className="text-brand-teal font-bold text-xs md:text-sm flex items-center gap-2">
                    Read More <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-24 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl mb-6 italic">Follow Our Journey</h2>
            <Link 
              href={settings?.instagram || "https://instagram.com/auvia_org"} 
              target="_blank"
              className="text-brand-teal font-bold text-xl hover:text-brand-navy transition-colors mb-16 inline-block tracking-widest"
            >
              @AUVIA_MART
            </Link>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                  className="relative aspect-square rounded-[1.5rem] overflow-hidden cursor-pointer shadow-sm group"
                >
                  <Image src={img} alt="Instagram Post" fill className="object-cover" />
                  <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
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
