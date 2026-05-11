'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AnnouncementTicker } from "@/components/layout/announcement-ticker";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductCard } from "@/components/products/product-card";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProductsAction } from "@/lib/actions";
import { motion } from "framer-motion";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProductsAction();
      setFeaturedProducts(data.slice(0, 4));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementTicker />
      <Navbar />
      
      <main className="flex-1">
        <HeroCarousel />

        {/* The AuviaMart Standard Section */}
        <section className="py-24 bg-white dark:bg-surface-dark overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl mb-6 italic">The *AuviaMart* Standard</h2>
                <p className="text-lg opacity-80 mb-8 max-w-sm">
                  Excellence in every detail. We curate high-end tech, home essentials, and lifestyle products for the modern home in Pakistan.
                </p>
                <Link href="/about" className="text-brand-teal font-semibold flex items-center gap-2 group hover:underline">
                  Learn about our curation 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {[
                  { title: 'Premium Quality', desc: 'Sourced from top manufacturers globally.' },
                  { title: 'Delivered Across Pakistan', desc: 'Same-day delivery in Islamabad, next-day across Pakistan.' },
                  { title: 'Personally Curated', desc: 'Every product is tested for quality and durability.' },
                  { title: 'Modern Living', desc: 'Enhance your lifestyle with our innovative collections.' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white dark:bg-white rounded-2xl border-b-2 border-transparent hover:border-brand-teal transition-all group shadow-sm hover:shadow-xl">
                    <div className="w-14 h-14 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal mb-6 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-xl mb-3">{item.title}</h3>
                    <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AuviaMart Exclusives Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div className="max-w-md">
                <h2 className="text-4xl italic mb-4">AuviaMart Exclusives</h2>
                <p className="opacity-70">Hand-picked premium selections found nowhere else in Pakistan.</p>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-brand-teal font-semibold hover:underline">
                Shop all 
                <ArrowRight size={18} />
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-brand-teal" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}

            {/* Mobile Shop All CTA */}
            <div className="mt-12 sm:hidden">
              <Link 
                href="/products" 
                className="w-full flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-bold hover:bg-brand-teal transition-all"
              >
                View all products
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Happy House Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <Image
            src="/products/1778482258100.jpeg"
            alt="Happy House"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl text-white">
              <h2 className="text-5xl md:text-7xl mb-6">Smart *Living*</h2>
              <p className="text-xl mb-10 opacity-90">
                Discover the future of home decor and appliances. From 3D DIY clocks to portable cooling solutions.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-teal text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-brand-navy transition-all group"
              >
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Blog / Articles Section */}
        <section className="py-24 bg-white dark:bg-surface-dark">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl mb-4 italic">The Journal</h2>
              <p className="opacity-70">Insights into modern living, decor tips, and the stories behind our curation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Choosing the Perfect Wall Clock', cat: 'DECOR', image: '/products/1778482277813.jpeg' },
                { title: 'Staying Cool: Portable Solutions', cat: 'LIFESTYLE', image: '/products/1778482277815.jpeg' },
                { title: 'Smart Tech for Daily Vitality', cat: 'TECHNOLOGY', image: '/products/1778482293739.jpeg' },
              ].map((article, i) => (
                <Link key={i} href={`/blog/${i}`} className="group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-md group-hover:shadow-xl transition-shadow">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold tracking-widest">
                      {article.cat}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 group-hover:text-brand-teal transition-colors">{article.title}</h3>
                  <span className="text-brand-teal font-semibold text-sm flex items-center gap-1">
                    Read More <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-24 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif mb-4">Follow Our Journey</h2>
            <Link 
              href="https://instagram.com/auvia_org" 
              target="_blank"
              className="text-brand-teal font-bold text-lg hover:underline mb-12 inline-block"
            >
              @auvia_org
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
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm"
                >
                  <Image src={img} alt="Instagram Post" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      📸
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-navy text-white py-20 pb-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-serif mb-4 block">Auvia Mart</span>
              <p className="opacity-60 text-sm leading-relaxed max-w-xs mb-8">
                Pure. Curated. Delivered. The destination for high-end organic essentials in Pakistan.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/auvia_org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center rounded-full" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 100-8 4 4 0 000 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/></svg>
                </a>
                <a href="https://facebook.com/auvia_org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center rounded-full" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/auvia_org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center rounded-full" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://linkedin.com/company/auvia_org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-brand-teal transition-colors flex items-center justify-center rounded-full" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">Shop</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/products?category=Home Decor">Home Decor</Link></li>
                <li><Link href="/products?category=Home Appliances">Home Appliances</Link></li>
                <li><Link href="/products?category=Electronics">Electronics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">AuviaMart</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/blog">The Journal</Link></li>
                <li><Link href="/partners">Partners</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/delivery">Delivery Info</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="opacity-40 text-xs text-center md:text-left">© 2026 AuviaMart Pakistan. Designed for Pakistan.</p>
              <p className="opacity-40 text-xs text-center md:text-left mt-2">All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-xs opacity-60 mb-2">PAYMENT METHODS</p>
                <div className="flex gap-3 text-xs opacity-40">
                  <span>VISA</span>
                  <span>•</span>
                  <span>MASTERCARD</span>
                  <span>•</span>
                  <span>APPLE PAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <MobileNav />
    </div>
  );
}
