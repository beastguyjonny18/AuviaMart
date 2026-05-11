'use client';

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: 'Ordering & Delivery',
    questions: [
      { q: 'How long does delivery take within Pakistan?', a: 'We offer same-day delivery for orders placed before 12 PM in Lahore. For the rest of Pakistan, delivery typically takes 24-48 hours.' },
      { q: 'What are the delivery charges?', a: 'We offer free delivery for all orders over Rs. 5000. For orders below that, a flat rate of Rs. 250 applies.' },
      { q: 'Can I track my order?', a: 'Yes! Once your order is dispatched, you will receive a tracking link via SMS and email to monitor your delivery in real-time.' },
    ]
  },
  {
    category: 'Products & Quality',
    questions: [
      { q: 'Are the wall clocks easy to install?', a: 'Absolutely. All our 3D DIY clocks come with a detailed installation guide and a scale to help you position the numbers perfectly.' },
      { q: 'Do you offer warranty on electronics?', a: 'Yes, all our electronics, including smartwatches and air coolers, come with a standard 1-year AuviaMart warranty.' },
      { q: 'How do I clean my 3D wall clock?', a: 'We recommend using a soft, dry microfiber cloth to gently wipe the acrylic surfaces. Avoid using harsh chemicals.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 7-day no-questions-asked return policy for unused products in their original packaging.' },
      { q: 'How do I initiate a return?', a: 'Simply contact our support team via WhatsApp or email with your order number, and we will arrange a pickup.' },
      { q: 'How long does a refund take?', a: 'Once the returned item is inspected, refunds are processed within 3-5 business days back to your original payment method.' },
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif italic mb-6">Frequently Asked *Questions*</h1>
            <p className="text-lg opacity-60">Everything you need to know about AuviaMart products and services.</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-16">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-teal" size={24} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-white border-none rounded-2xl py-5 pl-16 pr-8 text-lg shadow-xl shadow-brand-teal/5 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
            />
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqs.map((section, sectionIdx) => (
              <div key={section.category}>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-teal mb-8">{section.category}</h2>
                <div className="space-y-4">
                  {section.questions.map((faq, faqIdx) => {
                    const id = `${sectionIdx}-${faqIdx}`;
                    const isOpen = openIndex === id;
                    
                    if (searchQuery && !faq.q.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.a.toLowerCase().includes(searchQuery.toLowerCase())) {
                      return null;
                    }

                    return (
                      <div 
                        key={id}
                        className="bg-white dark:bg-white rounded-2xl border border-transparent hover:border-brand-teal/20 transition-all overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => toggleFAQ(id)}
                          className="w-full px-8 py-6 flex items-center justify-between text-left"
                        >
                          <span className="text-lg font-medium pr-8">{faq.q}</span>
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                            isOpen ? "bg-brand-teal text-white rotate-180" : "bg-gray-50 text-gray-400"
                          )}>
                            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-8 pb-8 text-gray-500 leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-24 p-12 bg-brand-navy rounded-3xl text-center text-white">
            <h3 className="text-2xl font-serif mb-4">Still have questions?</h3>
            <p className="opacity-70 mb-8 max-w-md mx-auto">Our support team is always ready to help you with anything you need.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-teal text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-brand-navy transition-all">
                Contact Support
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
