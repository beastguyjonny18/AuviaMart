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

        {/* Goru-style The AuviaMart Standard Section */}
        <section className="py-24 bg-[#f4f7f9] overflow-hidden relative border-b border-gray-100">
           {/* Goru-style Vertical Label */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
             className="hidden xl:block absolute right-[5%] top-1/2 -translate-y-1/2"
           >
            <span className="text-[24px] font-bold uppercase text-text-primary [writing-mode:vertical-lr] font-heading">
              Our <span className="font-light">Philosophy</span>
            </span>
          </motion.div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -80, skewY: 2 }}
                whileInView={{ opacity: 1, x: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-2/5 text-center lg:text-left"
              >
                <h2 className="goru-section-title">The *AuviaMart* Standard</h2>
                <p className="text-[18px] text-text-secondary mb-10 leading-relaxed font-medium">
                  We curate high-end tech, home essentials, and lifestyle products for the modern home in Pakistan.
                </p>
                <Link href="/about" className="goru-btn">
                  Our Philosophy
                </Link>
              </motion.div>
              
              <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-gray-100 w-full bg-white shadow-2xl">
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
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-all duration-400 group"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-none bg-white border-2 border-gray-100 flex items-center justify-center text-text-primary mb-8 group-hover:bg-brand-teal group-hover:text-white group-hover:border-brand-teal transition-all duration-400 shadow-sm"
                    >
                      <CheckCircle2 size={32} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-xl font-bold font-heading mb-4 uppercase tracking-widest">{item.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Goru-style Smart Living Section (CTA) */}
        <section className="relative h-[60vh] md:h-[80vh] min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden bg-brand-navy">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={settings?.ctaImage || "/products/1778482258100.jpeg"}
              alt="Happy House"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl text-white text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 50, skewY: 2 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-[50px] md:text-[80px] lg:text-[100px] font-heading font-bold leading-tight mb-8">
                  {settings?.ctaTitle?.replace(/\*/g, '') || "Smart Living"}
                </h2>
                <p className="text-[18px] md:text-[24px] mb-12 opacity-80 leading-relaxed font-medium max-w-2xl">
                  {settings?.ctaDescription || "Discover the future of home decor and appliances."}
                </p>
                <Link
                  href="/products"
                  className="goru-btn !border-white !text-white hover:!bg-white hover:!text-brand-navy"
                >
                  {settings?.ctaButtonText || "Shop Now"}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Goru-style Journal Section */}
        <section className="py-24 bg-white relative border-b border-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
            >
              <div className="max-w-2xl">
                <h2 className="goru-section-title">The Journal</h2>
                <p className="goru-section-desc">
                  Insights into modern living, decor tips, and the stories behind our curation.
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-100 shadow-2xl bg-white">
              {[
                { title: 'Choosing the Perfect Wall Clock', cat: 'DECOR', image: '/products/1778482277813.jpeg' },
                { title: 'Staying Cool: Portable Solutions', cat: 'LIFESTYLE', image: '/products/1778482277815.jpeg' },
                { title: 'Smart Tech for Daily Vitality', cat: 'TECHNOLOGY', image: '/products/1778482293739.jpeg' },
              ].map((article, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-r border-b border-gray-100 group"
                >
                  <Link href={`/blog/${i}`} className="block p-8 hover:bg-[#f4f7f9] transition-all duration-700 h-full">
                    <div className="relative aspect-[4/3] overflow-hidden mb-8 shadow-sm">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-brand-teal px-4 py-1 text-[10px] font-bold text-white uppercase tracking-widest z-10">
                        {article.cat}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-6 group-hover:text-brand-teal transition-colors duration-400 leading-tight">
                      {article.title}
                    </h3>
                    <span className="text-[12px] font-bold uppercase tracking-widest text-text-primary group-hover:text-brand-teal transition-all duration-400 flex items-center gap-2 group-hover:gap-4">
                      Read More <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-24 bg-[#f4f7f9]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="goru-section-title !mb-4">Follow Our Journey</h2>
            <Link 
              href={settings?.instagram || "https://instagram.com/auvia_org"} 
              target="_blank"
              className="text-[18px] font-bold text-brand-teal hover:text-text-primary transition-all mb-16 inline-block tracking-widest uppercase font-heading"
            >
              @AUVIA_MART
            </Link>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 border-t border-l border-gray-200">
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
                  whileHover={{ opacity: 0.8 }}
                  className="relative aspect-square border-r border-b border-gray-200 overflow-hidden cursor-pointer group"
                >
                  <Image src={img} alt="Instagram Post" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
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
