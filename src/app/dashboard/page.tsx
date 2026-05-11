'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Loader2, Package } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';
import { getDashboardStatsAction, getOrdersAction } from '@/lib/actions';
import Link from 'next/link';

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const statsData = await getDashboardStatsAction();
      const ordersData = await getOrdersAction();
      setStats({
        ...statsData,
        recentOrders: ordersData.slice(0, 5)
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const kpis = [
    { label: 'Total Revenue', value: stats?.totalRevenue || 0, prefix: 'Rs. ', suffix: '', change: '+12.5%', icon: DollarSign, color: 'text-brand-teal' },
    { label: 'Orders Today', value: stats?.ordersToday || 0, prefix: '', suffix: '', change: '+5.2%', icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Total Users', value: stats?.totalUsers || 0, prefix: '', suffix: '', change: '+2.1%', icon: Users, color: 'text-accent-gold' },
    { label: 'Total Products', value: stats?.totalProducts || 0, prefix: '', suffix: '', change: '+0.8%', icon: Package, color: 'text-purple-500' },
  ];

  const revenueData = [
    { name: 'May 1', value: 4000 },
    { name: 'May 2', value: 3000 },
    { name: 'May 3', value: 5000 },
    { name: 'May 4', value: 4500 },
    { name: 'May 5', value: 6000 },
    { name: 'May 6', value: 5500 },
    { name: 'May 7', value: 7000 },
  ];

  const topProducts = [
    { name: 'Air Cooler', sales: 450, color: '#1a5f7a' },
    { name: 'DIY Clock', sales: 380, color: '#0d3b55' },
    { name: 'Smart Watch', sales: 320, color: '#e8a44a' },
    { name: 'Calligraphy', sales: 290, color: '#25d366' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2 text-brand-navy">Management *Overview*</h1>
        <p className="text-gray-500 italic">Welcome back. Here&apos;s the latest curation performance.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-brand-teal" size={40} />
        </div>
      ) : (
        <>
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm marble-gloss"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-3 rounded-2xl bg-gray-50 dark:bg-white/5", kpi.color)}>
                    <kpi.icon size={24} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1",
                    kpi.change.startsWith('+') ? "text-green-600 bg-green-50 dark:bg-green-500/10" : "text-red-600 bg-red-50 dark:bg-red-500/10"
                  )}>
                    {kpi.change.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold">
                  {kpi.prefix}
                  <CountUp end={kpi.value} decimals={kpi.value % 1 !== 0 ? 2 : 0} duration={2} separator="," />
                  {kpi.suffix}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm marble-gloss">
              <h3 className="text-xl font-serif mb-8">Revenue Overview</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1a5f7a" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#1a5f7a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1a5f7a" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm marble-gloss">
              <h3 className="text-xl font-serif mb-8">Top Categories</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProducts} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} width={100} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="sales" radius={[0, 10, 10, 0]}>
                      {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto marble-gloss">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif">Recent Orders</h3>
              <Link href="/dashboard/orders" className="text-brand-teal font-bold text-sm hover:underline">View All Orders</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-white/10">
                {(stats?.recentOrders || []).map((order: any) => (
                  <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                    <td className="py-4 text-sm font-bold text-brand-teal">{order.id}</td>
                    <td className="py-4 text-sm">{order.userEmail || 'Guest'}</td>
                    <td className="py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold",
                        order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                        order.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-bold text-brand-navy">Rs. {order.totalPrice?.toLocaleString()}</td>
                    <td className="py-4 text-right">
                      <Link href="/dashboard/orders" className="text-brand-teal hover:underline text-sm font-bold">Details</Link>
                    </td>
                  </tr>
                ))}
                {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 italic">No recent orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
