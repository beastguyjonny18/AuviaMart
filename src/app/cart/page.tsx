'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/use-store';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "97412345678"; // Replace with actual business number
    const itemDetails = items.map(item => 
      `*${item.name}* (x${item.quantity}) - QAR ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = encodeURIComponent(
      `🛍️ *New Order from AuviaMart*\n\n` +
      `Hello! I would like to place an order for the following items:\n\n` +
      `${itemDetails}\n\n` +
      `*Total Amount:* QAR ${totalPrice().toFixed(2)}\n\n` +
      `Please confirm my order. Thank you!`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pb-32">
        <h1 className="text-4xl font-serif mb-12 italic">Your *Cart*</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Explore our curated collections to find something special.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-surface-card-dark rounded-2xl border shadow-sm group"
                  >
                    <div className="relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-surface-dark">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block mb-1">
                            {item.brand}
                          </span>
                          <h3 className="text-lg font-medium group-hover:text-brand-teal transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border dark:border-white/10 rounded-full px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-brand-teal"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-brand-teal"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-xl font-bold text-brand-teal">
                          QAR {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-surface-card-dark rounded-3xl border p-8 shadow-sm sticky top-28">
                <h2 className="text-2xl font-serif mb-8 italic">Order *Summary*</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({totalItems()} items)</span>
                    <span className="font-medium text-foreground">QAR {totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="pt-4 border-t dark:border-white/10 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-brand-teal">QAR {totalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Promo Code"
                      className="w-full bg-gray-50 dark:bg-surface-input-dark border rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-teal font-bold text-sm">Apply</button>
                  </div>
                  
                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-brand-teal text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-navy transition-all flex items-center justify-center gap-3"
                  >
                    Checkout via WhatsApp
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 grayscale opacity-30">
                  <span className="text-[10px] font-bold">VISA</span>
                  <span className="text-[10px] font-bold">MASTERCARD</span>
                  <span className="text-[10px] font-bold">AMEX</span>
                  <span className="text-[10px] font-bold">QPAY</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
