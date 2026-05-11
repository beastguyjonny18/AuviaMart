'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, MousePointer2 } from 'lucide-react';
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

const kpis = [
  { label: 'Total Revenue', value: 124500, prefix: 'QAR ', change: '+12.5%', icon: DollarSign, color: 'text-brand-teal' },
  { label: 'Orders Today', value: 48, change: '+5.2%', icon: ShoppingCart, color: 'text-blue-500' },
  { label: 'Active Customers', value: 1240, change: '-2.1%', icon: Users, color: 'text-accent-gold' },
  { label: 'Conversion Rate', value: 3.42, suffix: '%', change: '+0.8%', icon: MousePointer2, color: 'text-purple-500' },
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
  { name: 'Manuka Honey', sales: 450, color: '#1a5f7a' },
  { name: 'Olive Oil', sales: 380, color: '#0d3b55' },
  { name: 'Cacao Powder', sales: 320, color: '#e8a44a' },
  { name: 'Himalayan Salt', sales: 290, color: '#25d366' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Good morning, Roshaan</h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with AuviaMart today.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm"
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
              <CountUp end={kpi.value} decimals={kpi.value % 1 !== 0 ? 2 : 0} duration={2} />
              {kpi.suffix}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm">
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

        {/* Top Products */}
        <div className="p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm">
          <h3 className="text-xl font-serif mb-8">Top Products</h3>
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

      {/* Recent Orders Table */}
      <div className="p-8 bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto">
        <h3 className="text-xl font-serif mb-8">Recent Orders</h3>
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
            {[
              { id: '#ORD-7241', user: 'Khalid Al-Thani', status: 'Delivered', amount: 'QAR 450.00', color: 'bg-green-500' },
              { id: '#ORD-7242', user: 'Sarah Jenkins', status: 'Processing', amount: 'QAR 120.00', color: 'bg-blue-500' },
              { id: '#ORD-7243', user: 'Ahmed Hassan', status: 'Pending', amount: 'QAR 85.00', color: 'bg-amber-500' },
              { id: '#ORD-7244', user: 'Fatima Ali', status: 'Delivered', amount: 'QAR 230.00', color: 'bg-green-500' },
            ].map((order) => (
              <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                <td className="py-4 text-sm font-bold">{order.id}</td>
                <td className="py-4 text-sm">{order.user}</td>
                <td className="py-4">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white", order.color)}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-sm font-bold">{order.amount}</td>
                <td className="py-4 text-right">
                  <button className="text-brand-teal hover:underline text-sm font-bold">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
