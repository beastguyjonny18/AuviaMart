'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Goru-style Hero Section */}
        <section className="relative h-[40vh] flex items-center bg-[#f4f7f9] overflow-hidden border-b border-gray-100">
          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-[48px] md:text-[72px] font-bold text-text-primary font-heading leading-tight mb-6">
                Get In <span className="text-brand-teal font-light italic">Touch</span>
              </h1>
              <p className="text-[18px] md:text-[20px] text-text-secondary font-medium">
                We&apos;re here to help you curate your perfect home.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info Grid */}
            <div className="lg:w-2/5 space-y-0 border-t border-l border-gray-100 bg-white">
              {[
                { icon: Mail, title: 'Email Us', value: 'support@auviamart.store', color: 'text-brand-teal' },
                { icon: MessageSquare, title: 'WhatsApp', value: '+92 321 6817897', color: 'text-green-500' },
                { icon: Phone, title: 'Call Us', value: '+92 321 6817897', color: 'text-blue-500' },
                { icon: MapPin, title: 'Visit Us', value: 'Gulberg III, Lahore, PK', color: 'text-accent-gold' },
              ].map((item, i) => (
                <div key={i} className="p-12 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-all duration-400 group">
                  <div className={cn("w-16 h-16 bg-white border-2 border-gray-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", item.color)}>
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary/40 mb-2 font-heading">{item.title}</h3>
                  <p className="text-xl font-bold text-text-primary font-heading">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Contact Form Section */}
            <div className="lg:w-3/5">
              <div className="bg-[#f4f7f9] p-8 md:p-16 relative overflow-hidden">
                {/* Background Label */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
                   <h2 className="text-[120px] font-black uppercase font-heading whitespace-nowrap">Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <input
                        required
                        type="text"
                        placeholder="Your Name *"
                        className="w-full bg-white border-2 border-transparent border-b-gray-200 py-5 px-0 outline-none focus:border-b-brand-teal transition-all text-text-primary font-medium placeholder:text-text-secondary/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        required
                        type="email"
                        placeholder="Email Address *"
                        className="w-full bg-white border-2 border-transparent border-b-gray-200 py-5 px-0 outline-none focus:border-b-brand-teal transition-all text-text-primary font-medium placeholder:text-text-secondary/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full bg-white border-2 border-transparent border-b-gray-200 py-5 px-0 outline-none focus:border-b-brand-teal transition-all text-text-primary font-medium placeholder:text-text-secondary/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <textarea
                      required
                      rows={6}
                      placeholder="Message *"
                      className="w-full bg-white border-2 border-transparent border-b-gray-200 py-5 px-0 outline-none focus:border-b-brand-teal transition-all resize-none text-text-primary font-medium placeholder:text-text-secondary/40"
                    />
                  </div>

                  <button
                    disabled={formState !== 'idle'}
                    type="submit"
                    className="goru-btn w-full lg:w-auto"
                  >
                    {formState === 'idle' ? 'Send Message' : formState === 'sending' ? 'Sending...' : '✓ Sent'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}
