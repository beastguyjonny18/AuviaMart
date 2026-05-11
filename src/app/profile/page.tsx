'use client';

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  ChevronRight,
  Loader2,
  Package
} from "lucide-react";
import { useEffect, useState } from "react";
import { getSessionAction, getUserOrdersAction, logoutAction, getUsersAction } from "@/lib/actions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const sess = await getSessionAction();
      if (sess?.email) {
        // Fetch full user doc
        const users = await getUsersAction();
        const fullProfile = users.find((u:any) => u.email === sess.email);
        setSession({ ...sess, ...fullProfile });
        
        const data = await getUserOrdersAction(sess.email);
        setOrders(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-brand-teal" size={40} />
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-dark">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Info */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border marble-gloss shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-teal" />
              <div className="w-24 h-24 bg-brand-teal text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6 shadow-lg">
                {session.name?.[0] || session.email?.[0]?.toUpperCase()}
              </div>
              <h1 className="text-2xl font-serif italic mb-1">{session.name || 'User'}</h1>
              <p className="text-gray-500 text-sm mb-8">{session.email}</p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <Mail size={18} className="text-brand-teal" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm font-medium">{session.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <Phone size={18} className="text-brand-teal" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</p>
                    <p className="text-sm font-medium">{session.phone_number || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full mt-10 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 py-3 rounded-xl transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>

            <div className="bg-brand-navy rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-teal/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
               <h3 className="text-xl font-serif italic mb-4">Membership</h3>
               <p className="opacity-70 text-sm leading-relaxed mb-6">Enjoy exclusive early access to our curated premium curations.</p>
               <div className="inline-block bg-accent-gold text-brand-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                 Platinum Member
               </div>
            </div>
          </aside>

          {/* Main Content / Orders */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif italic">Recent *Orders*</h2>
              <Link href="/orders" className="text-brand-teal font-bold text-sm flex items-center gap-1 hover:underline">
                View All <ChevronRight size={16} />
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border marble-gloss shadow-xl">
                <Package size={64} className="mx-auto mb-6 text-gray-200" />
                <h3 className="text-xl font-serif mb-2">No orders found</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Discover our premium collections and place your first order via WhatsApp.</p>
                <Link href="/products" className="inline-flex items-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-full font-bold hover:bg-brand-navy transition-all">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <Link key={order.id} href="/orders">
                    <div className="bg-white p-6 rounded-[2rem] border marble-gloss shadow-md hover:shadow-xl transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                          <ShoppingBag size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{order.id}</p>
                          <h4 className="font-bold text-brand-navy">{new Date(order.createdAt).toLocaleDateString()}</h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                          <p className="font-black text-brand-teal">Rs. {order.totalPrice.toLocaleString()}</p>
                        </div>
                        <div className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          order.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                          order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                          "bg-blue-100 text-blue-700"
                        )}>
                          {order.status}
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <Link href="/wishlist" className="p-8 bg-white rounded-[2rem] border marble-gloss shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-48 group">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif italic mb-1">Wishlist</h4>
                  <p className="text-gray-400 text-xs">Saved premium selections.</p>
                </div>
              </Link>
              <div className="p-8 bg-white rounded-[2rem] border marble-gloss shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-48 group opacity-50 cursor-not-allowed">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif italic mb-1">Addresses</h4>
                  <p className="text-gray-400 text-xs">Manage shipping destinations.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
