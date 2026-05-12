'use client';

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle2, Package, ArrowRight, Loader2, Grid } from "lucide-react";
import { useEffect, useState } from "react";
import { getSessionAction, getUserOrdersAction } from "@/lib/actions";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const sess = await getSessionAction();
      setSession(sess);
      if (sess?.email) {
        const data = await getUserOrdersAction(sess.email);
        setOrders(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-teal" size={48} strokeWidth={1.5} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24 text-center">
          <div className="max-w-2xl mx-auto bg-[#f4f7f9] p-20 border-t border-l border-gray-100 relative group">
            <div className="absolute right-0 bottom-0 border-r border-b border-gray-100 w-full h-full pointer-events-none" />
            <ShoppingBag size={64} strokeWidth={1} className="mx-auto mb-8 text-gray-200" />
            <h1 className="text-[32px] font-bold text-text-primary font-heading mb-6">Sign in to track orders</h1>
            <p className="text-text-secondary text-[18px] font-medium mb-12">You need to be logged in to view your order history and tracking status.</p>
            <Link href="/auth/signin" className="goru-btn">
              Sign In Now
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Goru-style Header */}
      <section className="bg-[#f4f7f9] py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-[48px] font-bold text-text-primary font-heading">My Orders</h1>
          <p className="text-text-secondary text-[16px] font-medium">Account / <span className="text-brand-teal">Order History</span></p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {orders.length === 0 ? (
            <div className="p-20 bg-[#f4f7f9] text-center border-t border-l border-gray-100 relative">
              <div className="absolute right-0 bottom-0 border-r border-b border-gray-100 w-full h-full pointer-events-none" />
              <Package size={64} strokeWidth={1} className="mx-auto mb-8 text-gray-200" />
              <h2 className="text-[32px] font-bold text-text-primary font-heading mb-6">No orders yet</h2>
              <p className="text-text-secondary text-[18px] font-medium mb-12 max-w-md mx-auto">Once you place an order via WhatsApp, it will appear here for tracking.</p>
              <Link href="/products" className="goru-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-t border-l border-gray-100"
                >
                  <div className="p-8 md:p-12 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-all duration-400">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-8 border-b border-gray-100">
                      <div>
                        <span className="text-[12px] font-bold text-brand-teal uppercase tracking-[0.3em] block mb-2">Order ID</span>
                        <h3 className="text-[24px] font-bold text-text-primary font-heading uppercase">#{order.id.substring(0, 12)}</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-8">
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest block mb-1">Placed On</span>
                          <p className="text-[16px] font-bold text-text-primary font-heading">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest mb-1">Status</span>
                          <span className={cn(
                            "px-6 py-2 border-2 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2",
                            order.status === 'Pending' ? "border-amber-100 text-amber-600" :
                            order.status === 'Processing' ? "border-blue-100 text-blue-600" :
                            "border-brand-teal text-brand-teal"
                          )}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                      <div className="lg:col-span-2">
                        <h4 className="text-[14px] font-bold text-text-primary/40 uppercase tracking-[0.3em] mb-8">Items Curated</h4>
                        <div className="space-y-6">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0">
                              <div className="flex items-center gap-4">
                                <span className="w-8 h-8 bg-brand-navy text-white text-[10px] flex items-center justify-center font-bold font-heading">{item.quantity}</span>
                                <p className="text-[16px] font-bold text-text-primary font-heading">{item.name}</p>
                              </div>
                              <p className="text-[16px] font-bold text-brand-teal">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-10 p-8 bg-[#f4f7f9] flex justify-between items-center">
                          <p className="text-[14px] font-bold text-text-primary uppercase tracking-widest">Total Amount</p>
                          <p className="text-[24px] font-bold text-brand-navy font-heading">Rs. {order.totalPrice.toLocaleString()}.00</p>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-gray-100 p-8 relative">
                        <h4 className="text-[14px] font-bold text-text-primary uppercase tracking-[0.3em] mb-8">Tracking</h4>
                        <div className="relative space-y-10 pl-10 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                          {[
                            { label: 'Order Initiated', active: true, desc: 'Awaiting WhatsApp verification' },
                            { label: 'Processing', active: ['Processing', 'Delivered'].includes(order.status), desc: 'Curating your selection' },
                            { label: 'Out for Delivery', active: order.status === 'Delivered', desc: 'Heading to your address' }
                          ].map((step, idx) => (
                            <div key={idx} className={cn("relative", step.active ? "opacity-100" : "opacity-20")}>
                              <div className={cn(
                                "absolute -left-[37px] top-0 w-[26px] h-[26px] border-4 border-white flex items-center justify-center z-10",
                                step.active ? "bg-brand-teal text-white" : "bg-gray-200"
                              )}>
                                {step.active && <CheckCircle2 size={12} strokeWidth={3} />}
                              </div>
                              <p className="text-[14px] font-bold text-text-primary uppercase tracking-widest leading-none mb-1">{step.label}</p>
                              <p className="text-[12px] text-text-secondary font-medium">{step.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
