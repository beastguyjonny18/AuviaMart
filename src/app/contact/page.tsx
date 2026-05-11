'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Contact Info */}
            <div className="lg:w-2/5 space-y-12">
              <div>
                <h1 className="text-5xl font-serif italic mb-6">Get in *Touch*</h1>
                <p className="text-lg opacity-60">We&apos;re here to help. Reach out to us via any of these channels or use the form.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest opacity-40 mb-1">Email Us</h3>
                    <p className="text-lg font-medium">support@auviamart.store</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest opacity-40 mb-1">WhatsApp</h3>
                    <p className="text-lg font-medium">+92 321 6817897</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest opacity-40 mb-1">Call Us</h3>
                    <p className="text-lg font-medium">+92 321 6817897</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center text-accent-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest opacity-40 mb-1">Visit Us</h3>
                    <p className="text-lg font-medium">Main Boulevard, Gulberg III<br />Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Links Placeholder */}
              <div className="pt-8 border-t dark:border-white/10">
                <h3 className="font-bold text-xs uppercase tracking-[0.3em] opacity-40 mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Twitter', 'TikTok'].map(social => (
                    <span key={social} className="text-sm font-bold hover:text-brand-teal cursor-pointer transition-colors">
                      {social}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-3/5">
              <div className="bg-white dark:bg-surface-dark p-8 md:p-12 rounded-[40px] shadow-xl shadow-brand-teal/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white dark:bg-surface-dark border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white dark:bg-surface-dark border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Subject</label>
                      <select className="w-full bg-white dark:bg-white border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none">
                      <option>Product Inquiry</option>
                      <option>Order Status</option>
                      <option>Returns & Refunds</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full bg-white dark:bg-surface-dark border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-teal transition-all resize-none"
                    />
                  </div>

                  <button
                    disabled={formState !== 'idle'}
                    type="submit"
                    className="w-full bg-brand-teal text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-brand-teal/20 hover:bg-brand-navy transition-all flex items-center justify-center gap-3"
                  >
                    {formState === 'idle' && (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                    {formState === 'sending' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <Zap size={20} />
                      </motion.div>
                    )}
                    {formState === 'sent' && (
                      <>✓ Message Sent</>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
