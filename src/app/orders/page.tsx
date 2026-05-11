'use client';

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle2, Package, ArrowRight, Loader2 } from "lucide-react";
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-teal" size={40} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24 text-center">
          <div className="max-w-md mx-auto bg-white p-12 rounded-[2rem] marble-gloss border shadow-xl">
            <ShoppingBag size={64} className="mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl font-serif mb-4 italic">Sign in to track orders</h1>
            <p className="text-gray-500 mb-8">You need to be logged in to view your order history and tracking status.</p>
            <Link href="/auth/signin" className="block w-full bg-brand-teal text-white py-4 rounded-xl font-bold hover:bg-brand-navy transition-all">
              Sign In Now
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-dark">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-serif italic mb-2">My *Orders*</h1>
            <p className="text-gray-500">Track your premium curation from checkout to delivery.</p>
          </header>

          {orders.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-16 text-center border marble-gloss shadow-xl">
              <Package size={64} className="mx-auto mb-6 text-gray-200" />
              <h2 className="text-2xl font-serif mb-4">No orders yet</h2>
              <p className="text-gray-500 mb-8">Once you place an order via WhatsApp, it will appear here for tracking.</p>
              <Link href="/products" className="inline-flex items-center gap-2 text-brand-teal font-bold hover:underline">
                Browse Products <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2rem] p-8 border marble-gloss shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-50">
                    <div>
                      <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block mb-1 opacity-60">Order Reference</span>
                      <h3 className="text-xl font-bold text-brand-navy">{order.id}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Placed On</span>
                        <p className="font-medium text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className={cn(
                        "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2",
                        order.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                        order.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                        order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      )}>
                        {order.status === 'Pending' && <Clock size={14} />}
                        {order.status === 'Processing' && <Package size={14} />}
                        {order.status === 'Delivered' && <CheckCircle2 size={14} />}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Items Summary</h4>
                      <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center">
                            <p className="text-sm font-medium"><span className="text-brand-teal font-bold">{item.quantity}x</span> {item.name}</p>
                            <p className="text-sm text-gray-500 font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-dashed flex justify-between items-center">
                        <p className="font-bold text-brand-navy text-lg">Total Amount</p>
                        <p className="font-black text-brand-teal text-xl">Rs. {order.totalPrice.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="bg-surface-dark rounded-2xl p-6 border border-brand-teal/5">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Tracking Journey</h4>
                      <div className="relative space-y-6 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-teal/10">
                        {[
                          { label: 'Order Placed', active: true, desc: 'Awaiting WhatsApp confirmation' },
                          { label: 'Payment Verified', active: ['Processing', 'Delivered'].includes(order.status), desc: 'Communication established' },
                          { label: 'Out for Delivery', active: order.status === 'Delivered', desc: 'Heading to your address' }
                        ].map((step, idx) => (
                          <div key={idx} className={cn("relative", step.active ? "opacity-100" : "opacity-30")}>
                            <div className={cn(
                              "absolute -left-[30px] top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-sm",
                              step.active ? "bg-brand-teal text-white" : "bg-gray-200"
                            )}>
                              {step.active && <CheckCircle2 size={12} />}
                            </div>
                            <p className="text-sm font-bold leading-none mb-1">{step.label}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">{step.desc}</p>
                          </div>
                        ))}
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
