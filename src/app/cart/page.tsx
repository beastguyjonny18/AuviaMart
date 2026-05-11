'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/use-store';
import { useState, useEffect } from 'react';
import { createOrderAction, getSessionAction } from '@/lib/actions';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  const handleWhatsAppCheckout = async () => {
    setIsProcessing(true);
    try {
      const session = await getSessionAction();
      
      const orderResult = await createOrderAction({
        items,
        totalPrice: totalPrice(),
        userEmail: session?.email,
        userId: session?.user_id || session?.uid
      });

      if (orderResult.success) {
        const phoneNumber = "923216817897";
        const itemDetails = items.map(item => 
          `*${item.name}* (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`
        ).join('\n');
        
        const message = encodeURIComponent(
          `🛍️ *New Order from AuviaMart*\n` +
          `*Order ID:* ${orderResult.orderId}\n\n` +
          `Hello! I would like to place an order for the following items:\n\n` +
          `${itemDetails}\n\n` +
          `*Total Amount:* Rs. ${totalPrice().toLocaleString()}\n\n` +
          `Please confirm my order. Thank you!`
        );

        clearCart();
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      } else {
        alert("Failed to initiate order: " + orderResult.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pb-32">
        <h1 className="text-4xl font-serif mb-12 italic">Your *Cart*</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-surface-card-dark rounded-[2rem] border shadow-sm marble-gloss">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-serif mb-4 italic">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Explore our curated collections to find something special.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all shadow-xl shadow-brand-teal/20"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-surface-card-dark rounded-[2rem] border shadow-sm group marble-gloss transition-all hover:shadow-xl"
                  >
                    <div className="relative w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-gray-50">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block mb-1 opacity-60">
                            {item.brand}
                          </span>
                          <h3 className="text-lg font-serif italic group-hover:text-brand-teal transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center border rounded-full px-4 py-1.5 bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-brand-teal transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-bold font-serif">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-brand-teal transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-xl font-bold text-brand-navy">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-surface-card-dark rounded-[2.5rem] border p-8 shadow-xl sticky top-28 marble-gloss">
                <h2 className="text-2xl font-serif mb-8 italic">Order *Summary*</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span className="text-sm">Subtotal ({totalItems()} items)</span>
                    <span className="font-bold text-brand-navy">Rs. {totalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="text-sm">Delivery Fee</span>
                    <span className="text-green-600 font-black text-xs tracking-widest uppercase">FREE</span>
                  </div>
                  <div className="pt-6 border-t flex justify-between items-center">
                    <span className="text-lg font-serif italic">Total Amount</span>
                    <span className="text-3xl font-black text-brand-teal">Rs. {totalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handleWhatsAppCheckout}
                    disabled={isProcessing}
                    className="w-full bg-brand-teal text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-navy transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Checkout via WhatsApp
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 opacity-30 grayscale scale-75">
                  <span className="text-[10px] font-bold">VISA</span>
                  <span className="text-[10px] font-bold">MASTERCARD</span>
                  <span className="text-[10px] font-bold">AMEX</span>
                  <span className="text-[10px] font-bold">APPLE PAY</span>
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
