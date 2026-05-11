'use client';

import Link from 'next/image';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getSiteSettingsAction } from '@/lib/actions';

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSiteSettingsAction();
      setSettings(data);
    }
    fetchSettings();
  }, []);

  const socials = [
    { id: 'instagram', url: settings?.instagram || "https://instagram.com/auvia_org", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 100-8 4 4 0 000 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/></svg> },
    { id: 'facebook', url: settings?.facebook || "https://facebook.com/auvia_org", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { id: 'twitter', url: settings?.twitter || "https://twitter.com/auvia_org", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> },
    { id: 'linkedin', url: settings?.linkedin || "https://linkedin.com/company/auvia_org", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg> },
  ];

  return (
    <footer className="bg-brand-navy text-white py-20 pb-32 lg:pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-brand-teal rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          <div className="col-span-1 md:col-span-1">
            <span className="text-3xl font-serif mb-6 block italic">Auvia Mart</span>
            <p className="opacity-60 text-sm leading-relaxed max-w-xs mb-8">
              {settings?.footerText || "Pure. Curated. Delivered. The destination for high-end organic essentials in Pakistan."}
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/10 hover:bg-brand-teal transition-all flex items-center justify-center rounded-2xl group shadow-lg"
                  aria-label={social.id}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">Shop</h4>
            <ul className="space-y-4 opacity-70 text-sm">
              <li><NextLink href="/products">All Products</NextLink></li>
              <li><NextLink href="/products?category=Home Decor">Home Decor</NextLink></li>
              <li><NextLink href="/products?category=Home Appliances">Home Appliances</NextLink></li>
              <li><NextLink href="/products?category=Electronics">Electronics</NextLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">AuviaMart</h4>
            <ul className="space-y-4 opacity-70 text-sm">
              <li><NextLink href="/about">Our Story</NextLink></li>
              <li><NextLink href="/blog">The Journal</NextLink></li>
              <li><NextLink href="/partners">Partners</NextLink></li>
              <li><NextLink href="/careers">Careers</NextLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-accent-gold uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 opacity-70 text-sm">
              <li><NextLink href="/faq">FAQ</NextLink></li>
              <li><NextLink href="/delivery">Delivery Info</NextLink></li>
              <li><NextLink href="/contact">Contact Us</NextLink></li>
              <li><NextLink href="/privacy">Privacy Policy</NextLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em]">
          <div>
            <p className="opacity-40 text-center md:text-left">© 2026 AuviaMart Pakistan. Designed for Pakistan.</p>
          </div>
          <div className="flex gap-8 opacity-40">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
