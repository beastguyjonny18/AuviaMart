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
  }, []);

  const handleWhatsAppCheckout = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      const session = await getSessionAction();
      
      const orderResult = await createOrderAction({
        items,
        totalPrice: totalPrice(),
        userEmail: session?.email || 'Guest',
        userId: session?.user_id || session?.uid || 'Guest'
      });

      if (orderResult.success) {
        const phoneNumber = "923216817897";
        const itemDetails = items.map(item => 
          `• *${item.name}* (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}`
        ).join('\n');
        
        const messageText = 
          `🛍️ *NEW ORDER FROM AUVIAMART*\n` +
          `──────────────────\n` +
          `*Order ID:* #${orderResult.orderId}\n\n` +
          `*Customer Details:*\n` +
          `Email: ${session?.email || 'Guest User'}\n\n` +
          `*Order Items:*\n` +
          `${itemDetails}\n\n` +
          `──────────────────\n` +
          `*TOTAL AMOUNT:* Rs. ${totalPrice().toLocaleString()}\n` +
          `──────────────────\n\n` +
          `Please confirm my order and share payment details. Thank you!`;

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        clearCart();
        window.open(whatsappUrl, '_blank');
      } else {
        alert("Order Error: " + orderResult.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Goru-style Page Header */}
      <section className="bg-[#f4f7f9] py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-[48px] font-bold text-text-primary font-heading">Shopping Cart</h1>
          <p className="text-text-secondary text-[16px] font-medium">Home / <span className="text-brand-teal">Cart</span></p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20">
        {items.length === 0 ? (
          <div className="text-center py-40 bg-[#f4f7f9] border border-gray-100">
            <div className="w-24 h-24 bg-white border-2 border-gray-100 flex items-center justify-center mx-auto mb-8 text-brand-teal">
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h2 className="text-[32px] font-bold text-text-primary font-heading mb-6">Your cart is empty</h2>
            <p className="text-text-secondary text-[18px] font-medium mb-12 max-w-md mx-auto leading-relaxed">
              Looks like you haven&apos;t added anything to your cart yet. Explore our premium curation.
            </p>
            <Link href="/products" className="goru-btn">
              Return To Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="lg:w-2/3">
              <div className="border-t border-l border-gray-100 bg-white overflow-hidden">
                <div className="hidden sm:grid grid-cols-6 bg-[#f4f7f9] border-b border-r border-gray-100 p-6 text-[14px] font-bold uppercase tracking-widest text-text-primary">
                   <div className="col-span-3">Product</div>
                   <div className="text-center">Price</div>
                   <div className="text-center">Quantity</div>
                   <div className="text-right">Total</div>
                </div>

                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-6 border-b border-r border-gray-100 p-8 items-center gap-6 group hover:bg-[#f4f7f9] transition-colors"
                    >
                      <div className="col-span-1 sm:col-span-3 flex items-center gap-6">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <X size={20} strokeWidth={3} />
                        </button>
                        <div className="relative w-24 h-24 flex-shrink-0 bg-white border border-gray-100 p-2">
                           <Image src={item.image} alt={item.name} fill className="object-contain" />
                        </div>
                        <div>
                           <h3 className="text-[18px] font-bold text-text-primary font-heading line-clamp-1 hover:text-brand-teal transition-colors">
                             <Link href={`/products/${item.id}`}>{item.name}</Link>
                           </h3>
                           <span className="text-[12px] font-bold uppercase tracking-widest text-brand-teal opacity-60">{item.brand}</span>
                        </div>
                      </div>

                      <div className="text-center text-[16px] font-bold text-text-primary">
                        <span className="sm:hidden text-[12px] uppercase opacity-40 mr-2">Price:</span>
                        Rs. {item.price.toLocaleString()}
                      </div>

                      <div className="flex justify-center">
                        <div className="flex items-center border-2 border-gray-100 bg-white h-12">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 hover:text-brand-teal transition-colors"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-10 text-center font-bold text-text-primary text-[14px]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 hover:text-brand-teal transition-colors"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right text-[16px] font-bold text-brand-teal">
                        <span className="sm:hidden text-[12px] uppercase opacity-40 mr-2">Total:</span>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-8">
                 <div className="flex gap-4 w-full sm:w-auto">
                    <input 
                      placeholder="Coupon Code" 
                      className="bg-white border-2 border-gray-100 px-6 py-4 outline-none focus:border-brand-teal transition-all flex-1 sm:w-64 text-[14px] font-medium"
                    />
                    <button className="goru-btn !h-[56px] !px-8 !text-[12px]">Apply</button>
                 </div>
                 <Link href="/products" className="text-[14px] font-bold uppercase tracking-widest text-text-primary hover:text-brand-teal transition-colors">
                    Update Cart
                 </Link>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-[#f4f7f9] p-10 border border-gray-100">
                <h2 className="text-[24px] font-bold text-text-primary font-heading mb-8 border-b border-gray-200 pb-4 relative">
                  Cart Totals
                  <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-brand-teal" />
                </h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[16px] font-bold text-text-primary">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-bold text-text-primary">
                    <span>Shipping</span>
                    <span className="text-brand-teal">Free Shipping</span>
                  </div>
                  <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-[20px] font-bold text-text-primary">
                    <span>Total</span>
                    <span className="text-brand-teal">Rs. {totalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsAppCheckout}
                  disabled={isProcessing}
                  className="goru-btn w-full !bg-text-primary !text-white hover:!bg-brand-teal !border-none flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    'Proceed to WhatsApp'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
