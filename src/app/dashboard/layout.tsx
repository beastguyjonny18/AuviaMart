'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import { logoutAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Package, label: 'Products', href: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
  { icon: Users, label: 'Customers', href: '/dashboard/customers' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: FileText, label: 'Blog', href: '/dashboard/blog' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f12]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-white dark:bg-surface-dark border-r z-50">
        <div className="p-8">
          <Logo shrink />
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-gray-400 group-hover:text-brand-teal")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t dark:border-white/10">
          <button 
            onClick={async () => {
              await logoutAction();
              window.location.href = '/auth/signin';
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Header - Mobile & Desktop */}
      <header className="lg:ml-64 bg-white dark:bg-surface-dark border-b h-20 sticky top-0 z-40">
        <div className="h-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden tap-target"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-full px-4 py-2 border w-64">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative tap-target text-gray-400 hover:text-brand-teal transition-colors">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l dark:border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Roshaan</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-surface-dark z-[70] lg:hidden flex flex-col"
            >
              <div className="p-8 flex justify-between items-center">
                <Logo shrink />
                <button onClick={() => setIsSidebarOpen(false)} className="tap-target">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isActive ? "bg-brand-teal text-white shadow-lg" : "text-gray-500"
                      )}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
