import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AnnouncementTicker } from "@/components/layout/announcement-ticker";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductCard } from "@/components/products/product-card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredProducts: { id: string; name: string; brand: string; price: number; image: string; badge?: 'BEST SELLER' | 'NEW'; rating: number }[] = [
  { id: '1', name: 'Premium Manuka Honey MGO 500+', brand: 'NEW ZEALAND PURE', price: 245.00, image: '/products/1778480407790.jpeg', badge: 'BEST SELLER', rating: 4.9 },
  { id: '2', name: 'Organic Cold Pressed Extra Virgin Olive Oil', brand: 'TERRA DEL SOL', price: 85.00, image: '/products/1778480407791.jpeg', rating: 4.8 },
  { id: '3', name: 'Raw Organic Cacao Powder 500g', brand: 'VITALITY FOODS', price: 65.00, image: '/products/1778480422145.jpeg', badge: 'NEW', rating: 4.7 },
  { id: '4', name: 'Himalayan Pink Salt Grinder', brand: 'NATURAL HARVEST', price: 35.00, image: '/products/1778480424461.jpeg', rating: 4.6 },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementTicker />
      <Navbar />
      
      <main className="flex-1">
        <HeroCarousel />

        {/* The AuviaMart Standard Section */}
        <section className="py-24 bg-surface-light dark:bg-surface-dark overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl mb-6 italic">The *AuviaMart* Standard</h2>
                <p className="text-lg opacity-80 mb-8 max-w-sm">
                  Provenance and purity, no compromise. We curate only the most exceptional organic products for your well-being.
                </p>
                <Link href="/about" className="text-brand-teal font-semibold flex items-center gap-2 group hover:underline">
                  Learn about our curation 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {[
                  { title: 'Clean & Organic', desc: 'Sourced from certified organic farms globally.' },
                  { title: 'Delivered Across Qatar', desc: 'Same-day delivery in Doha, next-day across Qatar.' },
                  { title: 'Personally Curated', desc: 'Every product is tested for quality and provenance.' },
                  { title: 'Feel Gloriously Well', desc: 'Support your health with pure, natural ingredients.' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white dark:bg-surface-card-dark rounded-2xl border-b-2 border-transparent hover:border-brand-teal transition-all group shadow-sm hover:shadow-xl">
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
                <p className="opacity-70">Hand-picked premium selections found nowhere else in Qatar.</p>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-brand-teal font-semibold hover:underline">
                Shop all 
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
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
              <h2 className="text-5xl md:text-7xl mb-6">Happy *House*</h2>
              <p className="text-xl mb-10 opacity-90">
                Discover essentials for a toxin-free environment. From natural detergents to sustainable kitchenware.
              </p>
              <Link
                href="/collections/happy-house"
                className="inline-flex items-center gap-2 bg-brand-teal text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-brand-navy transition-all group"
              >
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Our Partners Section */}
        <section className="py-24 bg-white dark:bg-surface-dark border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-serif mb-16 opacity-40 uppercase tracking-widest">Our Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {['VOGUE', 'GOOP', 'NET-A-PORTER', 'SELFRIDGES', 'HARRODS'].map((partner) => (
                <span key={partner} className="text-3xl md:text-4xl font-serif grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default select-none">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Blog / Articles Section */}
        <section className="py-24 bg-surface-light dark:bg-surface-dark">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl mb-4 italic">The Journal</h2>
              <p className="opacity-70">Wellness insights, organic recipes, and the stories behind our curation.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'The Benefits of Raw Manuka Honey', cat: 'WELLNESS', image: '/products/1778482277813.jpeg' },
                { title: '5 Steps to a Plastic-Free Kitchen', cat: 'SUSTAINABILITY', image: '/products/1778482277815.jpeg' },
                { title: 'Morning Rituals for Vitality', cat: 'LIFESTYLE', image: '/products/1778482293739.jpeg' },
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
      </main>

      <footer className="bg-brand-navy text-white py-20 pb-32 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-serif mb-6 block">Auvia Mart</span>
              <p className="opacity-60 text-sm leading-relaxed max-w-xs">
                Pure. Curated. Delivered. The destination for high-end organic essentials in Qatar.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">Shop</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/collections/organic">Organic Foods</Link></li>
                <li><Link href="/collections/happy-house">Happy House</Link></li>
                <li><Link href="/collections/wellness">Wellness</Link></li>
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
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="opacity-40 text-xs">© 2026 AuviaMart. Designed for Qatar.</p>
            <div className="flex gap-6 opacity-40">
              <span className="text-xs">VISA</span>
              <span className="text-xs">MASTERCARD</span>
              <span className="text-xs">APPLE PAY</span>
              <span className="text-xs">GOOGLE PAY</span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <MobileNav />
    </div>
  );
}
