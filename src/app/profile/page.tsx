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
  LogOut, 
  ChevronRight,
  Loader2,
  Package,
  Heart
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-brand-teal" size={48} strokeWidth={1.5} />
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Goru-style Header */}
      <section className="bg-[#f4f7f9] py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-[48px] font-bold text-text-primary font-heading">My Account</h1>
          <p className="text-text-secondary text-[16px] font-medium">Dashboard / <span className="text-brand-teal">Profile</span></p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Goru-style Sidebar */}
          <aside className="lg:w-1/3">
             <div className="border-t border-l border-gray-100 bg-white mb-12">
                <div className="p-12 border-r border-b border-gray-100 flex flex-col items-center text-center">
                   <div className="w-24 h-24 bg-brand-navy text-white flex items-center justify-center text-[32px] font-bold font-heading mb-6">
                      {session.name?.[0] || session.email?.[0]?.toUpperCase()}
                   </div>
                   <h2 className="text-[24px] font-bold text-text-primary font-heading mb-2">{session.name || 'Premium User'}</h2>
                   <p className="text-brand-teal font-bold uppercase tracking-widest text-[12px]">Platinum Member</p>
                </div>
                
                <div className="p-8 border-r border-b border-gray-100 space-y-4">
                   <div className="flex items-center gap-4 text-[14px] font-bold text-text-primary uppercase tracking-widest">
                      <Mail size={16} className="text-brand-teal" />
                      <span className="opacity-40 w-20">Email:</span>
                      <span className="lowercase">{session.email}</span>
                   </div>
                   <div className="flex items-center gap-4 text-[14px] font-bold text-text-primary uppercase tracking-widest">
                      <Phone size={16} className="text-brand-teal" />
                      <span className="opacity-40 w-20">Phone:</span>
                      <span>{session.phone_number || '---'}</span>
                   </div>
                </div>

                <button 
                  onClick={handleLogout}
                  className="w-full py-8 border-r border-b border-gray-100 text-[14px] font-bold uppercase tracking-widest text-red-500 hover:bg-[#f4f7f9] transition-all flex items-center justify-center gap-3"
                >
                  <LogOut size={18} />
                  Sign Out Account
                </button>
             </div>
          </aside>

          {/* Main Content area */}
          <div className="flex-1">
             <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
                <h3 className="text-[24px] font-bold text-text-primary font-heading">Recent Activity</h3>
                <Link href="/orders" className="text-[14px] font-bold uppercase tracking-widest text-brand-teal flex items-center gap-2 hover:translate-x-2 transition-transform">
                   All Orders <ArrowRight size={16} />
                </Link>
             </div>

             {orders.length === 0 ? (
               <div className="p-20 bg-[#f4f7f9] text-center border-t border-l border-gray-100 group">
                  <div className="absolute right-0 bottom-0 border-r border-b border-gray-100 w-full h-full pointer-events-none" />
                  <Package size={64} strokeWidth={1} className="mx-auto mb-8 text-gray-200" />
                  <h4 className="text-[20px] font-bold text-text-primary font-heading mb-8">No order history found</h4>
                  <Link href="/products" className="goru-btn">Start Shopping</Link>
               </div>
             ) : (
               <div className="border-t border-l border-gray-100">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-8 border-r border-b border-gray-100 flex items-center justify-between hover:bg-[#f4f7f9] transition-all group">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-white border-2 border-gray-100 flex items-center justify-center text-text-primary font-bold">
                             <ShoppingBag size={24} strokeWidth={1.5} />
                          </div>
                          <div>
                             <span className="text-[12px] font-bold uppercase tracking-widest text-brand-teal mb-1 block">#{order.id.substring(0, 8)}</span>
                             <h4 className="text-[18px] font-bold text-text-primary font-heading">{new Date(order.createdAt).toLocaleDateString()}</h4>
                          </div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="text-right hidden sm:block">
                             <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest mb-1 block">Total Amount</span>
                             <p className="text-[16px] font-bold text-text-primary font-heading">Rs. {order.totalPrice.toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                             <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest mb-1 block">Status</span>
                             <span className={cn(
                               "text-[12px] font-bold uppercase tracking-widest",
                               order.status === 'Pending' ? "text-amber-600" : "text-brand-teal"
                             )}>
                               {order.status}
                             </span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-gray-100 mt-12 bg-white">
                <Link href="/wishlist" className="p-12 border-r border-b border-gray-100 hover:bg-[#f4f7f9] transition-all group">
                   <div className="w-16 h-16 bg-white border-2 border-gray-100 flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform">
                      <Heart size={32} strokeWidth={1.5} />
                   </div>
                   <h4 className="text-[20px] font-bold text-text-primary font-heading mb-4 uppercase tracking-widest">My Wishlist</h4>
                   <p className="text-[14px] text-text-secondary font-medium">Your saved premium selections.</p>
                </Link>
                <div className="p-12 border-r border-b border-gray-100 opacity-40 grayscale">
                   <div className="w-16 h-16 bg-white border-2 border-gray-100 flex items-center justify-center text-blue-500 mb-8">
                      <MapPin size={32} strokeWidth={1.5} />
                   </div>
                   <h4 className="text-[20px] font-bold text-text-primary font-heading mb-4 uppercase tracking-widest">Shipping Addresses</h4>
                   <p className="text-[14px] text-text-secondary font-medium">Manage your delivery destinations.</p>
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

import { ArrowRight } from "lucide-react";
